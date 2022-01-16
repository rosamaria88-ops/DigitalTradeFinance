const { ObjectId } = require('mongodb');
const db = require('../../../../drivers/db-client');

const facilitiesCollection = 'facilities';
const findAllGefFacilitiesByDealId = async (dealId) => {
  const collection = await db.getCollection(facilitiesCollection);

  const facilities = await collection.find({ dealId: ObjectId(dealId) }).toArray();

  return facilities;
};
exports.findAllGefFacilitiesByDealId = findAllGefFacilitiesByDealId;

exports.findAllGet = async (req, res) => {
  const facilities = await findAllGefFacilitiesByDealId(req.params.id);

  return res.status(200).send(facilities);
};

exports.findAllFacilities = async (req, res) => {
  const collection = await db.getCollection(facilitiesCollection);
  // GEF facilities only
  const facilities = await collection.find({ $or: [{ type: 'Cash' }, { type: 'Contingent' }] }).toArray();

  res.status(200).send(facilities);
};
