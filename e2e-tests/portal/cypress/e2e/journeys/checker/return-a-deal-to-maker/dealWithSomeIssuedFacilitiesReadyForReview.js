import { oneMonth, tomorrow } from '../../../../../../e2e-fixtures/dateConstants';

const date = new Date();

const deal = {
  submissionType: 'Automatic Inclusion Notice',
  updatedAt: Date.now(),
  bankInternalRefName: 'mock id',
  additionalRefName: 'mock name',
  status: "Ready for Checker's approval",
  previousStatus: 'Acknowledged',
  bank: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
  },
  details: {
    created: date.valueOf(),
    submissionDate: date.valueOf(),
  },
  eligibility: {
    status: 'Completed',
    version: 7,
    product: 'BSS/EWCS',
    isInDraft: false,
    createdAt: 1702061978881,
    criteria: [
      {
        id: 11,
        description:
          'The Supplier has confirmed in its Supplier Declaration that the Supply Contract does not involve agents and the Bank is not aware that any of the information contained within it is inaccurate.',
        answer: true,
      },
      {
        id: 12,
        description:
          'The period between the Cover Start Date and the Cover End Date does not exceed: for a Bond, the Bond Maximum Cover Period; and for a Loan, the Loan Maximum Cover Period.',
        answer: true,
      },
      {
        id: 13,
        description:
          'The Covered Bank Exposure under the Transaction (converted (as at the date this representation is made) for this purpose into the Base Currency) is not more than the lesser of: the Available Facility; and the Available Obligor Covered Exposure Limit.',
        answer: true,
      },
      {
        id: 14,
        description:
          'For a bond Transaction, the bond has not yet been issued or, where the bond has been issued, this was done no more than 3 months prior to the submission of this Inclusion Notice. For a loan Transaction, the loan has not yet been advanced.',
        answer: true,
      },
      {
        id: 15,
        description: 'The Requested Cover Start Date is no more than three months from the date of submission.',
        answer: true,
      },
      {
        id: 16,
        description:
          'The Supplier has confirmed in its Supplier Declaration that the Supply Contract does not involve any of the following Controlled Sectors: sharp arms defence, nuclear, radiological, biological, human cloning, pornography, tobacco, gambling, coal, oil, gas or fossil fuel energy and the Bank is not aware that any of the information contained within it is inaccurate.',
        answer: true,
      },
      {
        id: 17,
        description:
          'The Bank has completed its Bank Due Diligence to its satisfaction in accordance with its policies and procedures without having to escalate to any Relevant Person.',
        answer: true,
      },
      {
        id: 18,
        description:
          "Any applicable fees, interest rate and/or Risk Margin Fee apply to the whole Cover Period of the Covered Transaction, and have been set in accordance with the Bank's normal pricing policies and include, if any, overall pricing requirements notified by UKEF.",
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
    'indemnifier-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'indemnifier-address-line-1': '',
    'indemnifier-address-line-2': '',
    'indemnifier-address-line-3': '',
    'indemnifier-address-postcode': '',
    'indemnifier-address-town': '',
    'indemnifier-companies-house-registration-number': '',
    'indemnifier-correspondence-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'indemnifier-correspondence-address-line-1': '',
    'indemnifier-correspondence-address-line-2': '',
    'indemnifier-correspondence-address-line-3': '',
    'indemnifier-correspondence-address-postcode': '',
    'indemnifier-correspondence-address-town': '',
    'indemnifier-name': '',
    'industry-class': {
      code: '56101',
      name: 'Licensed restaurants',
    },
    'industry-sector': {
      code: '1008',
      name: 'Accommodation and food service activities',
    },
    legallyDistinct: 'false',
    'sme-type': 'Micro',
    'supplier-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'supplier-address-line-1': 'mock',
    'supplier-address-line-2': 'mock',
    'supplier-address-line-3': 'mock',
    'supplier-address-postcode': 'mock',
    'supplier-address-town': 'mock',
    'supplier-companies-house-registration-number': '',
    'supplier-correspondence-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'supplier-correspondence-address-is-different': 'false',
    'supplier-correspondence-address-line-1': '',
    'supplier-correspondence-address-line-2': '',
    'supplier-correspondence-address-line-3': '',
    'supplier-correspondence-address-postcode': '',
    'supplier-correspondence-address-town': '',
    'supplier-name': 'mock',
    'supplier-type': 'Exporter',
    'supply-contract-description': 'mock',
    'buyer-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'buyer-address-line-1': 'mock',
    'buyer-address-line-2': 'mock',
    'buyer-address-line-3': 'mock',
    'buyer-address-postcode': 'mock',
    'buyer-address-town': 'mock',
    'buyer-name': 'mock',
    destinationOfGoodsAndServices: {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'supplyContractConversionDate-day': '',
    'supplyContractConversionDate-month': '',
    'supplyContractConversionDate-year': '',
    supplyContractConversionRateToGBP: '',
    supplyContractCurrency: {
      id: 'GBP',
      text: 'GBP - UK Sterling',
    },
    supplyContractValue: '12312323.00',
    viewedPreviewPage: true,
  },
  mockFacilities: [
    {
      type: 'Bond',
      createdDate: date.valueOf(),
      bondIssuer: '',
      bondType: 'Bid bond',
      facilityStage: 'Unissued',
      hasBeenIssued: false,
      ukefGuaranteeInMonths: '12',
      bondBeneficiary: '',
      guaranteeFeePayableByBank: '18.0000',
      value: '21313.00',
      currencySameAsSupplyContractCurrency: 'true',
      riskMarginFee: '20',
      coveredPercentage: '30',
      minimumRiskMarginFee: '',
      ukefExposure: '6,393.90',
      feeType: 'At maturity',
      dayCountBasis: '365',
      currency: {
        text: 'GBP - UK Sterling',
        id: 'GBP',
      },
      issuedDate: tomorrow.unixMillisecondsString,
      'coverEndDate-day': oneMonth.day,
      'coverEndDate-month': oneMonth.month,
      'coverEndDate-year': oneMonth.year,
      name: '1234',
      nameRequiredForIssuance: true,
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
      status: 'Ready for check',
    },
    {
      type: 'Bond',
      createdDate: date.valueOf(),
      bondIssuer: '',
      bondType: 'Bid bond',
      facilityStage: 'Issued',
      hasBeenIssued: true,
      'requestedCoverStartDate-day': '',
      'requestedCoverStartDate-month': '',
      'requestedCoverStartDate-year': '',
      'coverEndDate-day': oneMonth.day,
      'coverEndDate-month': oneMonth.month,
      'coverEndDate-year': oneMonth.year,
      name: '1234',
      bondBeneficiary: '',
      guaranteeFeePayableByBank: '18.0000',
      updatedAt: Date.now(),
      value: '1234.00',
      currencySameAsSupplyContractCurrency: 'true',
      riskMarginFee: '20',
      coveredPercentage: '30',
      minimumRiskMarginFee: '',
      ukefExposure: '370.20',
      feeType: 'At maturity',
      dayCountBasis: '365',
    },
    {
      type: 'Loan',
      createdDate: date.valueOf(),
      facilityStage: 'Conditional',
      hasBeenIssued: false,
      ukefGuaranteeInMonths: '12',
      guaranteeFeePayableByBank: '10.8000',
      value: '123123.00',
      currencySameAsSupplyContractCurrency: 'true',
      interestMarginFee: '12',
      coveredPercentage: '20',
      minimumQuarterlyFee: '20',
      ukefExposure: '24,624.60',
      premiumFrequency: 'Monthly',
      premiumType: 'In arrear',
      dayCountBasis: '360',
      viewedPreviewPage: true,
      currency: {
        text: 'GBP - UK Sterling',
        id: 'GBP',
      },
      issuedDate: tomorrow.unixMillisecondsString,
      'coverEndDate-day': oneMonth.day,
      'coverEndDate-month': oneMonth.month,
      'coverEndDate-year': oneMonth.year,
      nameRequiredForIssuance: true,
      issueFacilityDetailsStarted: true,
      issueFacilityDetailsProvided: true,
      disbursementAmount: '1,234.00',
      name: '5678',
      status: 'Ready for check',
      updatedAt: Date.now(),
    },
    {
      type: 'Loan',
      createdDate: date.valueOf(),
      facilityStage: 'Unconditional',
      hasBeenIssued: true,
      'requestedCoverStartDate-day': '',
      'requestedCoverStartDate-month': '',
      'requestedCoverStartDate-year': '',
      'coverEndDate-day': oneMonth.day,
      'coverEndDate-month': oneMonth.month,
      'coverEndDate-year': oneMonth.year,
      name: '12345678',
      guaranteeFeePayableByBank: '45.0000',
      updatedAt: Date.now(),
      value: '1234.00',
      currencySameAsSupplyContractCurrency: 'true',
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
