/**
 * Evaluates whether to return `month` or `months` based
 * on number of months provided.
 * @param {Integer} period Number of months
 * @returns {String} Singular or plural `month` string
 */
const monthString = (period) => (Number(period) === 1 ? 'month' : 'months');

/**
 * Maps tenor dates and return as string with singular
 * or plural `months` text.
 * @param {Boolean} hasBeenIssued Facility issuance stage
 * @param {Integer} months Number of cover months
 * @param {Integer} exposurePeriod Exposure in months
 * @returns {String} Tenor dates with `month(s)` appended, otherwise null
 */
const mapTenorDate = (
  hasBeenIssued,
  months,
  exposurePeriod,
) => {
  // If issued
  if (exposurePeriod) {
    return `${exposurePeriod} ${monthString(exposurePeriod)}`;
  }

  if (!months) {
    return null;
  }

  // Un-issued facility
  if (!hasBeenIssued) {
    return `${months} ${monthString(months)}`;
  }

  // Issued facility
  if (hasBeenIssued) {
    return `${months} ${monthString(months)}`;
  }

  return null;
};

module.exports = mapTenorDate;
