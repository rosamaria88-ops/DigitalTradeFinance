const { hasValue } = require('../../../../utils/string');
const ukefGuaranteeLengthInMonths = require('./ukef-guarantee-length-in-months');

module.exports = (loan, errorList) => {
  let newErrorList = { ...errorList };
  const {
    facilityStage,
  } = loan;

  if (hasValue(facilityStage)
    && facilityStage === 'Conditional') {
    newErrorList = ukefGuaranteeLengthInMonths(loan, newErrorList);
  }

  return newErrorList;
};
