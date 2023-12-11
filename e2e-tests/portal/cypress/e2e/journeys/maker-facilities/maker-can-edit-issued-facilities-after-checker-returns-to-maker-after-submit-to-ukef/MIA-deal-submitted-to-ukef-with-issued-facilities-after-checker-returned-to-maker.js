const { mandatoryCriteria } = require('../../../../../../e2e-fixtures');
const dateConstants = require('../../../../../../e2e-fixtures/dateConstants');

const now = new Date();
const nowPlusWeek = `${dateConstants.sevenDaysUnix}000`;

const deal = {
  submissionType: 'Manual Inclusion Application',
  updatedAt: Date.now(),
  bankInternalRefName: 'test',
  additionalRefName: 'testing',
  status: 'Further Maker\'s input required',
  previousStatus: 'Ready for Checker\'s approval',
  bank: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
    emails: [
      'maker@ukexportfinance.gov.uk',
      'checker@ukexportfinance.gov.uk',
    ],
  },
  maker: {
    username: 'MAKER',
    roles: [
      'maker',
    ],
    lastLogin: now.valueOf(),
    firstname: 'Hugo',
    surname: 'Drax',
    email: 'maker@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    'user-status': 'active',
  },
  details: {
    created: '1599048723110',
    checker: {
      bank: {
        id: '9',
        name: 'UKEF test bank (Delegated)',
        emails: [
          'maker@ukexportfinance.gov.uk',
          'checker@ukexportfinance.gov.uk',
        ],
      },
      email: 'checker@ukexportfinance.gov.uk',
      firstname: 'Emilio',
      lastLogin: '1599048724584',
      roles: [
        'checker',
      ],
      surname: 'Largo',
      timezone: 'Europe/London',
      'user-status': 'active',
      username: 'CHECKER',
    },
    submissionDate: now.valueOf(),
    ukefDealId: '1001349',
    approvalDate: '1599048727451',
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
        description: 'The period between the Cover Start Date and the Cover End Date does not exceed: for a Bond, the Bond Maximum Cover Period; and for a Loan, the Loan Maximum Cover Period.',
        answer: false,
      },
      {
        id: 13,
        description: 'The Covered Bank Exposure under the Transaction (converted (as at the date this representation is made) for this purpose into the Base Currency) is not more than the lesser of: the Available Facility; and the Available Obligor Covered Exposure Limit.',
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
        description: 'Any applicable fees, interest rate and/or Risk Margin Fee apply to the whole Cover Period of the Covered Transaction, and have been set in accordance with the Bank\'s normal pricing policies and include, if any, overall pricing requirements notified by UKEF.',
        answer: true,
      },
    ],
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
    'supplier-address-line-1': 'test',
    'supplier-address-line-2': 'test',
    'supplier-address-line-3': 'test',
    'supplier-address-postcode': 'test',
    'supplier-address-town': 'test',
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
    'supplier-name': 'test',
    'supplier-type': 'Exporter',
    'supply-contract-description': 'test',
    'buyer-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'buyer-address-line-1': 'test',
    'buyer-address-line-2': 'test',
    'buyer-address-line-3': 'test',
    'buyer-address-postcode': 'test',
    'buyer-address-town': 'test',
    'buyer-name': 'test',
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
    supplyContractValue: '1234.00',
  },
  mockFacilities: [
    {
      type: 'Bond',
      facilityStage: 'Issued',
      hasBeenIssued: true,
      ukefGuaranteeInMonths: '12',
      value: '1234.00',
      currencySameAsSupplyContractCurrency: 'true',
      createdDate: 1599048722968.0,
      bondIssuer: '',
      bondType: 'Bid bond',
      bondBeneficiary: '',
      guaranteeFeePayableByBank: '10.8000',
      ukefExposure: '296.16',
      updatedAt: Date.now(),
      riskMarginFee: '12',
      coveredPercentage: '24',
      minimumRiskMarginFee: '',
      feeType: 'At maturity',
      dayCountBasis: '365',
      currency: {
        text: 'GBP - UK Sterling',
        id: 'GBP',
      },
      ukefFacilityId: [
        '12345',
      ],
      'issuedDate-day': now.getDate(),
      'issuedDate-month': now.getMonth() + 1,
      'issuedDate-year': now.getFullYear(),
      'requestedCoverStartDate-day': '',
      'requestedCoverStartDate-month': '',
      'requestedCoverStartDate-year': '',
      'coverEndDate-day': (dateConstants.twoMonthsDay).toString(),
      'coverEndDate-month': (dateConstants.twoMonthsMonth).toString(),
      'coverEndDate-year': (dateConstants.twoMonthsYear).toString(),
      name: '1234',
      issueFacilityDetailsStarted: true,
      nameRequiredForIssuance: true,
      requestedCoverStartDate: `${dateConstants.oneMonthUnix}000`,
      issuedDate: nowPlusWeek,
      issueFacilityDetailsProvided: true,
      status: "Maker's input required",
      previousFacilityStage: 'Issued',
    },
    {
      type: 'Loan',
      createdDate: 1599048722968.0,
      facilityStage: 'Unconditional',
      hasBeenIssued: true,
      ukefGuaranteeInMonths: '12',
      name: '5678',
      guaranteeFeePayableByBank: '18.0000',
      updatedAt: Date.now(),
      value: '1234.00',
      currencySameAsSupplyContractCurrency: 'true',
      interestMarginFee: '20',
      coveredPercentage: '40',
      minimumQuarterlyFee: '',
      ukefExposure: '493.60',
      premiumType: 'At maturity',
      dayCountBasis: '365',
      ukefFacilityId: [
        '56789',
      ],
      'issuedDate-day': now.getDate(),
      'issuedDate-month': now.getMonth() + 1,
      'issuedDate-year': now.getFullYear(),
      'requestedCoverStartDate-day': '',
      'requestedCoverStartDate-month': '',
      'requestedCoverStartDate-year': '',
      'coverEndDate-day': (dateConstants.twoMonthsDay).toString(),
      'coverEndDate-month': (dateConstants.twoMonthsMonth).toString(),
      'coverEndDate-year': (dateConstants.twoMonthsYear).toString(),
      disbursementAmount: '1,234.00',
      issueFacilityDetailsStarted: true,
      nameRequiredForIssuance: true,
      issuedDate: nowPlusWeek,
      issueFacilityDetailsProvided: true,
      status: "Maker's input required",
      previousFacilityStage: 'Conditional',
      requestedCoverStartDate: `${dateConstants.oneMonthUnix}000`,
    },
  ],
  summary: {},
  comments: [
    {
      user: {
        username: 'MAKER',
        roles: [
          'maker',
        ],
        bank: {
          id: '9',
          name: 'UKEF test bank (Delegated)',
          emails: [
            'maker@ukexportfinance.gov.uk',
            'checker@ukexportfinance.gov.uk',
          ],
        },
        lastLogin: '1599049060901',
        firstname: 'Hugo',
        surname: 'Drax',
        email: 'maker@ukexportfinance.gov.uk',
        timezone: 'Europe/London',
        'user-status': 'active',
      },
      timestamp: '1599049985118',
      text: 'mock',
    },
    {
      user: {
        username: 'CHECKER',
        roles: [
          'checker',
        ],
        bank: {
          id: '9',
          name: 'UKEF test bank (Delegated)',
          emails: [
            'maker@ukexportfinance.gov.uk',
            'checker@ukexportfinance.gov.uk',
          ],
        },
        lastLogin: '1599048724584',
        firstname: 'Emilio',
        surname: 'Largo',
        email: 'checker@ukexportfinance.gov.uk',
        timezone: 'Europe/London',
        'user-status': 'active',
      },
      timestamp: '1599048760960',
      text: 'mock',
    },
    {
      user: {
        username: 'MAKER',
        roles: [
          'maker',
        ],
        bank: {
          id: '9',
          name: 'UKEF test bank (Delegated)',
          emails: [
            'maker@ukexportfinance.gov.uk',
            'checker@ukexportfinance.gov.uk',
          ],
        },
        lastLogin: '1599048728874',
        firstname: 'Hugo',
        surname: 'Drax',
        email: 'maker@ukexportfinance.gov.uk',
        timezone: 'Europe/London',
        'user-status': 'active',
      },
      timestamp: '1599048733918',
      text: 'Issued a facility',
    },
    {
      user: {
        username: 'MAKER',
        roles: [
          'maker',
        ],
        bank: {
          id: '9',
          name: 'UKEF test bank (Delegated)',
          emails: [
            'maker@ukexportfinance.gov.uk',
            'checker@ukexportfinance.gov.uk',
          ],
        },
        lastLogin: '1597782864959',
        firstname: 'Hugo',
        surname: 'Drax',
        email: 'maker@ukexportfinance.gov.uk',
        timezone: 'Europe/London',
        'user-status': 'active',
      },
      timestamp: '1597782964434',
      text: 'test',
    },
  ],
  editedBy: [],
  mandatoryCriteria,
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
        fullPath: 'private-files/ukef_portal_storage/1001560/questionnaire.pdf',
        filename: 'questionnaire.pdf',
        mimetype: 'application/pdf',
      },
    ],
    securityDetails: {
      exporter: '',
    },
  },
  ukefComments: [
    {
      timestamp: '1599048727440',
      text: 'undefined',
    },
  ],
};

module.exports = deal;
