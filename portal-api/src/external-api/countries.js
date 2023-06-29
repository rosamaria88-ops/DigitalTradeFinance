const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const referenceProxyUrl = process.env.EXTERNAL_API_URL;

const getCountries = async () => {
  const response = await axios({
    method: 'get',
    url: `${referenceProxyUrl}/countries`,
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((err) => {
    console.error('Error retrieving countries from External API %O ', { status: err?.response?.status, data: err?.response?.data });
    return err?.response?.data;
  });

  return response.data && response.data.countries;
};

const getCountry = async (code) => {
  const response = await axios({
    method: 'get',
    url: `${referenceProxyUrl}/countries/${code}`,
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((err) => {
    console.error('Error retrieving country from External API %O ', { status: err?.response?.status, data: err?.response?.data });

    return err?.response?.data;
  });

  return response.data;
};

module.exports = {
  getCountries,
  getCountry,
};