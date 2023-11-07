const axios = require('axios');
require('dotenv').config();

const { gef } = require('./gef/api');

const {
  PORTAL_API_URL, PORTAL_API_KEY, TFM_API_URL, TFM_API_KEY, DTFS_FF_MAGIC_LINK
} = process.env;

const createBank = async (bank, token) => {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/banks`,
    data: bank,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const createCurrency = async (currency, token) => {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/currencies`,
    data: currency,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const createCountry = async (country, token) => {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/countries`,
    data: country,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const createDeal = async (deal, token) => {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/deals`,
    data: deal,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const getDeal = async (dealId, token) => {
  const response = await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/deals/${dealId}`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const createIndustrySector = async (industrySector, token) => {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/industry-sectors`,
    data: industrySector,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const createMandatoryCriteria = async (mandatoryCriteria, token) => {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/mandatory-criteria`,
    data: mandatoryCriteria,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const createEligibilityCriteria = async (eligibilityCriteria, token) => {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/eligibility-criteria`,
    data: eligibilityCriteria,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const createUser = async (user, token) => {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/users`,
    data: user,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const createInitialUser = async (user) => {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': PORTAL_API_KEY,
      Accepts: 'application/json',
    },
    url: `${PORTAL_API_URL}/v1/user`,
    data: user,
  }).catch((error) => {
    console.error('Unable to create initial portal user %s', error);
  });

  return response.data;
};

const createInitialTfmUser = async (user) => {
  await axios({
    method: 'post',
    url: `${TFM_API_URL}/v1/user`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': TFM_API_KEY,
    },
    data: user,
  }).catch((error) => {
    console.error('Unable to create initial TFM user %s', error);
  });
};

const loginTfmUser = async (user) => {
  const response = await axios({
    method: 'post',
    url: `${TFM_API_URL}/v1/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { username: user.username, password: user.password },
  }).catch((error) => {
    console.error('Unable to login as TFM user %s', error);
  });

  return response?.data?.token;
};

const deleteBank = async (deal, token) => {
  const response = await axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/banks/${deal.id}`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const deleteCurrency = async (currency, token) => {
  const response = await axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/currencies/${currency.id}`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const deleteCountry = async (country, token) => {
  const response = await axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/countries/${country.code}`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const deleteDeal = async (dealId, token) => {
  const response = await axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/deals/${dealId}`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const deleteIndustrySector = async (industrySector, token) => {
  const response = await axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/industry-sectors/${industrySector.code}`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const deleteMandatoryCriteria = async (version, token) => {
  const response = await axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/mandatory-criteria/${version}`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const deleteEligibilityCriteria = async (version, token) => {
  const response = await axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/eligibility-criteria/${version}`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const deleteUser = async (user, token) => {
  const response = await axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/users/${user._id}`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const listBanks = async (token) => {
  const response = await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/banks`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data.banks;
};

const listCurrencies = async (token) => {
  const response = await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/currencies`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data.currencies;
};

const listCountries = async (token) => {
  const response = await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/countries`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data.countries;
};

const listDeals = async (token) => {
  const response = await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/deals`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data.deals;
};

const listIndustrySectors = async (token) => {
  const response = await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/industry-sectors`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data.industrySectors;
};

const listMandatoryCriteria = async (token) => {
  const response = await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/mandatory-criteria`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data.mandatoryCriteria;
};

const listEligibilityCriteria = async (token) => {
  const response = await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/eligibility-criteria`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data.eligibilityCriteria;
};

const listUsers = async (token) => {
  const response = await axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/users`,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data.users;
};

const loginViaPortal = async (user) => {
  const logInResponse = await axios({
    method: 'post',
    url: `${PORTAL_API_URL}/v1/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { username: user.username, password: user.password },
  }).catch((error) => {
    console.error('Unable to login %s', error);
  });

  if (DTFS_FF_MAGIC_LINK !== 'true') {
    return logInResponse?.data?.token;
  }
  const validationResponse = await axios({
    method: 'post',
    url: `${PORTAL_API_URL}/v1/users/me/validate-sign-in-link/123`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: logInResponse?.data?.token,
    },
    data: { token: logInResponse?.data?.token },
  }).catch((error) => {
    console.error('Unable to validate token %s', error);
  });
  return validationResponse?.data?.token;
};

const updateCurrency = async (currency, token) => {
  const response = await axios({
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/currencies/${currency.id}`,
    data: currency,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

const updateCountry = async (country, token) => {
  const response = await axios({
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token,
    },
    url: `${PORTAL_API_URL}/v1/countries/${country.code}`,
    data: country,
  }).catch((error) => {
    console.error('Error calling API %s', error);
  });

  return response.data;
};

module.exports = {
  createBank,
  createCurrency,
  createCountry,
  createDeal,
  getDeal,
  createIndustrySector,
  createMandatoryCriteria,
  createEligibilityCriteria,
  createUser,
  createInitialUser,
  deleteBank,
  deleteCurrency,
  deleteCountry,
  deleteDeal,
  deleteIndustrySector,
  deleteMandatoryCriteria,
  deleteEligibilityCriteria,
  deleteUser,
  listBanks,
  listCurrencies,
  listCountries,
  listDeals,
  listIndustrySectors,
  listMandatoryCriteria,
  listEligibilityCriteria,
  listUsers,
  loginViaPortal,
  updateCountry,
  updateCurrency,
  createInitialTfmUser,
  loginTfmUser,
  gef,
};
