const Chance = require('chance');
const { DEAL_TYPE } = require('@ukef/dtfs2-common');
const CONSTANTS = require('../../constants');
const { MOCK_MAKER, MOCK_CHECKER } = require('./mock_users');

const chance = new Chance();

const commonDealItems = {
  _id: '61a7710b2ae62b0013dae687',
  userId: '619bae3467cc7c002069fc1e',
  exporterId: '61a7710b2ae62b0013dae686',
  dealType: DEAL_TYPE.GEF,
  maker: MOCK_MAKER,
  checker: MOCK_CHECKER,
  bank: { id: '9' },
  eligibility: {
    criteria: [],
    updatedAt: 1638535562287,
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
  },
  bankInternalRefName: chance.string({ length: 5 }),
  mandatoryVersionId: 33,
  createdAt: 1638363403942,
  updatedAt: 1638983294975,
  submissionDate: '1638363716309',
  supportingInformation: {
    manualInclusion: [],
    securityDetails: {},
    status: CONSTANTS.DEAL_STATUS.IN_PROGRESS,
    requiredFields: [],
  },
  id: '61a7710b2ae62b0013dae687',
  ukefDealId: '0030113304',
  checkerId: '619bae3467cc7c002069fc21',
  editedBy: ['619bae3467cc7c002069fc1e'],
  additionalRefName: null,
  facilitiesUpdated: 1638542220497,
  comments: [],
  ukefDecision: [],
  ukefDecisionAccepted: false,
  exporter: { status: CONSTANTS.DEAL_STATUS.COMPLETED, details: [], validation: [] },
  exporterStatus: { text: CONSTANTS.DEAL_STATUS.COMPLETED, class: 'govuk-tag--green', code: CONSTANTS.DEAL_STATUS.COMPLETED },
  eligibilityCriteriaStatus: { text: CONSTANTS.DEAL_STATUS.COMPLETED, class: 'govuk-tag--green', code: CONSTANTS.DEAL_STATUS.COMPLETED },
  facilitiesStatus: { text: CONSTANTS.DEAL_STATUS.COMPLETED, class: 'govuk-tag--green', code: CONSTANTS.DEAL_STATUS.COMPLETED },
  supportingInfoStatus: { text: CONSTANTS.DEAL_STATUS.COMPLETED, class: 'govuk-tag--green', code: CONSTANTS.DEAL_STATUS.COMPLETED },
  canSubmit: false,
  checkerCanSubmit: false,
};

const MOCK_AIN_APPLICATION = {
  status: CONSTANTS.DEAL_STATUS.UKEF_ACKNOWLEDGED,
  submissionType: CONSTANTS.DEAL_SUBMISSION_TYPE.AIN,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: false,
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
          coverDateConfirmed: false,
        },
        validation: { required: [] },
      },
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae69a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: true,
          name: 'Facility one',
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
          canResubmitIssuedFacilities: true,
        },
        validation: { required: [] },
      },
    ],
  },
  submissionCount: 1,
  ...commonDealItems,
};

const MOCK_AIN_APPLICATION_CHECKER = {
  status: CONSTANTS.DEAL_STATUS.READY_FOR_APPROVAL,
  submissionType: CONSTANTS.DEAL_SUBMISSION_TYPE.AIN,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: false,
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
          coverDateConfirmed: false,
        },
        validation: { required: [] },
      },
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae69a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: true,
          name: 'Facility one',
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
          canResubmitIssuedFacilities: true,
        },
        validation: { required: [] },
      },
    ],
  },
  submissionCount: 1,
  ...commonDealItems,
};

const MOCK_AIN_APPLICATION_RETURN_MAKER = {
  status: CONSTANTS.DEAL_STATUS.CHANGES_REQUIRED,
  submissionType: CONSTANTS.DEAL_SUBMISSION_TYPE.AIN,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: false,
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
          coverDateConfirmed: false,
        },
        validation: { required: [] },
      },
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae69a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: true,
          name: 'Facility one',
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
          canResubmitIssuedFacilities: true,
        },
        validation: { required: [] },
      },
    ],
  },
  submissionCount: 1,
  ...commonDealItems,
};

