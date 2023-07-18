const axios = require('axios');
const dotenv = require('dotenv');
const { isValidRegex } = require('../v1/validation/validateIds');
const { INDUSTRY_SECTOR_ID } = require('../constants/regex');

dotenv.config();

const { EXTERNAL_API_URL, EXTERNAL_API_KEY } = process.env;

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': EXTERNAL_API_KEY,
};

const getIndustrySectors = async () => {
  const { status, data } = await axios({
    method: 'get',
    url: `${EXTERNAL_API_URL}/industry-sectors`,
    headers,
  }).catch((err) => {
    console.error('Error retrieving industry sectors from External API. ', err);
    return err;
  });

  return {
    status,
    industrySectors: data.industrySectors,
  };
};

const getIndustrySector = async (id) => {
  if (!isValidRegex(INDUSTRY_SECTOR_ID, id)) {
    console.error('industry-sectors.getIndustrySector: invalid id provided', id);
    return { status: 400 };
  }
  const { status, data } = await axios({
    method: 'get',
    url: `${EXTERNAL_API_URL}/industry-sectors/${id}`,
    headers,
  }).catch((err) => {
    console.error('Error retrieving industry sector from External API. ', err);
    return { status: 404, error: err };
  });

  return { status, data };
};

module.exports = {
  getIndustrySectors,
  getIndustrySector,
};
