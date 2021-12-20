const moment = require('moment');
const dealFullyCompleted = require('./deal-fully-completed');

const deal = {
  ...dealFullyCompleted,
  mockFacilities: [
    {
      facilityType: 'bond',
      bondIssuer: 'issuer',
      bondType: 'Retention bond',
      facilityStage: 'Unissued',
      ukefGuaranteeInMonths: '24',
      uniqueIdentificationNumber: '1234',
      bondBeneficiary: 'test',
      value: '123456.55',
      currencySameAsSupplyContractCurrency: 'true',
      riskMarginFee: '9.09',
      coveredPercentage: '2',
      feeType: 'In arrear',
      feeFrequency: 'Monthly',
      dayCountBasis: '360',
      issuedDate: moment().utc().valueOf(),
      requestedCoverStartDate: moment().utc().valueOf(),
      'coverEndDate-day': `${moment().add(1, 'month').format('DD')}`,
      'coverEndDate-month': `${moment().add(1, 'month').format('MM')}`,
      'coverEndDate-year': `${moment().add(1, 'month').format('YYYY')}`,
      guaranteeFeePayableByBank: '12.345',
      ukefExposure: '1,234.56',
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
    },
    {
      facilityType: 'bond',
      bondIssuer: 'issuer',
      bondType: 'Retention bond',
      facilityStage: 'Unissued',
      ukefGuaranteeInMonths: '24',
      uniqueIdentificationNumber: '1234',
      bondBeneficiary: 'test',
      value: '123456.55',
      currencySameAsSupplyContractCurrency: 'true',
      riskMarginFee: '9.09',
      coveredPercentage: '2',
      feeType: 'In arrear',
      feeFrequency: 'Monthly',
      dayCountBasis: '360',
      issuedDate: moment().utc().valueOf(),
      'coverEndDate-day': `${moment().add(1, 'month').format('DD')}`,
      'coverEndDate-month': `${moment().add(1, 'month').format('MM')}`,
      'coverEndDate-year': `${moment().add(1, 'month').format('YYYY')}`,
      guaranteeFeePayableByBank: '12.345',
      ukefExposure: '1,234.56',
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
    },
    {
      facilityType: 'bond',
      bondIssuer: 'issuer',
      bondType: 'Retention bond',
      facilityStage: 'Issued',
      previousFacilityStage: 'Unissued',
      ukefGuaranteeInMonths: '24',
      uniqueIdentificationNumber: '1234',
      bondBeneficiary: 'test',
      value: '123456.55',
      currencySameAsSupplyContractCurrency: 'true',
      riskMarginFee: '9.09',
      coveredPercentage: '2',
      feeType: 'In arrear',
      feeFrequency: 'Monthly',
      dayCountBasis: '360',
      issuedDate: moment().utc().valueOf(),
      'coverEndDate-day': `${moment().add(1, 'month').format('DD')}`,
      'coverEndDate-month': `${moment().add(1, 'month').format('MM')}`,
      'coverEndDate-year': `${moment().add(1, 'month').format('YYYY')}`,
      guaranteeFeePayableByBank: '12.345',
      ukefExposure: '1,234.56',
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
      status: 'Ready for check',
    },
    {
      facilityType: 'loan',
      facilityStage: 'Conditional',
      ukefGuaranteeInMonths: '12',
      bankReferenceNumber: '123456',
      guaranteeFeePayableByBank: '10.8000',
      ukefExposure: '2,469,135.60',
      value: '12345678',
      currencySameAsSupplyContractCurrency: 'true',
      interestMarginFee: '12',
      coveredPercentage: '20',
      minimumQuarterlyFee: '20',
      premiumFrequency: 'Monthly',
      premiumType: 'In advance',
      dayCountBasis: '365',
      currency: {
        text: 'GBP - UK Sterling',
        id: 'GBP',
      },
      issuedDate: moment().utc().valueOf(),
      requestedCoverStartDate: moment().utc().valueOf(),
      'coverEndDate-day': `${moment().add(1, 'month').format('DD')}`,
      'coverEndDate-month': `${moment().add(1, 'month').format('MM')}`,
      'coverEndDate-year': `${moment().add(1, 'month').format('YYYY')}`,
      disbursementAmount: '10',
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
    },
    {
      facilityType: 'loan',
      facilityStage: 'Conditional',
      ukefGuaranteeInMonths: '12',
      bankReferenceNumber: '123456',
      guaranteeFeePayableByBank: '10.8000',
      ukefExposure: '2,469,135.60',
      value: '12345678',
      currencySameAsSupplyContractCurrency: 'true',
      interestMarginFee: '12',
      coveredPercentage: '20',
      minimumQuarterlyFee: '20',
      premiumFrequency: 'Monthly',
      premiumType: 'In advance',
      dayCountBasis: '365',
      currency: {
        text: 'GBP - UK Sterling',
        id: 'GBP',
      },
      issuedDate: moment().utc().valueOf(),
      'coverEndDate-day': `${moment().add(1, 'month').format('DD')}`,
      'coverEndDate-month': `${moment().add(1, 'month').format('MM')}`,
      'coverEndDate-year': `${moment().add(1, 'month').format('YYYY')}`,
      disbursementAmount: '10',
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
    },
    {
      facilityType: 'loan',
      facilityStage: 'Unconditional',
      previousFacilityStage: 'Conditional',
      ukefGuaranteeInMonths: '12',
      bankReferenceNumber: '123456',
      guaranteeFeePayableByBank: '10.8000',
      ukefExposure: '2,469,135.60',
      value: '12345678',
      currencySameAsSupplyContractCurrency: 'false',
      interestMarginFee: '12',
      coveredPercentage: '20',
      minimumQuarterlyFee: '20',
      premiumFrequency: 'Monthly',
      premiumType: 'In advance',
      dayCountBasis: '365',
      currency: {
        text: 'GBP - UK Sterling',
        id: 'GBP',
      },
      conversionRate: '80',
      'conversionRateDate-day': `${moment().subtract(1, 'day').format('DD')}`,
      'conversionRateDate-month': `${moment().subtract(1, 'day').format('MM')}`,
      'conversionRateDate-year': `${moment().format('YYYY')}`,
      disbursementAmount: '10',
      issuedDate: moment().utc().valueOf(),
      'coverEndDate-day': `${moment().add(1, 'month').format('DD')}`,
      'coverEndDate-month': `${moment().add(1, 'month').format('MM')}`,
      'coverEndDate-year': `${moment().add(1, 'month').format('YYYY')}`,
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
      status: 'Ready for check',
    },
  ],
};

module.exports = deal;
