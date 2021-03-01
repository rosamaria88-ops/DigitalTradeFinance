
const db = require('../../../../drivers/db-client');

// const { findOneDeal } = require('../../portal/deal/get-deal.controller');

const findDeals = async (_id, callback) => {
  const dealsCollection = await db.getCollection('tfm-deals');

  const deals = await dealsCollection.find();

  if (callback) {
    callback(deals);
  }

  return deals;
};
exports.findDeals = findDeals;

exports.findDealsGet = async (req, res) => {
  const deals = await findDeals();
  if (deals) {
    return res.status(200).send({
      deals,
    });
  }

  return res.status(404).send();
};
