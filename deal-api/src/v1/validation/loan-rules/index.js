const bankReferenceNumber = require('./bank-reference-number');
const facilityStage = require('./facility-stage');
const facilityStageConditional = require('./facility-stage-conditional');
const facilityStageUnconditional = require('./facility-stage-unconditional');
const facilityValue = require('./facility-value');
const currencySameAsSupplyContractCurrency = require('../fields/currency-same-as-supply-contract');
const currencyNotTheSameAsSupplyContractCurrency = require('../fields/currency-not-the-same-as-supply-contract-rules');
const interestMarginFee = require('./interest-margin-fee');
const coveredPercentage = require('../fields/covered-percentage');
const minimumQuarterlyFee = require('./minimum-quarterly-fee');

const rules = [
  bankReferenceNumber,
  facilityStage,
  facilityStageConditional,
  facilityStageUnconditional,
  facilityValue,
  currencySameAsSupplyContractCurrency,
  currencyNotTheSameAsSupplyContractCurrency,
  interestMarginFee,
  coveredPercentage,
  minimumQuarterlyFee,
];

module.exports = (submissionDetails) => {
  let errorList = {};

  for (let i = 0; i < rules.length; i += 1) {
    errorList = rules[i](submissionDetails, errorList);
  }

  return errorList;
};
