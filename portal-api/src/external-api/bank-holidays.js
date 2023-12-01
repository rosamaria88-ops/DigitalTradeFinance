const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { EXTERNAL_API_URL, EXTERNAL_API_KEY } = process.env;

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': EXTERNAL_API_KEY,
};

/**
 * Resolves to the response of `GET /bank-holidays` from external-api.
 * @returns {import('./types').BankHolidaysResponseBody}
 */
const getBankHolidays = async () => {
  const response = await axios.get(`${EXTERNAL_API_URL}/bank-holidays`, { headers });
  return response.data;
};

/**
 * Fetches a list of bank holiday dates for the specified UK region
 * @param {import('./types').BankHolidayRegion} region
 * @returns {Promise<Date[]>}
 */
const getBankHolidayDatesForRegion = async (region) => {
  const allUkBankHolidays = await getBankHolidays();
  return allUkBankHolidays[region].events.map((event) => new Date(event.date));
};

module.exports = {
  getBankHolidays,
  getBankHolidayDatesForRegion,
};
