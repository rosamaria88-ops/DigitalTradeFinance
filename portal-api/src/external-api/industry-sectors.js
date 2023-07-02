const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const { EXTERNAL_API_URL, API_KEY } = process.env;

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
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
  const { status, data } = await axios({
    method: 'get',
    url: `${EXTERNAL_API_URL}/industry-sectors/${id}`,
    headers,
  }).catch((err) => {
    console.error('Error retrieving industry sector from External API. ', err);
    return err;
  });

  return { status, data };
};

module.exports = {
  getIndustrySectors,
  getIndustrySector,
};
