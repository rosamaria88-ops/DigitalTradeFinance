const axios = require('axios');
require('dotenv').config();

const urlRoot = process.env.DEAL_API_URL;

const login = async (username, password) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${urlRoot}/v1/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { username, password },
    });

    return response.data ? {
      success: response.data.success,
      token: response.data.token,
    } : '';
  } catch (err) {
    return new Error('error with token');// do something proper here, but for now just reject failed logins..
  }
};

const contract = async (id, token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/deals/${id}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const contracts = async (token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${urlRoot}/v1/deals`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response.data.deals;
  } catch (err) {
    return new Error('error with token');// do something proper here, but for now just reject failed logins..
  }
};

const createDeal = async (deal, token) => {
  const response = await axios({
    method: 'post',
    url: `${urlRoot}/v1/deals`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: deal,
  });

  return response.data;
};

const updateDeal = async (deal, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${deal._id}`, // eslint-disable-line no-underscore-dangle
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: deal,
  });

  return response.data;
};

const upsertDeal = async (deal, token) => {
  if (deal._id) { // eslint-disable-line no-underscore-dangle
    return updateDeal(deal, token);
  }
  return createDeal(deal, token);
};

const banks = async (token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${urlRoot}/v1/banks`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    return response.data.banks;
  } catch (err) {
    return new Error('error with token');// do something proper here, but for now just reject failed logins..
  }
};

const bondCurrencies = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/bond-currencies`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data.bondCurrencies;
};

const countries = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/countries`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data.countries;
};

const industrySectors = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/industry-sectors`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data.industrySectors;
};

const mandatoryCriteria = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/mandatory-criteria`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data.mandatoryCriteria;
};

const transactions = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/transactions`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data.transactions;
};

const contractBond = async (id, bondId, token) => {
  const response = await contract(id, token);
  const { _id } = response;
  console.log('HELLO TEST contractId \n ', _id);
  return {
    contractId: _id,
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
  login,
  mandatoryCriteria,
  transactions,
  upsertDeal,
};