const MOCK_AIN_APPLICATION_UNISSUED_ONLY = {
  status: CONSTANTS.DEAL_STATUS.UKEF_ACKNOWLEDGED,
  submissionType: CONSTANTS.DEAL_SUBMISSION_TYPE.AIN,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: false,
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
          coverDateConfirmed: false,
          canResubmitIssuedFacilities: null,
        },
        validation: { required: [] },
      },
    ],
  },
  submissionCount: 1,
  ...commonDealItems,
};

const MOCK_MIA_APPLICATION_UNISSUED_ONLY = {
  status: CONSTANTS.DEAL_STATUS.UKEF_ACKNOWLEDGED,
  submissionType: CONSTANTS.DEAL_SUBMISSION_TYPE.MIA,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: false,
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
          coverDateConfirmed: false,
          canResubmitIssuedFacilities: null,
        },
        validation: { required: [] },
      },
    ],
  },
  submissionCount: 1,
  ...commonDealItems,
};

const MOCK_AIN_APPLICATION_ISSUED_ONLY = {
  status: CONSTANTS.DEAL_STATUS.UKEF_ACKNOWLEDGED,
  submissionType: CONSTANTS.DEAL_SUBMISSION_TYPE.AIN,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
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
          coverDateConfirmed: false,
          canResubmitIssuedFacilities: null,
        },
        validation: { required: [] },
      },
    ],
  },
  submissionCount: 1,
  ...commonDealItems,
};

const MOCK_BASIC_DEAL = {
  status: CONSTANTS.DEAL_STATUS.READY_FOR_APPROVAL,
  submissionType: CONSTANTS.DEAL_SUBMISSION_TYPE.AIN,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: { status: CONSTANTS.DEAL_STATUS.COMPLETED, items: [] },
  ...commonDealItems,
};

const MOCK_AIN_APPLICATION_FALSE_COMMENTS = {
  status: CONSTANTS.DEAL_STATUS.DRAFT,
  submissionType: CONSTANTS.DEAL_SUBMISSION_TYPE.AIN,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: false,
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
          coverDateConfirmed: false,
        },
        validation: { required: [] },
      },
    ],
  },
  submissionCount: 1,
  ...commonDealItems,
};

const MOCK_AIN_APPLICATION_SUPPORTING_INFO = (appStatus, submissionCounter) => ({
  status: appStatus,
  submissionCount: submissionCounter,
});

