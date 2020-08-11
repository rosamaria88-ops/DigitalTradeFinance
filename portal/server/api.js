const axios = require('axios');
const FormData = require('form-data');
const apollo = require('./graphql/apollo');

const { dealsQuery, transactionsQuery } = require('./graphql/queries');

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
      user: response.data.user,
    } : '';
  } catch (err) {
    return new Error('error with token');// do something proper here, but for now just reject failed logins..
  }
};

const contracts = async (start, pagesize, filters, token) => {
  const params = {
    start,
    pagesize,
    filters,
  };

  const response = await apollo('GET', dealsQuery, params, token);

  return response.data.deals;
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

  return response;
};

const updateDealName = async (id, newName, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${id}/bankSupplyContractName`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: { bankSupplyContractName: newName },
  });

  return {
    status: response.status,
    data: response.data,
  };
};

const updateDealStatus = async (statusUpdate, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${statusUpdate._id}/status`, // eslint-disable-line no-underscore-dangle
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: statusUpdate,
  });

  return {
    status: response.status,
    data: response.data,
  };
};

const getSubmissionDetails = async (id, token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/deals/${id}/submission-details`, // eslint-disable-line no-underscore-dangle
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return {
    status: response.status,
    validationErrors: response.data.validationErrors,
    data: response.data.data,
  };
};

const updateSubmissionDetails = async (deal, submissionDetails, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${deal._id}/submission-details`, // eslint-disable-line no-underscore-dangle
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: submissionDetails,
  });

  return {
    status: response.status,
    validationErrors: response.data.validationErrors,
    data: response.data.data,
  };
};

const cloneDeal = async (dealId, newDealData, token) => {
  const response = await axios({
    method: 'post',
    url: `${urlRoot}/v1/deals/${dealId}/clone`, // eslint-disable-line no-underscore-dangle
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: newDealData,
  });

  return response.data;
};

const updateEligibilityCriteria = async (dealId, criteria, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${dealId}/eligibility-criteria`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: criteria,
  });
  return response.data;
};

const updateEligibilityDocumentation = async (dealId, body, files, token) => {
  const formData = new FormData();

  Object.entries(body).forEach(([fieldname, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(fieldname, v));
    } else {
      formData.append(`${fieldname}`, value);
    }
  });

  files.forEach((file) => {
    formData.append(file.fieldname, file.buffer, file.originalname);
  });


  const formHeaders = formData.getHeaders();

  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${dealId}/eligibility-documentation`,
    headers: {
      Authorization: token,
      ...formHeaders,
    },
    data: formData.getBuffer(),
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });

  return response.data;
};

const createDealLoan = async (dealId, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${dealId}/loan/create`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const getDealLoan = async (dealId, loanId, token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/deals/${dealId}/loan/${loanId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const updateDealLoan = async (dealId, loanId, formData, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${dealId}/loan/${loanId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: formData,
  });
  return response.data;
};

const updateLoanIssueFacility = async (dealId, loanId, formData, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${dealId}/loan/${loanId}/issue-facility`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: formData,
  });
  return response.data;
};

const createBond = async (dealId, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${dealId}/bond/create`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const contractBond = async (dealId, bondId, token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/deals/${dealId}/bond/${bondId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const updateBond = async (dealId, bondId, formData, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${dealId}/bond/${bondId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: formData,
  });
  return response.data;
};

const updateBondIssueFacility = async (dealId, bondId, formData, token) => {
  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/deals/${dealId}/bond/${bondId}/issue-facility`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: formData,
  });
  return response.data;
};

const banks = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/banks`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data.banks;
};

const getCurrencies = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/currencies`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return {
    status: response.status,
    currencies: response.data.currencies,
  };
};

const getCountries = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/countries`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return {
    status: response.status,
    countries: response.data.countries,
  };
};

const getIndustrySectors = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/industry-sectors`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return {
    status: response.status,
    industrySectors: response.data.industrySectors,
  };
};

const transactions = async (start, pagesize, filters, token) => {
  const params = {
    start,
    pagesize,
    filters,
  };
  const response = await apollo('GET', transactionsQuery, params, token);
  return response.data.transactions;
};

const validateToken = async (token) => {
  if (!token) return false;

  const response = await axios({
    method: 'get',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    url: `${urlRoot}/v1/validate`,
  });

  return response.status === 200;
};

const users = async (token) => {
  if (!token) return false;

  const response = await axios({
    method: 'get',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    url: `${urlRoot}/v1/users`,
  });

  return response.data;
};

const user = async (id, token) => {
  if (!token) return false;

  const response = await axios({
    method: 'get',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    url: `${urlRoot}/v1/users/${id}`,
  });

  return response.data;
};

const createUser = async (userToCreate, token) => {
  if (!token) return false;

  const response = await axios({
    method: 'post',
    url: `${urlRoot}/v1/users`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: userToCreate,
  }).catch((err) => err.response);

  return response;
};

const updateUser = async (id, update, token) => {
  if (!token) return false;

  const response = await axios({
    method: 'put',
    url: `${urlRoot}/v1/users/${id}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: update,
  }).catch((err) => err.response);

  return response;
};

// TODO middleware uses getDeal; once everything uses middleware get rid of the 'contract' method..
const getDeal = async (id, token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/deals/${id}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return {
    status: response.status,
    deal: response.data.deal,
    validationErrors: response.data.validationErrors,
  };
};

const getMandatoryCriteria = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/mandatory-criteria`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return {
    status: response.status,
    mandatoryCriteria: response.data.mandatoryCriteria,
  };
};

const downloadFile = async (id, fieldname, filename, token) => {
  const response = await axios({
    method: 'get',
    responseType: 'stream',
    url: `${urlRoot}/v1/deals/${id}/eligibility-documentation/${fieldname}/${filename}`,
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

const mga = async (token) => {
  const response = await axios({
    method: 'get',
    url: `${urlRoot}/v1/mga`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

const downloadMga = async (filename, token) => {
  const response = await axios({
    method: 'get',
    responseType: 'stream',
    url: `${urlRoot}/v1/mga/${filename}`,
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const createFeedback = async (formData, token) => {
  const response = await axios({
    method: 'post',
    url: `${urlRoot}/v1/feedback`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: formData,
  });
  return response.data;
};


export default {
  banks,
  cloneDeal,
  contractBond,
  contracts,
  createBond,
  createDeal,
  createDealLoan,
  createFeedback,
  login,
  transactions,
  updateBond,
  updateBondIssueFacility,
  updateDeal,
  updateDealLoan,
  updateLoanIssueFacility,
  updateDealName,
  updateDealStatus,
  updateEligibilityCriteria,
  updateEligibilityDocumentation,
  getSubmissionDetails,
  updateSubmissionDetails,
  validateToken,
  users,
  user,
  createUser,
  updateUser,
  getCurrencies,
  getCountries,
  getDeal,
  getDealLoan,
  getIndustrySectors,
  getMandatoryCriteria,
  downloadFile,
  mga,
  downloadMga,
};
