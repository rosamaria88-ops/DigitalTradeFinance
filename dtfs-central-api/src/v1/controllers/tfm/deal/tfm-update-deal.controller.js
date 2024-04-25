const { ObjectId } = require('mongodb');
const $ = require('mongo-dot-notation');
const { generateAuditDatabaseRecordFromAuditDetails } = require('@ukef/dtfs2-common/src/helpers/change-stream/generate-audit-database-record');
const { validateAuditDetails, validateAuditDetailsAndUserType } = require('@ukef/dtfs2-common/src/helpers/change-stream/validate-audit-details');
const db = require('../../../../drivers/db-client');
const { findOneDeal } = require('./tfm-get-deal.controller');
const { findAllFacilitiesByDealId } = require('../../portal/facility/get-facilities.controller');
const CONSTANTS = require('../../../../constants');
const { isNumber } = require('../../../../helpers');

const withoutId = (obj) => {
  const { _id, ...cleanedObject } = obj;
  return cleanedObject;
};

/**
 * @param {object} params
 * @param {string} params.dealId - id of deal to be updated
 * @param {object} params.dealUpdate - updates to make
 * @param {object} params.existingDeal
 * @param {import("@ukef/dtfs2-common/src/types/audit-details").AuditDetails} params.auditDetails - tfm user making the update
 * @returns {Promise<object>} updated deal or error object
 */
const updateDeal = async ({ dealId, dealUpdate, existingDeal, auditDetails }) => {
  const collection = await db.getCollection(CONSTANTS.DB_COLLECTIONS.TFM_DEALS);

  /**
   * Only the tfm object should be updated.
   * - e.g dealSnapshot or any other root level data should not be updated.
   * */
  const dealTfmUpdate = { tfm: dealUpdate.tfm };

  if (!dealTfmUpdate.tfm) {
    throw new Error(`Invalid dealUpdate - ${dealUpdate}`);
  }

  /**
   * Ensure that if a tfmUpdate with activities is an empty object,
   * we do not make activities an empty object.
   */
  if (dealTfmUpdate.tfm.activities && Object.keys(dealTfmUpdate.tfm.activities).length === 0) {
    dealTfmUpdate.tfm.activities = [];
  }

  const existingDealActivities = existingDeal?.tfm?.activities;
  const tfmUpdateHasActivities = dealTfmUpdate.tfm.activities && Object.keys(dealTfmUpdate.tfm.activities).length > 0;
  /**
   * ACBS activities update is an array whereas TFM activity update is an object
   * Checks if array, then uses spread operator
   * else if not array, adds the object
   */
  if (tfmUpdateHasActivities) {
    if (Array.isArray(dealTfmUpdate.tfm.activities)) {
      const updatedActivities = [...dealTfmUpdate.tfm.activities, ...existingDealActivities];
      // ensures that duplicate entries are not added to activities by comparing timestamp and label
      dealTfmUpdate.tfm.activities = updatedActivities.filter(
        (value, index, arr) => arr.findIndex((item) => ['timestamp', 'label'].every((key) => item[key] === value[key])) === index,
      );
    } else {
      const updatedActivities = [dealTfmUpdate.tfm.activities, ...existingDealActivities];
      // ensures that duplicate entries are not added to activities by comparing timestamp and label
      dealTfmUpdate.tfm.activities = updatedActivities.filter(
        (value, index, arr) => arr.findIndex((item) => ['timestamp', 'label'].every((key) => item[key] === value[key])) === index,
      );
    }
  }

  dealTfmUpdate.tfm.lastUpdated = new Date().valueOf();
  dealTfmUpdate.auditRecord = generateAuditDatabaseRecordFromAuditDetails(auditDetails);

  const findAndUpdateResponse = await collection.findOneAndUpdate({ _id: { $eq: ObjectId(dealId) } }, $.flatten(withoutId(dealTfmUpdate)), {
    returnNewDocument: true,
    returnDocument: 'after',
  });

  return findAndUpdateResponse.value;
};

exports.updateDealPut = async (req, res) => {
  const dealId = req.params.id;
  if (!ObjectId.isValid(dealId)) {
    return res.status(400).send({ status: 400, message: 'Invalid Deal Id' });
  }

  const { dealUpdate, auditDetails } = req.body;

  if (!dealUpdate?.tfm) {
    res.status(400).send({ status: 400, message: 'Missing property tfm on dealUpdate' });
  }

  try {
    validateAuditDetails(auditDetails);
  } catch ({ message }) {
    res.status(400).send({ status: 400, message: `Invalid auditDetails, ${message}` });
  }

  const existingDeal = await findOneDeal(dealId);

  if (!existingDeal) {
    return res.status(404).send({ status: 404, message: 'Deal not found' });
  }

  const response = await updateDeal({ dealId, dealUpdate, existingDeal, auditDetails });

  const status = isNumber(response?.status, 3);
  const code = status ? response.status : 200;
  return res.status(code).json(response);
};

const updateDealSnapshot = async (deal, snapshotChanges, auditDetails) => {
  const dealId = deal._id;
  if (ObjectId.isValid(dealId)) {
    try {
      const collection = await db.getCollection(CONSTANTS.DB_COLLECTIONS.TFM_DEALS);
      const update = {
        dealSnapshot: {
          ...snapshotChanges,
        },
        auditRecord: generateAuditDatabaseRecordFromAuditDetails(auditDetails),
      };

      const findAndUpdateResponse = await collection.findOneAndUpdate({ _id: { $eq: ObjectId(String(dealId)) } }, $.flatten(withoutId(update)), {
        returnNewDocument: true,
        returnDocument: 'after',
        upsert: true,
      });

      return findAndUpdateResponse.value;
    } catch (error) {
      console.error('Error updating TFM dealSnapshot %o', error);
      return { status: error?.response?.status || 500, data: 'Failed to update deal snapshot' };
    }
  }
  return { status: 400, message: 'Invalid Deal Id' };
};

exports.updateDealSnapshotPut = async (req, res) => {
  const dealId = req.params.id;
  if (!ObjectId.isValid(dealId)) {
    return res.status(400).send({ status: 400, message: 'Invalid Deal Id' });
  }
  const { snapshotUpdate, auditDetails } = req.body;

  try {
    validateAuditDetailsAndUserType(auditDetails, 'portal');
  } catch ({ message }) {
    return res.status(400).send({ status: 400, message: `Invalid auditDetails, ${message}` });
  }

  const deal = await findOneDeal(dealId);

  if (!deal) {
    return res.status(404).send({ status: 404, message: 'Deal not found' });
  }

  if (snapshotUpdate.dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
    const dealFacilities = await findAllFacilitiesByDealId(dealId);
    snapshotUpdate.facilities = dealFacilities;
  }

  const updatedDeal = await updateDealSnapshot(deal, snapshotUpdate, auditDetails);
  return res.status(200).json(updatedDeal);
};
