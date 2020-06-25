const { ObjectID } = require('mongodb');
const db = require('../../drivers/db-client');

exports.list = async (callback) => {
  const collection = await db.getCollection('users');

  collection.find({}).toArray(callback);
};

exports.findOne = async (_id, callback) => {
  console.log(`findOne: _id :: ${_id}`);
  const collection = await db.getCollection('users');

  collection.findOne({ _id: new ObjectID(_id) }, callback);
};

exports.findByUsername = async (username, callback) => {
  console.log(`findByUsername: username :: ${username}`);
  const collection = await db.getCollection('users');

  collection.findOne({ username }, callback);
};

exports.create = async (user, callback) => {
  const collection = await db.getCollection('users');
  const createUserResult = await collection.insertOne(user);

  callback(null, createUserResult.ops[0]);
};

exports.update = async (_id, user, callback) => {
  const collection = await db.getCollection('users');
  await collection.updateOne({ _id: { $eq: new ObjectID(_id) } }, { $set: user }, {});

  callback(null, user);
};

exports.remove = async (_id, callback) => {
  const collection = await db.getCollection('users');
  const status = await collection.deleteOne({ _id });

  callback(null, status);
};
