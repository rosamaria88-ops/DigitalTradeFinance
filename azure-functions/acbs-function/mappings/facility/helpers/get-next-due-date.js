const CONSTANTS = require('../../../constants');
const getFeeFrequencyMonths = require('./get-fee-frequency-months');
const { addMonth } = require('../../../helpers/date');

/**
 * Return facility next due date.
 * @param {Object} facility Facility object
 * @returns {Date} Facility due date in YYYY-MM-DD format
 */

const getNextDueDate = (facility) => {
  const { guaranteeCommencementDate, guaranteeExpiryDate } = facility.tfm.facilityGuaranteeDates;
  const months = getFeeFrequencyMonths(facility);

  if (facility.facilitySnapshot.feeType === CONSTANTS.FACILITY.FEE_TYPE.AT_MATURITY) {
    return guaranteeExpiryDate;
  }
  const nextDueDate = addMonth(guaranteeCommencementDate, months);
  return nextDueDate;
};

module.exports = getNextDueDate;