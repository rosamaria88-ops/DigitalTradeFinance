const db = require('../../../../drivers/db-client');

const teamsCollection = 'tfm-teams';

const createTeam = async (team) => {
  const collection = await db.getCollection(teamsCollection);
  return collection.insertOne(team);
};
exports.createTeam = createTeam;

exports.createTfmTeam = async (req, res) => {
  const team = await createTeam(req.body.team);

  const { insertedId } = team;

  res.status(200).json({
    _id: insertedId,
  });
};

const listTeams = async () => {
  const collection = await db.getCollection(teamsCollection);
  return collection.find({}).toArray();
};
exports.listTeams = listTeams;

exports.listTfmTeam = async (req, res) => {
  const teams = await listTeams();
  return res.status(200).send({ teams });
};

const findOneTeam = async (id) => {
  const collection = await db.getCollection(teamsCollection);
  return collection.findOne({ id });
};
exports.findOneTeam = findOneTeam;

exports.findOneTfmTeam = async (req, res) => {
  const team = await findOneTeam(req.params.id);
  if (team) {
    return res.status(200).send({
      team,
    });
  }

  return res.status(404).send();
};

const deleteTeam = async (id) => {
  if (typeof id === 'string') {
    const collection = await db.getCollection(teamsCollection);
    return collection.deleteOne({ id: { $eq: id } });
  }

  return false;
};
exports.deleteTeam = deleteTeam;

exports.deleteTfmTeam = async (req, res) => {
  const deleted = await deleteTeam(req.params.id);

  return deleted
    ? res.status(200).send(deleted)
    : res.status(400).send({ status: 400, message: 'Invalid team Id' });
};