const RES_MOCK_AIN_APPLICATION_CHECKER = () => {
  const res = {};

  res._id = '61a7710b2ae62b0013dae687';
  res.dealType = DEAL_TYPE.GEF;
  res.userId = '619bae3467cc7c002069fc1e';
  res.maker = MOCK_MAKER;
  res.checker = MOCK_CHECKER;
  res.status = CONSTANTS.DEAL_STATUS.READY_FOR_APPROVAL;
  res.bank = { id: '9' };
  res.exporterId = '61a7710b2ae62b0013dae686';
  res.eligibility = {
    criteria: [],
    updatedAt: 1638535562287,
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
  };
  res.bankInternalRefName = 'abc';
  res.mandatoryVersionId = null;
  res.createdAt = 1638363403942;
  res.updatedAt = 1638983294975;
  res.submissionType = CONSTANTS.DEAL_SUBMISSION_TYPE.AIN;
  res.submissionCount = 1;
  res.submissionDate = '1638363716309';
  res.supportingInformation = {
    manualInclusion: [],
    securityDetails: {},
    status: CONSTANTS.DEAL_STATUS.IN_PROGRESS,
    requiredFields: [],
  };
  res.ukefDealId = '0030113304';
  res.checkerId = '619bae3467cc7c002069fc21';
  res.editedBy = ['619bae3467cc7c002069fc1e'];
  res.additionalRefName = null;
  res.facilitiesUpdated = 1638542220497;
  res.comments = [];
  res.previousStatus = CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF;
  res.ukefDecision = [];
  res.id = '61a7710b2ae62b0013dae687';
  res.exporter = { status: CONSTANTS.DEAL_STATUS.COMPLETED, details: [], validation: [] };
  res.facilities = {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: false,
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
          coverDateConfirmed: false,
        },
        validation: { required: [] },
      },
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae69a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: true,
          name: 'Facility one',
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
          canResubmitIssuedFacilities: true,
        },
        validation: { required: [] },
      },
    ],
  };
  res.exporterStatus = { text: CONSTANTS.DEAL_STATUS.COMPLETED, class: 'govuk-tag--green', code: CONSTANTS.DEAL_STATUS.COMPLETED };
  res.eligibilityCriteriaStatus = { text: CONSTANTS.DEAL_STATUS.COMPLETED, class: 'govuk-tag--green', code: CONSTANTS.DEAL_STATUS.COMPLETED };
  res.facilitiesStatus = { text: CONSTANTS.DEAL_STATUS.COMPLETED, class: 'govuk-tag--green', code: CONSTANTS.DEAL_STATUS.COMPLETED };
  res.supportingInfoStatus = { text: CONSTANTS.DEAL_STATUS.COMPLETED, class: 'govuk-tag--green', code: CONSTANTS.DEAL_STATUS.COMPLETED };
  res.canSubmit = false;
  res.checkerCanSubmit = false;

  return res;
};

const MOCK_AIN_APPLICATION_GENERATOR = (status, type) => ({
  status,
  submissionType: type,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: false,
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
          coverDateConfirmed: false,
        },
        validation: { required: [] },
      },
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae69a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: true,
          name: 'Facility one',
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
          canResubmitIssuedFacilities: true,
        },
        validation: { required: [] },
      },
    ],
  },
  submissionCount: 1,
  ...commonDealItems,
});

const MOCK_APPLICATION_GENERATOR_SUBCOUNT = (status, type, submissionCounter) => ({
  status,
  submissionType: type,
  previousStatus: CONSTANTS.DEAL_STATUS.IN_PROGRESS_BY_UKEF,
  facilities: {
    status: CONSTANTS.DEAL_STATUS.COMPLETED,
    items: [
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae68a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: false,
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
          coverDateConfirmed: false,
        },
        validation: { required: [] },
      },
      {
        status: CONSTANTS.DEAL_STATUS.COMPLETED,
        details: {
          _id: '61a771cc2ae62b0013dae69a',
          dealId: '61a7710b2ae62b0013dae687',
          type: CONSTANTS.FACILITY_TYPE.CASH,
          hasBeenIssued: true,
          name: 'Facility one',
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
          canResubmitIssuedFacilities: true,
        },
        validation: { required: [] },
      },
    ],
  },
  submissionCount: submissionCounter,
  ...commonDealItems,
});

module.exports = {
  MOCK_AIN_APPLICATION,
  MOCK_AIN_APPLICATION_RETURN_MAKER,
  MOCK_AIN_APPLICATION_CHECKER,
  MOCK_AIN_APPLICATION_UNISSUED_ONLY,
  MOCK_MIA_APPLICATION_UNISSUED_ONLY,
  MOCK_AIN_APPLICATION_ISSUED_ONLY,
  MOCK_BASIC_DEAL,
  MOCK_AIN_APPLICATION_FALSE_COMMENTS,
  MOCK_AIN_APPLICATION_SUPPORTING_INFO,
  RES_MOCK_AIN_APPLICATION_CHECKER,
  MOCK_AIN_APPLICATION_GENERATOR,
  MOCK_APPLICATION_GENERATOR_SUBCOUNT,
};
