const { nowTimestamp, twoMonths, twoMonthsTimestamp, threeMonths } = require('../dates');

module.exports = [
  {
    mockDealId: 2,
    type: 'Bond',
    ukefGuaranteeInMonths: null,
    facilityStage: 'Issued',
    hasBeenIssued: true,
    'coverEndDate-day': threeMonths.day,
    'coverEndDate-month': threeMonths.month,
    'coverEndDate-year': threeMonths.year,
    name: 'Test Bond 2',
    requestedCoverStartDate: twoMonthsTimestamp,
    value: '500000.00',
    currencySameAsSupplyContractCurrency: 'true',
    currency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
      currencyId: 12,
    },
    conversionRate: null,
    'conversionRateDate-day': null,
    'conversionRateDate-month': null,
    'conversionRateDate-year': null,
    createdDate: nowTimestamp,
    bondIssuer: '',
    bondType: 'Performance bond',
    'requestedCoverStartDate-day': twoMonths.day,
    'requestedCoverStartDate-month': twoMonths.month,
    'requestedCoverStartDate-year': twoMonths.year,
    bondBeneficiary: '',
    ukefExposure: '400,000.00',
    updatedAt: nowTimestamp,
    riskMarginFee: '2',
    coveredPercentage: '80',
    minimumRiskMarginFee: '',
    guaranteeFeePayableByBank: '1.8000',
    feeFrequency: 'Monthly',
    feeType: 'In arrear',
    dayCountBasis: '365',
    viewedPreviewPage: true,
  },
  {
    mockDealId: 2,
    type: 'Loan',
    ukefGuaranteeInMonths: '12',
    'coverEndDate-day': null,
    'coverEndDate-month': null,
    'coverEndDate-year': null,
    name: 'Test Loan 2',
    requestedCoverStartDate: null,
    disbursementAmount: null,
    value: '250000.00',
    currencySameAsSupplyContractCurrency: 'true',
    currency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
      currencyId: 12,
    },
    conversionRate: null,
    'conversionRateDate-day': null,
    'conversionRateDate-month': null,
    'conversionRateDate-year': null,
    createdDate: nowTimestamp,
    facilityStage: 'Conditional',
    hasBeenIssued: false,
    'requestedCoverStartDate-day': null,
    'requestedCoverStartDate-month': null,
    'requestedCoverStartDate-year': null,
    ukefExposure: '200,000.00',
    updatedAt: nowTimestamp,
    interestMarginFee: '2',
    coveredPercentage: '80',
    minimumQuarterlyFee: '',
    guaranteeFeePayableByBank: '1.8000',
    premiumFrequency: 'Monthly',
    premiumType: 'In advance',
    dayCountBasis: '365',
  },
];
