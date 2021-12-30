const CONSTANTS = require('../constants');
const { sub, getUnixTime } = require('date-fns');

const today = new Date();
const threeDaysAgo = sub(today, { days: 3 });
const threeDaysAgoUnix = getUnixTime(threeDaysAgo).toString();

const MOCK_AIN_APPLICATION = {
  dealType: 'GEF',
  status: CONSTANTS.DEAL_STATUS.UKEF_ACKNOWLEDGED,
  bank: { id: '9' },
  exporterId: '61a7710b2ae62b0013dae686',
  eligibility: {
    criteria: [],
    updatedAt: 1638535562287,
    status: 'COMPLETED',
  },
  bankInternalRefName: 'Mock ref name',
  mandatoryVersionId: null,
  createdAt: 1638363403942,
  updatedAt: 1638983294975,
  submissionType: CONSTANTS.DEAL_SUBMISSION_TYPE.AIN,
  submissionCount: 1,
  submissionDate: `${threeDaysAgoUnix}503`,
  supportingInformation: {
    manualInclusion: [],
    securityDetails: {},
    status: 'IN_PROGRESS',
    requiredFields: [],
  },
  ukefDealId: '0030113304',
  checkerId: '619bae3467cc7c002069fc21',
  editedBy: ['619bae3467cc7c002069fc1e'],
  additionalRefName: 'Mock additional ref name',
  facilitiesUpdated: 1638542220497,
  comments: [],
  previousStatus: 'UKEF_IN_PROGRESS',
  ukefDecision: [],
  ukefDecisionAccepted: true,
  id: '61a7710b2ae62b0013dae687',
  exporter: { status: 'COMPLETED', details: [], validation: [] },
  facilities: {
    status: 'COMPLETED',
    items: [],
  },
  exporterStatus: { text: 'Completed', class: 'govuk-tag--green', code: 'COMPLETED' },
  eligibilityCriteriaStatus: { text: 'Completed', class: 'govuk-tag--green', code: 'COMPLETED' },
  facilitiesStatus: { text: 'Completed', class: 'govuk-tag--green', code: 'COMPLETED' },
  supportingInfoStatus: { text: 'Completed', class: 'govuk-tag--green', code: 'COMPLETED' },
  canSubmit: false,
  checkerCanSubmit: false,
  maker: {
    username: 'BANK1_MAKER1',
    firstname: 'ABC',
    surname: 'DEF',
    email: 'test',
    roles: [],
    bank: {},
    timezone: 'Europe/London',
    lastLogin: '1638807320335',
    'user-status': 'active',
    _id: '619bae3467cc7c002069fc1e',
  },
  checker: {
    username: 'BANK1_CHECKER1',
    firstname: 'DEF',
    surname: 'GHJ',
    email: 'test2',
    roles: ['maker'],
    bank: {},
    timezone: 'Europe/London',
    lastLogin: '1638964634607',
    'user-status': 'active',
    _id: '619bae3467cc7c002069fc21',
  },
};

const MOCK_FACILITY_ONE = {
  type: 'CASH',
  hasBeenIssued: false,
  name: 'Facility one',
  shouldCoverStartOnSubmission: true,
  coverStartDate: 1638403200000,
  coverEndDate: '2030-01-01T00:00:00.000Z',
  monthsOfCover: 20,
  details: [],
  detailsOther: '',
  currency: 'GBP',
  value: 2000,
  coverPercentage: 80,
  interestPercentage: 1,
  paymentType: 'IN_ADVANCE_MONTHLY',
  createdAt: 1638363596947,
  updatedAt: 1638442632540,
  ukefExposure: 1600,
  guaranteeFee: 0.9,
  submittedAsIssuedDate: '1638363717231',
  feeType: 'in advance',
  feeFrequency: 'Monthly',
  dayCountBasis: 365,
  coverDateConfirmed: false,
  changedToIssued: null,
};

const MOCK_FACILITY_TWO = {
  type: 'CASH',
  hasBeenIssued: true,
  name: 'Facility two',
  shouldCoverStartOnSubmission: true,
  coverStartDate: 1638403200000,
  coverEndDate: '2030-01-01T00:00:00.000Z',
  monthsOfCover: null,
  details: [],
  detailsOther: '',
  currency: 'GBP',
  value: 2000,
  coverPercentage: 80,
  interestPercentage: 1,
  paymentType: 'IN_ADVANCE_MONTHLY',
  createdAt: 1638363596947,
  updatedAt: 1638442632540,
  ukefExposure: 1600,
  guaranteeFee: 0.9,
  submittedAsIssuedDate: '1638363717231',
  ukefFacilityId: '0030113305',
  feeType: 'in advance',
  feeFrequency: 'Monthly',
  dayCountBasis: 365,
  coverDateConfirmed: true,
  changedToIssued: null,
};

const MOCK_FACILITY_THREE = {
  type: 'CASH',
  hasBeenIssued: false,
  name: 'Facility three',
  shouldCoverStartOnSubmission: true,
  coverStartDate: 1638403200000,
  coverEndDate: '2030-01-01T00:00:00.000Z',
  monthsOfCover: 30,
  details: [],
  detailsOther: '',
  currency: 'GBP',
  value: 2000,
  coverPercentage: 80,
  interestPercentage: 1,
  paymentType: 'IN_ADVANCE_MONTHLY',
  createdAt: 1638363596947,
  updatedAt: 1638442632540,
  ukefExposure: 1600,
  guaranteeFee: 0.9,
  submittedAsIssuedDate: '1638363717231',
  ukefFacilityId: '0030113305',
  feeType: 'in advance',
  feeFrequency: 'Monthly',
  dayCountBasis: 365,
  coverDateConfirmed: false,
  changedToIssued: null,
};

const MOCK_FACILITY_FOUR = {
  type: 'CASH',
  hasBeenIssued: false,
  name: 'Facility four',
  shouldCoverStartOnSubmission: true,
  coverStartDate: 1638403200000,
  coverEndDate: '2030-01-01T00:00:00.000Z',
  monthsOfCover: 6,
  details: [],
  detailsOther: '',
  currency: 'GBP',
  value: 2000,
  coverPercentage: 80,
  interestPercentage: 1,
  paymentType: 'IN_ADVANCE_MONTHLY',
  createdAt: 1638363596947,
  updatedAt: 1638442632540,
  ukefExposure: 1600,
  guaranteeFee: 0.9,
  submittedAsIssuedDate: '1638363717231',
  ukefFacilityId: '0030113305',
  feeType: 'in advance',
  feeFrequency: 'Monthly',
  dayCountBasis: 365,
  coverDateConfirmed: false,
  changedToIssued: null,

};

const MOCK_USER_MAKER = {
  username: 'BANK1_MAKER1',
  password: 'AbC!2345',
  firstname: 'Tamil',
  surname: 'Rahani',
  email: 'maker1@ukexportfinance.gov.uk',
  timezone: 'Europe/London',
  roles: ['maker'],
  bank: { id: '9' },
  bank: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
    mga: ['mga_ukef_1.docx', 'mga_ukef_2.docx'],
    emails: [
      'maker1@ukexportfinance.gov.uk',
      'checker1@ukexportfinance.gov.uk',
    ],
    companiesHouseNo: 'UKEF0001',
    partyUrn: '00318345',
  },
};

module.exports = {
  MOCK_AIN_APPLICATION, MOCK_FACILITY_ONE, MOCK_FACILITY_TWO, MOCK_FACILITY_THREE, MOCK_FACILITY_FOUR, MOCK_USER_MAKER,
};
