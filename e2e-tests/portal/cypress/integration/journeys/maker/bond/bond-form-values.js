const { roundNumber } = require('../../../../../../../portal-api/src/utils/number');

const now = new Date();
const coverEndDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 2);
  return date;
};

const padDate = (dayOrMonth) => String(dayOrMonth).padStart(2, 0);

const DETAILS = {
  bondIssuer: 'mock issuer',
  bondType: {
    value: 'Maintenance bond',
    text: 'Maintenance bond',
  },

  // 'issued' facility stage specifics
  requestedCoverStartDateDay: padDate(now.getDate()),
  requestedCoverStartDateMonth: padDate(now.getMonth() + 1),
  requestedCoverStartDateYear: now.getFullYear(),
  coverEndDateDay: padDate(coverEndDate().getDate()),
  coverEndDateMonth: padDate(coverEndDate().getMonth() + 1),
  coverEndDateYear: coverEndDate().getFullYear(),
  uniqueIdentificationNumber: '123456',
  bondBeneficiary: 'mock beneficiary',

  // 'unissued' facility stage specifics
  ukefGuaranteeInMonths: '12',
};

const riskMarginFee = '20';

const expectedGuaranteeFeePayableByBank = () => {
  const calculation = riskMarginFee * 0.9;
  const formattedRiskMarginFee = calculation.toLocaleString('en', { minimumFractionDigits: 4 });
  return formattedRiskMarginFee;
};

const facilityValue = '23456789.99';
const facilityValueFormatted = '23,456,789.99';
const coveredPercentage = '80';

const expectedUkefExposure = () => {
  const strippedFacilityValue = facilityValue.replace(/,/g, '');

  const calculation = strippedFacilityValue * (coveredPercentage / 100);

  const ukefExposure = roundNumber(calculation, 2);
  const formattedUkefExposure = ukefExposure.toLocaleString('en', { minimumFractionDigits: 2 });
  return formattedUkefExposure;
};

const FINANCIAL_DETAILS = {
  facilityValue,
  facilityValueFormatted,
  riskMarginFee,
  coveredPercentage,
  minimumRiskMarginFee: '1.23',
  ukefExposure: expectedUkefExposure(),
  guaranteeFeePayableByBank: expectedGuaranteeFeePayableByBank(),

  // 'transaction currency not the same as supply contract currency' specifics
  currency: {
    value: 'EUR',
    text: 'EUR - Euros',
  },
  conversionRate: '100',
  conversionRateDateDay: now.getDate(),
  conversionRateDateMonth: now.getMonth() + 1,
  conversionRateDateYear: now.getFullYear(),
};

module.exports = {
  DETAILS,
  FINANCIAL_DETAILS,
};
