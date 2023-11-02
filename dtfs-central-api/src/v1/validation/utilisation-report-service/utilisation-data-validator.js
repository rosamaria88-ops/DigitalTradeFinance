const validator = require('validator');
const REGEXES = require('../../../constants/regex');

/**
 * @typedef {Object} ValidationError
 * @property {number} index - The index of the object
 * @property {string} error - The error message of the object
 */

/**
 * Validates the UKEF ID to match the UKEF facility ID regex or be falsey, returns an error message or null if valid.
 * @param {unknown} ukefId - ukef facility ID.
 * @param {number} index - index of the facility in the array.
 * @returns {ValidationError | null} - Error message or null if valid.
 */
const validateUkefId = (ukefId, index) => {
  if (ukefId) {
    if (!ukefId.toString().match(REGEXES.UKEF_FACILITY_ID_REGEX)) {
      return { index, error: 'UKEF ID must be an 8 digit number' };
    }
  }
  return null;
};

/**
 * Validates the exporter to be a string or be falsey, returns an error message or null if valid.
 * @param {unknown} exporter - exporter of the facility.
 * @param {number} index - index of the facility in the array.
 * @returns {ValidationError | null} - Error message or null if valid.
 */
const validateExporter = (exporter, index) => {
  if (exporter) {
    if (typeof exporter !== 'string') {
      return { index, error: 'Exporter must be a string' };
    }
  }
  return null;
};

const validateMonetaryValue = (monetaryValue, index, fieldName) => {
  if (monetaryValue) {
    if (!monetaryValue.toString().match(REGEXES.CURRENCY_NUMBER_REGEX)) {
      return { index, error: `${fieldName} must be a monetary value` };
    }
  }
  return null;
};

/**
 * Validates the facility utilisation to be a monetary value or be falsey, returns an error message or null if valid.
 * @param {unknown} facilityUtilisation - utilisation of the facility.
 * @param {number} index - index of the facility in the array.
 * @returns {ValidationError | null} - Error message or null if valid.
 */
const validateFacilityUtilisation = (facilityUtilisation, index) => validateMonetaryValue(facilityUtilisation, index, 'Facility utilisation');

/**
 * Validates the total fees accrued to be a monetary value or be falsey, returns an error message or null if valid.
 * @param {String | number | null} totalFeesAccrued
 * @param {number} index - index of the facility in the array.
 * @returns {ValidationError | null} - Error message or null if valid.
 */
const validateTotalFeesAccrued = (totalFeesAccrued, index) => validateMonetaryValue(totalFeesAccrued, index, 'Total fees accrued');

/**
 * Validates the monthly fees paid to be a monetary value or be falsey, returns an error message or null if valid.
 * @param {unknown} monthlyFeesPaid
 * @param {number} index - index of the facility in the array.
 * @returns {ValidationError | null} - Error message or null if valid.
 */
const validateMonthlyFeesPaid = (monthlyFeesPaid, index) => validateMonetaryValue(monthlyFeesPaid, index, 'Monthly fees paid');

const validateCurrencyValue = (currencyValue, index, fieldName) => {
  if (currencyValue) {
    if (!validator.isISO4217(currencyValue.toString())) {
      return { index, error: `${fieldName} must be an ISO 4217 currency code` };
    }
  }
  return null;
};

/**
 * Validates the payment currency to be an ISO 4217 currency code or be falsey, returns an error message or null if valid.
 * @param {unknown} paymentCurrency - payment currency of the facility.
 * @param {number} index - index of the facility in the array.
 * @returns {ValidationError | null} - Error message or null if valid.
 */
const validatePaymentCurrency = (paymentCurrency, index) => validateCurrencyValue(paymentCurrency, index, 'Payment currency');

/**
 * Validates the base currency to be an ISO 4217 currency code or be falsey, returns an error message or null if valid.
 * @param {unknown} baseCurrency - base currency of the facility.
 * @param {number} index - index of the facility in the array.
 * @returns {ValidationError | null} - Error message or null if valid.
 */
const validateBaseCurrency = (baseCurrency, index) => validateCurrencyValue(baseCurrency, index, 'Base currency');

/**
 * Validates the exchange rate or be falsey, returns an error message or null if valid.
 * @param {unknown} exchangeRate - exchange rate at payment date.
 * @param {number} index - index of the facility in the array.
 * @returns {ValidationError | null} - Error message or null if valid.
 */
const validateExchangeRate = (exchangeRate, index) => {
  if (exchangeRate) {
    if (!exchangeRate.toString().match(REGEXES.EXCHANGE_RATE_REGEX)) {
      return { index, error: 'Exchange rate must be a number representing an exchange rate' };
    }
  }
  return null;
};

module.exports = {
  validateUkefId,
  validateExporter,
  validateBaseCurrency,
  validateFacilityUtilisation,
  validateTotalFeesAccrued,
  validateMonthlyFeesPaid,
  validatePaymentCurrency,
  validateExchangeRate,
};
