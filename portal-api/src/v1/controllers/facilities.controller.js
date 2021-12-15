const api = require('../api');
const { updateDeal } = require('./deal.controller');

exports.create = async (facilityBody, user) => {
  const createdFacility = await api.createFacility(facilityBody, user);

  const { status, data } = createdFacility;
  const { _id } = data;

  const facility = await api.findOneFacility(_id);

  return {
    status,
    data: facility,
  };
};

exports.findOne = async (facilityId) =>
  api.findOneFacility(facilityId);

exports.update = async (dealId, facilityId, facilityBody, user) => {
  const updatedFacility = await api.updateFacility(facilityId, facilityBody, user);

  if (updatedFacility) {
    // update facilitiesUpdated timestamp in the deal

    const dealUpdate = {
      facilitiesUpdated: new Date().valueOf(),
    };

    await updateDeal(
      dealId,
      dealUpdate,
      user,
    );
  }

  return updatedFacility;
};

exports.delete = async (facilityId, user) =>
  api.deleteFacility(facilityId, user);

exports.createMultiple = async (req, res) => {
  const { facilities, dealId, user } = req.body;

  const { data: ids } = await api.createMultipleFacilities(facilities, dealId, user);

  const allFacilities = await Promise.all(
    ids.map(async (id) => {
      const facility = await api.findOneFacility(id);
      return facility;
    }),
  );

  return res.status(200).send(allFacilities);
};

exports.createMultipleFacilities = async (facilities, dealId, user) =>
  api.createMultipleFacilities(facilities, dealId, user);
