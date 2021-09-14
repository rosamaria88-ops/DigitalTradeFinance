const db = require('../../../../drivers/db-client');
const now = require('../../../../now');
const { generateFacilityId } = require('../../../../utils/generate-ids');
const getCreateFacilityErrors = require('../../../validation/create-facility');
const { findOneDeal } = require('../deal/get-deal.controller');
const { addFacilityIdToDeal } = require('../deal/update-deal.controller');

const createFacility = async (facility, user, routePath) => {
  const collection = await db.getCollection('facilities');
  const facilityId = await generateFacilityId();

  const { associatedDealId } = facility;

  const newFacility = {
    ...facility,
    _id: facilityId,
    createdDate: now(),
  };

  const response = await collection.insertOne(newFacility);
  const { insertedId } = response;

  await addFacilityIdToDeal(
    associatedDealId,
    insertedId,
    user,
    routePath,
  );

  return {
    _id: insertedId,
  };
};

exports.createFacilityPost = async (req, res) => {
  const { facility, user } = req.body;

  if (!user) {
    return res.status(404).send();
  }

  const validationErrors = getCreateFacilityErrors(facility);

  if (validationErrors.count !== 0) {
    return res.status(400).send({
      validationErrors,
    });
  }

  return findOneDeal(facility.associatedDealId, async (deal) => {
    if (deal) {
      const createdFacility = await createFacility(facility, user, req.routePath);

      return res.status(200).send(createdFacility);
    }

    return res.status(404).send('Deal not found');
  });
};
