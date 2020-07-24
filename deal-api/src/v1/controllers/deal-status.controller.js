const $ = require('mongo-dot-notation');
const moment = require('moment');
const { findOneDeal, updateDeal } = require('./deal.controller');
const { addComment } = require('./deal-comments.controller');

const { userHasAccessTo } = require('../users/checks');
const db = require('../../drivers/db-client');

const now = require('../../now');

const { createTypeA } = require('./integration/k2-messages');

const validateStateChange = require('../validation/deal-status');

exports.findOne = (req, res) => {
  findOneDeal(req.params.id, (deal) => {
    if (!deal) {
      res.status(404).send();
    } else if (!userHasAccessTo(req.user, deal)) {
      res.status(401).send();
    } else {
      res.status(200).send(deal.details.status);
    }
  });
};

const updateStatus = async (collection, _id, from, to) => {
  const allowedpreviousWorkflowStatus = ['draft', 'approved_conditions', 'approved', 'submission_acknowledged', 'confirmation_acknowledged'];


  const statusUpdate = {
    details: {
      status: to,
      previousStatus: from,
      dateOfLastAction: now(),
    },
  };

  if (from && allowedpreviousWorkflowStatus.includes(from.toLowerCase())) {
    statusUpdate.details.previousWorkflowStatus = from;
  }

  const findAndUpdateResponse = await collection.findOneAndUpdate(
    { _id },
    $.flatten(statusUpdate),
    { returnOriginal: false },
  );

  const { value } = findAndUpdateResponse;

  return value;
};

const updateFacilityDates = async (collection, deal) => {
  const facilities = {
    bonds: deal.bondTransactions.items,
    loans: deal.loanTransactions.items,
  };

  const updateFacilities = (arr) => {
    arr.forEach((f) => {
      const facility = f;
      const hasRequestedCoverStartDate = (facility['requestedCoverStartDate-day'] && facility['requestedCoverStartDate-month'] && facility['requestedCoverStartDate-year']);

      // TODO: rename bondStage to `facilityStage` (?)
      const shouldUpdateRequestedCoverStartDate = (facility.bondStage === 'Issued' && !hasRequestedCoverStartDate)
        || (facility.facilityStage === 'Unconditional' && !hasRequestedCoverStartDate);

      if (shouldUpdateRequestedCoverStartDate) {
        const currentTime = moment();
        facility['requestedCoverStartDate-day'] = currentTime.format('DD');
        facility['requestedCoverStartDate-month'] = currentTime.format('MM');
        facility['requestedCoverStartDate-year'] = currentTime.format('YYYY');
      }
    });
    return arr;
  };

  const updatedDeal = deal;
  updatedDeal.bondTransactions.items = updateFacilities(facilities.bonds);
  updatedDeal.loanTransactions.items = updateFacilities(facilities.loans);

  const findAndUpdateResponse = await collection.findOneAndUpdate(
    { _id: deal._id }, // eslint-disable-line no-underscore-dangle
    $.flatten(updatedDeal),
    { returnOriginal: false },
  );

  const { value } = findAndUpdateResponse;

  return value;
};

const createSubmissionDate = async (collection, _id, user) => {
  const submissionDate = {
    details: {
      submissionDate: now(),
      checker: user,
    },
  };

  const findAndUpdateResponse = await collection.findOneAndUpdate(
    { _id },
    $.flatten(submissionDate),
    { returnOriginal: false },
  );

  const { value } = findAndUpdateResponse;

  return value;
};

const userCanSubmitDeal = (deal, user) => {
  const isMakerCheckerUser = (user.roles.includes('maker') && user.roles.includes('checker'));

  if (!isMakerCheckerUser) {
    return true;
  }

  const makerId = String(deal.details.maker._id); // eslint-disable-line no-underscore-dangle
  const userId = String(user._id); // eslint-disable-line no-underscore-dangle
  const makerCheckerCreatedTheDeal = (makerId === userId);

  if (makerCheckerCreatedTheDeal) {
    return false;
  }

  const makerCheckerEditedTheDeal = deal.editedBy.find((edited) =>
    String(edited.userId) === String(user._id)); // eslint-disable-line no-underscore-dangle

  if (makerCheckerEditedTheDeal) {
    return false;
  }

  return true;
};

exports.update = (req, res) => {
  const { user } = req;

  findOneDeal(req.params.id, async (deal) => {
    if (!deal) return res.status(404).send();
    if (!userHasAccessTo(req.user, deal)) return res.status(401).send();

    const fromStatus = deal.details.status;
    const toStatus = req.body.status;

    if (toStatus !== 'Ready for Checker\'s approval'
        && toStatus !== 'Abandoned Deal') {
      if (!userCanSubmitDeal(deal, req.user)) {
        return res.status(401).send();
      }
    }

    const validationErrors = validateStateChange(deal, req.body, user);

    if (validationErrors) {
      return res.status(200).send({
        success: false,
        ...validationErrors,
      });
    }

    const collection = await db.getCollection('deals');
    const updatedDeal = await updateStatus(collection, req.params.id, fromStatus, toStatus);
    const updatedDealStatus = updatedDeal.details.status;

    const shouldCheckFacilityDates = (fromStatus === 'Draft' && updatedDealStatus === 'Ready for Checker\'s approval');
    if (shouldCheckFacilityDates) {
      await updateFacilityDates(collection, updatedDeal);
    }

    const dealAfterCommentsUpdate = await addComment(req.params.id, req.body.comments, user);

    const newReq = {
      params: req.params,
      body: dealAfterCommentsUpdate,
      user: req.user,
    };

    // TODO: add unit test to assert 'editedby is added
    const dealAfterEditedByUpdate = await updateDeal(newReq);

    if (toStatus === 'Submitted') {
      const dealAfterAllUpdates = await createSubmissionDate(collection, req.params.id, user);

      // TODO - Reinstate typeA XML creation once Loans and Summary have been added
      const { previousWorkflowStatus } = deal.details;

      const typeA = await createTypeA(dealAfterAllUpdates, previousWorkflowStatus);

      if (typeA.errorCount) {
        // Revert status
        await updateStatus(collection, req.params.id, toStatus, fromStatus);
        return res.status(200).send(typeA);
      }
    }

    const dealAfterAllUpdates = dealAfterEditedByUpdate;

    return res.status(200).send(dealAfterAllUpdates.details.status);
  });
};
