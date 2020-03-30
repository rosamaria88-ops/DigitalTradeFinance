const assert = require('assert');
const { ObjectId } = require('mongodb');
const moment = require('moment');

const DEFAULTS = require('../defaults');

const db = require('../../db-driver/client');

const withoutId = (obj) => {
  const cleanedObject = { ...obj };
  delete cleanedObject._id; // eslint-disable-line no-underscore-dangle
  return cleanedObject;
};

const findDeals = async (callback) => {
  const collection = await db.getCollection('deals');

  collection.find({})
    .sort({ updated: +1 })
    .toArray((err, result) => {
      assert.equal(err, null);
      callback(result);
    });
};

const findPaginatedDeals = async (start, pagesize, callback) => {
  const collection = await db.getCollection('deals');

  const count = await collection.find({}).count();

  collection.find({})
    .skip(start)
    .limit(pagesize)
    .toArray((err, result) => {
      assert.equal(err, null);

      callback({
        count,
        deals: result,
      });
    });
};

const findOneDeal = async (id, callback) => {
  const collection = await db.getCollection('deals');

  collection.findOne({ _id: new ObjectId(id) }, (err, result) => {
    assert.equal(err, null);
    callback(result);
  });
};

exports.create = async (req, res) => {
  const collection = await db.getCollection('deals');

  const timestamp = moment().format('YYYY MM DD HH:mm:ss:SSS ZZ');
  const newDeal = {
    ...DEFAULTS.DEALS,
    ...req.body,
    created: timestamp,
    updated: timestamp,
  };

  const response = await collection.insertOne(newDeal);

  const deal = response.ops[0];
  res.status(200).send(deal);
};

exports.findAll = (req, res) => (
  findDeals((deals) => res.status(200).send({
    count: deals.length,
    deals,
  }))
);

exports.findPage = (req, res) => {
  const start = parseInt(req.params.start, 10);
  const pagesize = parseInt(req.params.pagesize, 10);

  findPaginatedDeals(start, pagesize, (paginatedResults) => res.status(200).send(paginatedResults));
};

exports.findOne = (req, res) => (
  findOneDeal(req.params.id, (deal) => res.status(200).send(deal))
);

exports.update = async (req, res) => {
  const collection = await db.getCollection('deals');
  await collection.updateOne(
    { _id: { $eq: new ObjectId(req.params.id) } },
    { $set: withoutId(req.body) }, {},
  );
  // TODO feels like there's a better way to achieve this...
  const fixedDeal = { ...req.body, _id: req.params.id };

  res.status(200).send(fixedDeal);
};

exports.delete = async (req, res) => {
  const collection = await db.getCollection('deals');
  const status = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.status(200).send(status);
};
