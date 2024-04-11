const { ObjectId } = require('mongodb');
const $ = require('mongo-dot-notation');
const { generateAuditDetailsFromUserInformation } = require('@ukef/dtfs2-common/src/helpers/changeStream/generateAuditDetails');
const { validateUserInformation } = require('@ukef/dtfs2-common/src/helpers/changeStream/validateUserInformation');
const db = require('../../../../drivers/db-client');
const { findOneDeal, findOneGefDeal } = require('../../portal/deal/get-deal.controller');
const tfmController = require('./tfm-get-deal.controller');

const { findAllFacilitiesByDealId } = require('../../portal/facility/get-facilities.controller');
const { findAllGefFacilitiesByDealId } = require('../../portal/gef-facility/get-facilities.controller');

const DEFAULTS = require('../../../defaults');
const CONSTANTS = require('../../../../constants');
const { DB_COLLECTIONS } = require('../../../../constants');

const withoutId = (obj) => {
  const { _id, ...cleanedObject } = obj;
  return cleanedObject;
};

const getSubmissionCount = (deal) => {
  const { dealType } = deal;

  if (dealType === CONSTANTS.DEALS.DEAL_TYPE.GEF) {
    return deal.submissionCount;
  }

  if (dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
    return deal.details.submissionCount;
  }

  return null;
};

const createDealSnapshot = async (deal, userInformation) => {
  if (ObjectId.isValid(deal._id)) {
    const { dealType, _id: dealId } = deal;
    const collection = await db.getCollection(DB_COLLECTIONS.TFM_DEALS);

    const submissionCount = getSubmissionCount(deal);
    const tfmInit = submissionCount === 1 ? { tfm: DEFAULTS.DEAL_TFM } : null;

    const dealObj = { dealSnapshot: deal, ...tfmInit, auditDetails: generateAuditDetailsFromUserInformation(userInformation) };

    if (dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
      const dealFacilities = await findAllFacilitiesByDealId(dealId);
      dealObj.dealSnapshot.facilities = dealFacilities;
    }

    const findAndUpdateResponse = await collection.findOneAndUpdate({ _id: { $eq: ObjectId(deal._id) } }, $.flatten(withoutId(dealObj)), {
      returnNewDocument: true,
      returnDocument: 'after',
      upsert: true,
    });

    return findAndUpdateResponse.value;
  }
  return { status: 400, message: 'Invalid Deal Id' };
};

const createFacilitiesSnapshot = async (deal, userInformation) => {
  if (ObjectId.isValid(deal._id)) {
    const { dealType, _id: dealId } = deal;

    let dealFacilities = [];
    if (dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
      dealFacilities = await findAllFacilitiesByDealId(dealId);
    }

    if (dealType === CONSTANTS.DEALS.DEAL_TYPE.GEF) {
      dealFacilities = await findAllGefFacilitiesByDealId(dealId);
    }

    const collection = await db.getCollection(CONSTANTS.DB_COLLECTIONS.TFM_FACILITIES);

    const submissionCount = getSubmissionCount(deal);

    const tfmInit = submissionCount === 1 ? { tfm: DEFAULTS.FACILITY_TFM } : null;

    if (dealFacilities) {
      const updatedFacilities = Promise.all(
        dealFacilities.map(async (facility) =>
          collection.findOneAndUpdate(
            {
              _id: { $eq: ObjectId(facility._id) },
            },
            $.flatten({ facilitySnapshot: facility, ...tfmInit, auditDetails: generateAuditDetailsFromUserInformation(userInformation) }),
            {
              returnNewDocument: true,
              returnDocument: 'after',
              upsert: true,
            },
          ),
        ),
      );

      return updatedFacilities;
    }

    return null;
  }
  return { status: 400, message: 'Invalid Deal Id' };
};

const submitDeal = async (deal, userInformation) => {
  await createDealSnapshot(deal, userInformation);

  await createFacilitiesSnapshot(deal, userInformation);

  const updatedDeal = await tfmController.findOneDeal(String(deal._id));

  return updatedDeal;
};

exports.submitDealPut = async (req, res) => {
  const { dealId, dealType, userInformation } = req.body;

  try {
    validateUserInformation(userInformation);
  } catch ({ message }) {
    return res.status(400).send({ status: 400, message: `Invalid user information, ${message}` });
  }

  if (userInformation.userType !== 'portal') {
    return res.status(400).send({ status: 400, message: `User information must be of type portal` });
  }

  if (dealType !== CONSTANTS.DEALS.DEAL_TYPE.GEF && dealType !== CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
    return res.status(400).send({ status: 400, message: 'Invalid deal type' });
  }

  let deal;

  if (dealType === CONSTANTS.DEALS.DEAL_TYPE.GEF) {
    deal = await findOneGefDeal(dealId);
  }
  if (dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
    deal = await findOneDeal(dealId);
  }

  if (!deal) {
    return res.status(404).send();
  }

  const updatedDeal = await submitDeal(deal, userInformation);
  return res.status(200).json(updatedDeal);
};
