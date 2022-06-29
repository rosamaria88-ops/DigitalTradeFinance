const { nowPlusDays, nowPlusMonths } = require('../../../../support/utils/dateFuncs');
const CONSTANTS = require('../../../../fixtures/constants');

const date = new Date();
const datePlusDay = nowPlusDays(1);
const datePlusMonth = nowPlusMonths(1);

const deal = {
  submissionType: CONSTANTS.DEALS.SUBMISSION_TYPE.AIN,
  updatedAt: Date.now(),
  bankInternalRefName: 'mock id',
  additionalRefName: 'mock name',
  status: CONSTANTS.DEALS.DEAL_STATUS.READY_FOR_APPROVAL,
  previousStatus: CONSTANTS.DEALS.DEAL_STATUS.DRAFT,
  bank: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
  },
  details: {
    created: date.valueOf(),
  },
  eligibility: {
    status: 'Completed',
    criteria: [
      {
        id: 11,
        description: 'The Supplier has confirmed in its Supplier Declaration that the Supply Contract does not involve agents and the Bank is not aware that any of the information contained within it is inaccurate.',
        answer: true,
      },
      {
        id: 12,
        description: 'The cover period for each Transaction does not exceed 5 years, or such other period approved by UKEF (that has not lapsed or been withdrawn) in relation to bonds and/or loans for this Obligor.',
        answer: true,
      },
      {
        id: 13,
        description: 'The total UKEF exposure, across all short-term schemes (including bond support, export working capital and general export facility transactions), for this Obligor (including this Transaction) does not exceed £5 million, or such other limit approved by UKEF (that has not lapsed or been withdrawn).',
        answer: true,
      },
      {
        id: 14,
        description: 'For a bond Transaction, the bond has not yet been issued or, where the bond has been issued, this was done no more than 3 months prior to the submission of this Inclusion Notice. For a loan Transaction, the loan has not yet been advanced.',
        answer: true,
      },
      {
        id: 15,
        description: 'The Requested Cover Start Date is no more than three months from the date of submission.',
        answer: true,
      },
      {
        id: 16,
        description: 'The Supplier has confirmed in its Supplier Declaration that the Supply Contract does not involve any of the following Controlled Sectors: sharp arms defence, nuclear, radiological, biological, human cloning, pornography, tobacco, gambling, coal, oil, gas or fossil fuel energy and the Bank is not aware that any of the information contained within it is inaccurate.',
        answer: true,
      },
      {
        id: 17,
        description: 'The Bank has completed its Bank Due Diligence to its satisfaction in accordance with its policies and procedures without having to escalate to any Relevant Person.',
        answer: true,
      },
      {
        id: 18,
        description: 'The fees and/or interest apply to the whole Cover Period, and have been set in accordance with the Bank’s normal pricing policies and, if any, minimum or overall pricing requirements set by UKEF.',
        answer: true,
      },
    ],
    agentAddress1: '',
    agentAddress2: '',
    agentAddress3: '',
    agentCountry: '',
    agentName: '',
    agentPostcode: '',
    agentTown: '',
    validationErrors: {
      count: 0,
      errorList: {
        11: {},
        12: {},
        13: {},
        14: {},
        15: {},
        16: {},
        17: {},
        18: {},
        'agent-address-line-1': {},
        'agent-country': {},
        'agent-name': {},
        'agent-postcode': {},
        'agent-town': {},
      },
    },
  },
  submissionDetails: {
    status: 'Incomplete',
    _csrf: 'rrdq0FnX-NpOIjrnkpQnOVUlp6ITvy4Ay_QU',
    'indemnifier-address-country': {},
    'indemnifier-address-line-1': '',
    'indemnifier-address-line-2': '',
    'indemnifier-address-line-3': '',
    'indemnifier-address-postcode': '',
    'indemnifier-address-town': '',
    'indemnifier-companies-house-registration-number': '',
    'indemnifier-correspondence-address-country': {},
    'indemnifier-correspondence-address-line-1': '',
    'indemnifier-correspondence-address-line-2': '',
    'indemnifier-correspondence-address-line-3': '',
    'indemnifier-correspondence-address-postcode': '',
    'indemnifier-correspondence-address-town': '',
    'indemnifier-name': '',
    indemnifierCorrespondenceAddressDifferent: '',
    'industry-class': {
      code: '08990',
      name: 'Other mining and quarrying n.e.c.',
    },
    'industry-sector': {
      code: '1002',
      name: 'Mining and Quarrying',
    },
    legallyDistinct: 'false',
    'sme-type': 'Micro',
    'supplier-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'supplier-address-line-1': 'aa',
    'supplier-address-line-2': 'aa',
    'supplier-address-line-3': 'aa',
    'supplier-address-postcode': 'aa',
    'supplier-address-town': 'aa',
    'supplier-companies-house-registration-number': '',
    'supplier-correspondence-address-country': {},
    'supplier-correspondence-address-is-different': 'false',
    'supplier-correspondence-address-line-1': '',
    'supplier-correspondence-address-line-2': '',
    'supplier-correspondence-address-line-3': '',
    'supplier-correspondence-address-postcode': '',
    'supplier-correspondence-address-town': '',
    'supplier-name': 'a',
    'supplier-type': 'Exporter',
    'supply-contract-description': 'aa',
    'buyer-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'buyer-address-line-1': 'aa',
    'buyer-address-line-2': 'aa',
    'buyer-address-line-3': 'aa',
    'buyer-address-postcode': 'aa',
    'buyer-address-town': 'aa',
    'buyer-name': 'aaa',
    destinationOfGoodsAndServices: {
      code: 'GBR',
      name: 'United Kingdom',
    },
    supplyContractConversionDate: '28/04/2022',
    'supplyContractConversionDate-day': '28',
    'supplyContractConversionDate-month': '04',
    'supplyContractConversionDate-year': '2022',
    supplyContractConversionRateToGBP: '7.1',
    supplyContractCurrency: {
      currencyId: 1,
      id: 'AED',
      text: 'AED - U.A.E. Dirham',
    },
    supplyContractValue: '4354533.00',
  },
  mockFacilities: [
    {
      type: CONSTANTS.FACILITY.FACILITY_TYPE.BOND,
      createdDate: date.valueOf(),
      bondIssuer: '',
      bondType: 'Bid bond',
      facilityStage: CONSTANTS.FACILITY.FACILITY_STAGE.UNISSUED,
      hasBeenIssued: false,
      ukefGuaranteeInMonths: '12',
      bondBeneficiary: '',
      guaranteeFeePayableByBank: '18.0000',
      value: '21313.00',
      currencySameAsSupplyContractCurrency: 'false',
      riskMarginFee: '20',
      coveredPercentage: '30',
      minimumRiskMarginFee: '',
      ukefExposure: '6,393.90',
      feeType: 'At maturity',
      dayCountBasis: '365',
      currency: {
        currencyId: 1,
        id: 'AED',
        text: 'AED - U.A.E. Dirham',
      },
      conversionRate: '5.5',
      'conversionRateDate-day': '28',
      'conversionRateDate-month': '04',
      'conversionRateDate-year': '2022',
      issuedDate: datePlusDay.valueOf(),
      'coverEndDate-day': (datePlusMonth.getDate()).toString(),
      'coverEndDate-month': (datePlusMonth.getMonth() + 1).toString(),
      'coverEndDate-year': (datePlusMonth.getFullYear()).toString(),
      name: '1234',
      nameRequiredForIssuance: true,
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
      status: 'Ready for check',
    },
    {
      type: CONSTANTS.FACILITY.FACILITY_TYPE.BOND,
      createdDate: date.valueOf(),
      bondIssuer: '',
      bondType: 'Bid bond',
      facilityStage: CONSTANTS.FACILITY.FACILITY_STAGE.ISSUED,
      hasBeenIssued: true,
      'requestedCoverStartDate-day': '',
      'requestedCoverStartDate-month': '',
      'requestedCoverStartDate-year': '',
      'coverEndDate-day': (datePlusMonth.getDate()).toString(),
      'coverEndDate-month': (datePlusMonth.getMonth() + 1).toString(),
      'coverEndDate-year': (datePlusMonth.getFullYear()).toString(),
      name: '1234',
      bondBeneficiary: '',
      guaranteeFeePayableByBank: '18.0000',
      updatedAt: Date.now(),
      value: '1234.00',
      currencySameAsSupplyContractCurrency: 'false',
      currency: {
        currencyId: 1,
        id: 'AED',
        text: 'AED - U.A.E. Dirham',
      },
      conversionRate: '5.5',
      'conversionRateDate-day': '28',
      'conversionRateDate-month': '04',
      'conversionRateDate-year': '2022',
      riskMarginFee: '20',
      coveredPercentage: '30',
      minimumRiskMarginFee: '',
      ukefExposure: '370.20',
      feeType: 'At maturity',
      dayCountBasis: '365',
    },
    {
      type: CONSTANTS.FACILITY.FACILITY_TYPE.LOAN,
      createdDate: date.valueOf(),
      facilityStage: CONSTANTS.FACILITY.FACILITY_STAGE.CONDITIONAL,
      hasBeenIssued: false,
      ukefGuaranteeInMonths: '12',
      guaranteeFeePayableByBank: '10.8000',
      value: '123123.00',
      currencySameAsSupplyContractCurrency: 'false',
      interestMarginFee: '12',
      coveredPercentage: '20',
      minimumQuarterlyFee: '20',
      ukefExposure: '24,624.60',
      premiumFrequency: 'Monthly',
      premiumType: 'In arrear',
      dayCountBasis: '360',
      viewedPreviewPage: true,
      currency: {
        currencyId: 1,
        id: 'AED',
        text: 'AED - U.A.E. Dirham',
      },
      conversionRate: '5.5',
      'conversionRateDate-day': '28',
      'conversionRateDate-month': '04',
      'conversionRateDate-year': '2022',
      issuedDate: datePlusDay.valueOf(),
      'coverEndDate-day': (datePlusMonth.getDate()).toString(),
      'coverEndDate-month': (datePlusMonth.getMonth() + 1).toString(),
      'coverEndDate-year': (datePlusMonth.getFullYear()).toString(),
      nameRequiredForIssuance: true,
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
      disbursementAmount: '1,234.00',
      name: '5678',
      status: 'Ready for check',
      updatedAt: Date.now(),
    },
    {
      type: CONSTANTS.FACILITY.FACILITY_TYPE.LOAN,
      createdDate: date.valueOf(),
      facilityStage: CONSTANTS.FACILITY.FACILITY_STAGE.UNCONDITIONAL,
      hasBeenIssued: true,
      'requestedCoverStartDate-day': '',
      'requestedCoverStartDate-month': '',
      'requestedCoverStartDate-year': '',
      'coverEndDate-day': (datePlusMonth.getDate()).toString(),
      'coverEndDate-month': (datePlusMonth.getMonth() + 1).toString(),
      'coverEndDate-year': (datePlusMonth.getFullYear()).toString(),
      name: '12345678',
      guaranteeFeePayableByBank: '45.0000',
      updatedAt: Date.now(),
      value: '1234.00',
      currencySameAsSupplyContractCurrency: 'false',
      currency: {
        currencyId: 1,
        id: 'AED',
        text: 'AED - U.A.E. Dirham',
      },
      conversionRate: '5.5',
      'conversionRateDate-day': '28',
      'conversionRateDate-month': '04',
      'conversionRateDate-year': '2022',
      disbursementAmount: '200.00',
      interestMarginFee: '50',
      coveredPercentage: '60',
      minimumQuarterlyFee: '',
      ukefExposure: '740.40',
      premiumType: 'At maturity',
      dayCountBasis: '365',
    },
  ],
  summary: {},
  comments: [],
  editedBy: [],
  supportingInformation: {
    validationErrors: {
      count: 0,
      errorList: {
        exporterQuestionnaire: {},
      },
    },
    exporterQuestionnaire: [
      {
        type: 'general_correspondence',
        fullPath: 'private-files/ukef_portal_storage/1001000/questionnaire.pdf',
        filename: 'questionnaire.pdf',
        mimetype: 'application/pdf',
      },
    ],
    securityDetails: {
      exporter: '',
    },
  },
};

export default deal;
