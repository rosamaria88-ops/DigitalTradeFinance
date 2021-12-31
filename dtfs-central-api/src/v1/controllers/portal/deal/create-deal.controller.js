const db = require('../../../../drivers/db-client');
const DEFAULTS = require('../../../defaults');
const now = require('../../../../now');
const getDealErrors = require('../../../validation/create-deal');
const { generateDealId } = require('../../../../utils/generate-ids');

const createDeal = async (deal, maker) => {
  const collection = await db.getCollection('deals');
  const dealId = await generateDealId();
  const time = now();

  const { details } = deal;

  const newDeal = {
    _id: dealId,
    ...DEFAULTS.DEAL,
    ...deal,
    updatedAt: Date.now(),
    bank: maker && maker.bank,
    details: {
      ...DEFAULTS.DEAL.details,
      ...details,
      created: time,
      maker,
    },
    facilities: DEFAULTS.DEAL.facilities,
  };

  const validationErrors = getDealErrors(newDeal);

  if (validationErrors.count !== 0) {
    return {
      deal: newDeal,
      validationErrors,
    };
  }

  const response = await collection.insertOne(newDeal);

  const { insertedId } = response;

  return {
    _id: insertedId,
  };
};

exports.createDealPost = async (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.status(404).send();
  }

  const {
    validationErrors,
    _id,
  } = await createDeal(req.body.deal, user);

  if (validationErrors) {
    return res.status(400).send({
      _id,
      validationErrors,
    });
  }

  return res.status(200).send({ _id });
};
