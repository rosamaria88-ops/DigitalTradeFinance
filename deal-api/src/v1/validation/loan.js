const applyRules = require('./loan-rules');
const conditionalErrorList = require('./loan-rules/conditional-error-list');

module.exports = (loan, requestedCoverStartDateTimestamp) => {
  const errorList = applyRules(loan, requestedCoverStartDateTimestamp);
  const totalErrors = Object.keys(errorList).length;

  if (totalErrors === 0) {
    return {
      count: totalErrors,
      conditionalErrorList,
    };
  }

  return {
    count: totalErrors,
    errorList,
    conditionalErrorList,
  };
};
