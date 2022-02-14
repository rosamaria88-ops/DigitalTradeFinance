const {
  FACILITY_PROVIDED_DETAILS, FACILITY_TYPE, CURRENCY,
} = require('../../../portal-api/src/v1/gef/enums');

const FACILITIES = [[],
  [{
    type: FACILITY_TYPE.CASH,
    hasBeenIssued: true,
    name: null,
    startOnDayOfNotice: null,
    shouldCoverStartOnSubmission: null,
    coverStartDate: null,
    coverEndDate: null,
    monthsOfCover: null,
    details: null,
    detailsOther: null,
    currency: null,
    value: null,
    coverPercentage: null,
    interestPercentage: null,
    paymentType: null,
  }, {
    type: FACILITY_TYPE.CASH,
    hasBeenIssued: false,
    name: null,
    startOnDayOfNotice: null,
    shouldCoverStartOnSubmission: null,
    coverStartDate: null,
    coverEndDate: null,
    monthsOfCover: null,
    details: null,
    detailsOther: null,
    currency: null,
    value: null,
    coverPercentage: null,
    interestPercentage: null,
    paymentType: null,
  }], [{
    type: FACILITY_TYPE.CASH,
    hasBeenIssued: true,
    name: 'This Cash facility 1',
    startOnDayOfNotice: true,
    shouldCoverStartOnSubmission: false,
    coverStartDate: '2021-10-08T00:00:00.000Z',
    coverEndDate: '2021-08-12T00:00:00.000Z',
    monthsOfCover: 18,
    details: [
      FACILITY_PROVIDED_DETAILS.COMMITTED,
      FACILITY_PROVIDED_DETAILS.FACTORING,
    ],
    detailsOther: null,
    currency: { id: CURRENCY.GBP },
    value: 1000000,
    coverPercentage: 60,
    interestPercentage: 30,
    paymentType: 'Monthly',
    feeType: 'In advance',
    feeFrequency: 'Monthly',
    dayCountBasis: '365',
  }, {
    type: FACILITY_TYPE.CASH,
    hasBeenIssued: false,
    name: 'That Cash facility 2',
    startOnDayOfNotice: true,
    shouldCoverStartOnSubmission: true,
    coverStartDate: null,
    coverEndDate: '2021-08-12T00:00:00.000Z',
    monthsOfCover: 6,
    details: [
      FACILITY_PROVIDED_DETAILS.TERM,
      FACILITY_PROVIDED_DETAILS.RESOLVING,
      FACILITY_PROVIDED_DETAILS.COMMITTED,
      FACILITY_PROVIDED_DETAILS.UNCOMMITTED,
      FACILITY_PROVIDED_DETAILS.ON_DEMAND,
      FACILITY_PROVIDED_DETAILS.FACTORING,
      FACILITY_PROVIDED_DETAILS.OTHER,
    ],
    detailsOther: 'Other',
    currency: { id: CURRENCY.EUR },
    value: 18000000,
    coverPercentage: 40,
    interestPercentage: 0.1,
    paymentType: 'Monthly',
    feeType: 'In advance',
    feeFrequency: 'Monthly',
    dayCountBasis: '365',
  }, {
    type: FACILITY_TYPE.CONTINGENT,
    hasBeenIssued: true,
    name: 'This Contingent facility 1',
    startOnDayOfNotice: false,
    shouldCoverStartOnSubmission: false,
    coverStartDate: '2021-10-08T00:00:00.000Z',
    coverEndDate: '2021-08-12T00:00:00.000Z',
    monthsOfCover: 48,
    details: [
      FACILITY_PROVIDED_DETAILS.OTHER,
    ],
    detailsOther: 'This is the other description',
    currency: { id: CURRENCY.YEN },
    value: 30000000,
    coverPercentage: 20,
    interestPercentage: 50.9,
    paymentType: 'Monthly',
    feeType: 'In advance',
    feeFrequency: 'Monthly',
    dayCountBasis: '365',
  }, {
    type: FACILITY_TYPE.CONTINGENT,
    hasBeenIssued: false,
    name: 'This Contingent facility 2',
    startOnDayOfNotice: false,
    shouldCoverStartOnSubmission: false,
    coverStartDate: '2021-10-08T00:00:00.000Z',
    coverEndDate: '2021-08-12T00:00:00.000Z',
    monthsOfCover: 48,
    details: [
      FACILITY_PROVIDED_DETAILS.OTHER,
    ],
    detailsOther: 'This is the other description',
    currency: { id: CURRENCY.YEN },
    value: 30000000,
    coverPercentage: 20,
    interestPercentage: 50.9,
    paymentType: 'Quarterly',
    feeType: 'In advance',
    feeFrequency: 'Quarterly',
    dayCountBasis: '365',
  }],
];

module.exports = FACILITIES;
