const { ObjectId } = require('mongodb');
const db = require('../../../drivers/db-client');
const utils = require('../utils.service');
const { facilitiesValidation, facilitiesStatus, facilitiesOverallStatus } = require('./validation/facilities');
const { Facility } = require('../models/facilities');

const collectionName = 'gef-facilities';

exports.create = async (req, res) => {
  const collection = await db.getCollection(collectionName);
  const doc = await collection.insertOne(new Facility(req.body));
  res.status(201).json(doc.ops[0]);
};

exports.getAll = async (req, res) => {
  const collection = await db.getCollection(collectionName);
  let find = {};
  if (req.query && req.query.applicationId) {
    find = { applicationId: String(req.query.applicationId) };
  }
  const doc = await collection.find(find).toArray();

  const facilities = [];
  doc.forEach((item) => {
    facilities.push({
      status: facilitiesStatus(item),
      details: item,
      validation: facilitiesValidation(item),
    });
  });
  res.status(200).send({
    status: facilitiesOverallStatus(facilities),
    details: facilities,
  });
};

exports.getById = async (req, res) => {
  const collection = await db.getCollection(collectionName);
  const doc = await collection.findOne({ _id: ObjectId(String(req.params.id)) });
  if (doc) {
    res.status(200).send({
      status: facilitiesStatus(doc),
      details: doc,
      validation: facilitiesValidation(doc),
    });
  } else {
    res.status(204).send();
  }
};

exports.update = async (req, res) => {
  const collection = await db.getCollection(collectionName);
  const update = new Facility(req.body);
  const result = await collection.findOneAndUpdate(
    { _id: { $eq: ObjectId(String(req.params.id)) } }, { $set: update }, { returnOriginal: false },
  );
  let response;
  if (result.value) {
    response = {
      status: facilitiesStatus(result.value),
      details: result.value,
      validation: facilitiesValidation(result.value),
    };
  }
  res.status(utils.mongoStatus(result)).send(response);
};

exports.delete = async (req, res) => {
  const collection = await db.getCollection(collectionName);
  const response = await collection.findOneAndDelete({ _id: ObjectId(String(req.params.id)) });
  res.status(utils.mongoStatus(response)).send(response.value ? response.value : null);
};

exports.deleteByApplicationId = async (req, res) => {
  const collection = await db.getCollection(collectionName);
  const response = await collection.deleteMany({ applicationId: req.query.applicationId });
  res.status(200).send(response);
};
