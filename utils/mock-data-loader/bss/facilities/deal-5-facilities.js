const { nowTimestamp, twoMonths, twoMonthsTimestamp, threeMonths } = require('../dates');

module.exports = [
  {
    mockDealId: 5,
    type: 'Loan',
    ukefGuaranteeInMonths: '24',
    'coverEndDate-day': null,
    'coverEndDate-month': null,
    'coverEndDate-year': null,
    bankReferenceNumber: 'Test Loan',
    requestedCoverStartDate: null,
    disbursementAmount: null,
    value: '100000.00',
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
    ukefExposure: '60,000.00',
    updatedAt: nowTimestamp,
    interestMarginFee: '2',
    coveredPercentage: '60',
    minimumQuarterlyFee: '',
    guaranteeFeePayableByBank: '1.8000',
    premiumFrequency: 'Monthly',
    premiumType: 'In advance',
    dayCountBasis: '365',
  },
  {
    mockDealId: 5,
    type: 'Bond',
    ukefGuaranteeInMonths: null,
    facilityStage: 'Issued',
    hasBeenIssued: true,
    'coverEndDate-day': threeMonths.day,
    'coverEndDate-month': threeMonths.month,
    'coverEndDate-year': threeMonths.year,
    name: 'Test Bond',
    requestedCoverStartDate: twoMonthsTimestamp,
    value: '600000.00',
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
    bondType: 'Maintenance bond',
    'requestedCoverStartDate-day': twoMonths.day,
    'requestedCoverStartDate-month': twoMonths.month,
    'requestedCoverStartDate-year': twoMonths.year,
    bondBeneficiary: '',
    ukefExposure: '360,000.00',
    updatedAt: nowTimestamp,
    riskMarginFee: '2',
    coveredPercentage: '60',
    minimumRiskMarginFee: '',
    guaranteeFeePayableByBank: '1.8000',
    feeFrequency: 'Quarterly',
    feeType: 'In arrear',
    dayCountBasis: '360',
  },
];
