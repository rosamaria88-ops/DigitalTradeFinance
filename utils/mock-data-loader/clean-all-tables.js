const api = require('./api');
const gefApi = require('./gef/api');
const centralApi = require('./centralApi');
const tokenFor = require('./temporary-token-handler');

const cleanBanks = async (token) => {
  console.log('cleaning banks');

  const banks = await api.listBanks(token);

  if (banks.length > 0) {
    for (const bank of banks) {
      await api.deleteBank(bank, token);
    }
  }
};

const cleanFacilities = async (token) => {
  console.log('cleaning central facilities');

  for (const facility of await centralApi.listFacilities()) {
    await centralApi.deleteFacility(facility._id, token);
  }
};

const cleanDeals = async (token) => {
  console.log('cleaning Portal deals');

  const deals = await api.listDeals(token);

  if (deals) {
    for (const deal of deals) {

      // NOTE: BSS and GEF deals use different MongoDB _ids.
      // Therefore they currently have their own endpoints to delete
      // to use the correct .find({ _id ... }) with or without ObjectId.
      // When BSS and GEF have the same _id generation,
      // they can use the same endpoint.
      if (deal.product === 'BSS/EWCS') {
        await api.deleteDeal(deal._id, token);

      }
      if (deal.product === 'GEF') {
        await gefApi.deleteDeal(deal._id, token);
      }
    }
  }
};

const cleanMandatoryCriteria = async (token) => {
  console.log('cleaning BSS mandatory-criteria');

  for (const mandatoryCriteria of await api.listMandatoryCriteria(token)) {
    await api.deleteMandatoryCriteria(mandatoryCriteria, token);
  }
};

const cleanEligibilityCriteria = async (token) => {
  console.log('cleaning BSS eligibility-criteria');

  for (const eligibilityCriteria of await api.listEligibilityCriteria(token)) {
    await api.deleteEligibilityCriteria(eligibilityCriteria, token);
  }
};

const cleanUsers = async () => {
  console.log('cleaning Portal users');

  for (const user of await api.listUsers()) {
    await api.deleteUser(user);
  }
};

const cleanAllTables = async () => {
  const token = await tokenFor({
    username: 'admin',
    password: 'AbC!2345',
    roles: ['maker', 'editor'],
    bank: { id: '*' },
  });

  await cleanBanks(token);
  await cleanDeals(token);
  await cleanFacilities();
  await cleanMandatoryCriteria(token);
  await cleanEligibilityCriteria(token);
  await cleanUsers();
};

module.exports = cleanAllTables;
