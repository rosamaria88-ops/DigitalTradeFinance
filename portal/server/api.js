const axios = require('axios');
require('dotenv').config();

const tokenFor = require('./temporary-token-handler');

const urlRoot = process.env.DEAL_API_URL;

const contract = async (id) => {
  const token = await tokenFor({ username: 'bob', password: 'bananas', roles: [] });

  const response = await axios({
    method: 'get',
    url: `${urlRoot}/api/deals/${id}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

const contracts = async () => {
  const token = await tokenFor({ username: 'bob', password: 'bananas', roles: [] });

  const response = await axios({
    method: 'get',
    url: `${urlRoot}/api/deals`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data.deals;
};

const banks = async () => {
  const token = await tokenFor({ username: 'bob', password: 'bananas', roles: [] });

  const response = await axios({
    method: 'get',
    url: `${urlRoot}/api/banks`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data.banks;
};

const bondCurrencies = async () => {
  const response = await axios(`${urlRoot}/api/bond-currencies`);
  return response.data.bondCurrencies;
};

const countries = async () => {
  const response = await axios(`${urlRoot}/api/countries`);
  return response.data.countries;
};

const industrySectors = async () => {
  const response = await axios(`${urlRoot}/api/industry-sectors`);
  return response.data.industrySectors;
};

const mandatoryCriteria = async () => {
  const response = await axios(`${urlRoot}/api/mandatory-criteria`);
  return response.data.mandatoryCriteria;
};

const transactions = async () => {
  const response = await axios(`${urlRoot}/api/transactions`);
  return response.data.transactions;
};

const contractBond = async (id, bondId) => {
  const response = await contract(id);
  return {
    contractId: response.id,
    bond: response.bondTransactions.items.find((bond) => bond.id === bondId),
  };
};

export default {
  banks,
  bondCurrencies,
  contract,
  contractBond,
  contracts,
  countries,
  industrySectors,
  mandatoryCriteria,
  transactions,
};
