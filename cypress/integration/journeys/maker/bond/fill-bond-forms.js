const pages = require('../../../pages');
const BOND_FORM_VALUES = require('./bond-form-values');

// fill fields specific to the scenario - issued/unissued
const details = {
  bondStageIssued: () => {
    pages.bondDetails.bondIssuerInput().type(BOND_FORM_VALUES.DETAILS.bondIssuer);
    pages.bondDetails.bondTypeInput().select(BOND_FORM_VALUES.DETAILS.bondType.value);
    pages.bondDetails.bondStageIssuedInput().click();
    pages.bondDetails.requestedCoverStartDateDayInput().type(BOND_FORM_VALUES.DETAILS.requestedCoverStartDateDay);
    pages.bondDetails.requestedCoverStartDateMonthInput().type(BOND_FORM_VALUES.DETAILS.requestedCoverStartDateMonth);
    pages.bondDetails.requestedCoverStartDateYearInput().type(BOND_FORM_VALUES.DETAILS.requestedCoverStartDateYear);
    pages.bondDetails.coverEndDateDayInput().type(BOND_FORM_VALUES.DETAILS.coverEndDateDay);
    pages.bondDetails.coverEndDateMonthInput().type(BOND_FORM_VALUES.DETAILS.coverEndDateMonth);
    pages.bondDetails.coverEndDateYearInput().type(BOND_FORM_VALUES.DETAILS.coverEndDateYear);
    pages.bondDetails.uniqueIdentificationNumberInput().type(BOND_FORM_VALUES.DETAILS.uniqueIdentificationNumber);
    pages.bondDetails.bondBeneficiaryInput().type(BOND_FORM_VALUES.DETAILS.bondBeneficiary);
  },
  bondStageUnissued: () => {
    pages.bondDetails.bondStageUnissuedInput().click();
    pages.bondDetails.ukefGuaranteeInMonthsInput().type(BOND_FORM_VALUES.DETAILS.ukefGuaranteeInMonths);
  },
};

const financialDetails = {
  transactionCurrencySameAsSupplyContractCurrency: () => {
    pages.bondFinancialDetails.bondValueInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.bondValue);
    pages.bondFinancialDetails.transactionCurrencySameAsSupplyContractCurrencyYesInput().click();
    pages.bondFinancialDetails.riskMarginFeeInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.riskMarginFee);
    pages.bondFinancialDetails.coveredPercentageInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.coveredPercentage);
    pages.bondFinancialDetails.minimumRiskMarginFeeInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.minimumRiskMarginFee);
  },
  transactionCurrencyNotTheSameAsSupplyContractCurrency: () => {
    pages.bondFinancialDetails.bondValueInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.bondValue);
    pages.bondFinancialDetails.transactionCurrencySameAsSupplyContractCurrencyNoInput().click();
    pages.bondFinancialDetails.currencyInput().select(BOND_FORM_VALUES.FINANCIAL_DETAILS.currency.value);
    pages.bondFinancialDetails.conversionRateInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.conversionRate);
    pages.bondFinancialDetails.conversionRateDateDayInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.conversionRateDateDay);
    pages.bondFinancialDetails.conversionRateDateMonthInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.conversionRateDateMonth);
    pages.bondFinancialDetails.conversionRateDateYearInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.conversionRateDateYear);
    pages.bondFinancialDetails.riskMarginFeeInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.riskMarginFee);
    pages.bondFinancialDetails.coveredPercentageInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.coveredPercentage);
    pages.bondFinancialDetails.minimumRiskMarginFeeInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.minimumRiskMarginFee);
  },
};

const feeDetails = () => {
  pages.bondFeeDetails.feeTypeAtMaturityInput().click();
  pages.bondFeeDetails.feeFrequencyAnnuallyInput().click();
  pages.bondFeeDetails.dayCountBasis365Input().click();
};

module.exports = {
  details,
  financialDetails,
  feeDetails,
};
