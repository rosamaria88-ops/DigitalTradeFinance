const $ = require('mongo-dot-notation');
const { findOneFacility } = require('./get-facility.controller');
const db = require('../../../../drivers/db-client');

const withoutId = (obj) => {
  const cleanedObject = { ...obj };
  delete cleanedObject._id;
  return cleanedObject;
};

const updateFacilityStatus = async (facilityId, status, existingFacility) => {
  const collection = await db.getCollection('facilities');

  console.info(`Updating Portal facility status to ${status}`);
  const previousStatus = existingFacility.status;

  const update = {
    ...existingFacility,
    updatedAt: Date.now(),
    previousStatus,
    status,
  };

  const findAndUpdateResponse = await collection.findOneAndUpdate(
    { _id: facilityId },
    $.flatten(withoutId(update)),
    { returnOriginal: false },
  );

  console.info(`Updated Portal facility status from ${previousStatus} to ${status}`);

  return findAndUpdateResponse.value;
};
exports.updateFacilityStatus = updateFacilityStatus;

exports.updateFacilityStatusPut = async (req, res) => {
  const facilityId = req.params.id;

  const { status } = req.body;

  await findOneFacility(facilityId, async (existingFacility) => {
    if (existingFacility) {
      const updatedFacility = await updateFacilityStatus(
        facilityId,
        status,
        existingFacility,
      );
      return res.status(200).json(updatedFacility);
    }

    return res.status(404).send();
  });
};
