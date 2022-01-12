const { ObjectID } = require('mongodb');
const now = require('../../../now');
const refDataApi = require('../../../reference-data/api');
const db = require('../../../drivers/db-client');
const {
  getAllFacilitiesByDealId,
  update,
} = require('./facilities.controller');
const CONSTANTS = require('../../../constants');
const { PORTAL_ACTIVITY_LABEL, PORTAL_ACTIVITY_TYPE } = require('../../portalActivity-object-generator/activityConstants');
const portalActivityGenerator = require('../../portalActivity-object-generator');

const generateSubmissionData = async (existingApplication) => {
  const result = {
    date: existingApplication.submissionDate,
  };

  result.count = existingApplication.submissionCount + 1;

  if (!existingApplication.submissionDate) {
    result.date = now();
  }

  return result;
};

const generateId = async ({
  entityId, entityType, dealId, user,
}) => refDataApi.numberGenerator.create({
  dealType: CONSTANTS.DEAL.DEAL_TYPE.GEF,
  entityId,
  entityType,
  dealId,
  user,
});

const generateUkefDealId = async (application) => generateId({
  entityId: application._id,
  entityType: 'deal',
  dealId: application._id,
  user: application.checkerId,
});

const generateUkefFacilityId = async (facility) => generateId({
  entityId: facility._id,
  entityType: 'facility',
  dealId: facility.dealId,
});

const addSubmissionDateToIssuedFacilities = async (dealId) => {
  const facilities = await getAllFacilitiesByDealId(dealId);

  facilities.forEach(async (facility) => {
    const {
      _id, hasBeenIssued, canResubmitIssuedFacilities, shouldCoverStartOnSubmission, issueDate
    } = facility;

    if (hasBeenIssued) {
      const update = {
        submittedAsIssuedDate: now(),
      };

      /**
       * if canResubmitIssuedFacilities and shouldCoverStartOnSubmission is true
       * sets coverStartDate to issueDate
       * else if not canResubmitIssuedFacilities then set on submission to UKEF date
       * sets hour, min, seconds to midnight of the same day
       */
      if (shouldCoverStartOnSubmission) {
        if (canResubmitIssuedFacilities) {
          update.coverStartDate = (new Date(issueDate)).setHours(0, 0, 0, 0);
        } else {
          update.coverStartDate = (new Date()).setHours(0, 0, 0, 0);
        }
      }

      await updateFacility(_id, update);
    }
  });

  return facilities;
};

/*
  If facility has been changed to issued (after first submission)
  When submitting to UKEF, have to remove the canResubmitIssuedFacilities flag
  Ensures that cannot update this facility anymore
*/
const removeChangedToIssued = async (dealId) => {
  const facilities = await getAllFacilitiesByDealId(dealId);

  facilities.forEach(async (facility) => {
    const { _id, canResubmitIssuedFacilities } = facility;

    if (canResubmitIssuedFacilities) {
      const update = {
        canResubmitIssuedFacilities: false,
      };

      await updateFacility(_id, update);
    }
  });
};

const addUkefFacilityIdToFacilities = async (dealId) => {
  const facilities = await getAllFacilitiesByDealId(dealId);

  await Promise.all(facilities.map(async (facility) => {
    if (!facility.ukefFacilityId) {
      const { ukefId } = await generateUkefFacilityId(facility);
      const update = {
        ukefFacilityId: ukefId,
      };
      await updateFacility(facility._id, update);
    }
  }));

  return facilities;
};

// retrieves user information from database
const getUserInfo = async (userId) => {
  const userCollectionName = 'users';

  const userCollection = await db.getCollection(userCollectionName);
  const {
    firstname,
    surname = '',
  } = userId
    ? await userCollection.findOne({ _id: new ObjectID(String(userId)) })
    : {};

  // creates user object which can be used
  const user = {
    firstname,
    surname,
    _id: userId,
  };

  return user;
};

// generates labels for portalActivities array based on type of submission
const submissionTypeToConstant = (submissionType) => {
  let submissionConstant;

  switch (submissionType) {
    case CONSTANTS.DEAL.SUBMISSION_TYPE.AIN:
      submissionConstant = PORTAL_ACTIVITY_LABEL.AIN_SUBMISSION;
      break;
    case CONSTANTS.DEAL.SUBMISSION_TYPE.MIN:
      submissionConstant = PORTAL_ACTIVITY_LABEL.MIN_SUBMISSION;
      break;
    case CONSTANTS.DEAL.SUBMISSION_TYPE.MIA:
      submissionConstant = PORTAL_ACTIVITY_LABEL.MIA_SUBMISSION;
      break;
    default:
      submissionConstant = null;
  }

  return submissionConstant;
};

// adds to the portalActivities array for submission to UKEF events
const submissionPortalActivity = async (application) => {
  const { submissionType, portalActivities, checkerId } = application;
  // generates the label for activity array
  const applicationType = submissionTypeToConstant(submissionType);
  // creates user object to add to array
  const user = await getUserInfo(checkerId);
  // generates an activities object
  const activityObj = portalActivityGenerator(applicationType, user, PORTAL_ACTIVITY_TYPE.NOTICE, '');
  // adds to beginning of portalActivities array so most recent displayed first
  portalActivities.unshift(activityObj);

  return portalActivities;
};

const addSubmissionData = async (dealId, existingApplication) => {
  const { count, date } = await generateSubmissionData(existingApplication);

  await addSubmissionDateToIssuedFacilities(dealId);
  await addUkefFacilityIdToFacilities(dealId);
  await removeChangedToIssued(dealId);
  const updatedPortalActivity = await submissionPortalActivity(existingApplication);

  const submissionData = {
    submissionCount: count,
    submissionDate: date,
    portalActivities: updatedPortalActivity,
  };

  if (!existingApplication.ukefDealId) {
    const { ukefId } = await generateUkefDealId(existingApplication);
    submissionData.ukefDealId = ukefId;
  }

  return submissionData;
};

/**
 * Check the `coverDateConfirmed` property of the facility has the correct boolean flag.
 * If the submission type is AIN and application status is DRAFT then `coverDateConfirmed`
 * is updated to `true`. This helper function mitigates a know bug which is produced upon
 * cloning a deal.
 * @param {Object} app Application object
 * @returns {Integer} Number of facilities updated
 */
const checkCoverDateConfirmed = async (app) => {
  if (app) {
    try {
      const facilities = await getAllFacilitiesByDealId(app._id);
      if (app.status === CONSTANTS.DEAL.STATUS.DRAFT && app.submissionType === CONSTANTS.DEAL.SUBMISSION_TYPE.AIN && facilities?.length > 0) {
        const updated = facilities.filter((f) => f.hasBeenIssued && !f.coverDateConfirmed).map(async (f) => {
          console.log('---------', { f });
          await update(f._id, {
            coverDateConfirmed: true,
          });
          console.log('============');
        });
        return updated.length;
      }
    } catch (e) {
      console.error('Unable to set coverDateConfirmed for AIN facilities.', { e });
    }
  }
  return 0;
};

module.exports = {
  addSubmissionData,
  submissionPortalActivity,
  submissionTypeToConstant,
  getUserInfo,
  addSubmissionDateToIssuedFacilities,
  removeChangedToIssued,
  checkCoverDateConfirmed,
};
