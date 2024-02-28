const { mandatoryCriteria } = require('../../../e2e-fixtures');
const { BANK1_MAKER1, BANK1_CHECKER1 } = require('../../../e2e-fixtures/portal-users.fixture');
const CONSTANTS = require('./constants');

const deal = {
  submissionType: CONSTANTS.DEALS.SUBMISSION_TYPE.MIN,
  updatedAt: Date.now(),
  bankInternalRefName: 'DTFS2-2815 MIN - pre submit',
  additionalRefName: 'DTFS2-2815 MIN - pre submit',
  status: CONSTANTS.DEALS.DEAL_STATUS.READY_FOR_APPROVAL,
  previousStatus: CONSTANTS.DEALS.DEAL_STATUS.UKEF_ACKNOWLEDGED,
  bank: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
    emails: [
      'maker@ukexportfinance.gov.uk',
      'checker@ukexportfinance.gov.uk',
    ],
  },
  maker: {
    _id: '5f3ab3f705e6630007dcfb25',
    username: BANK1_MAKER1.username,
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
    lastLogin: '1606899737029',
    firstname: 'Hugo',
    surname: 'Drax',
    email: BANK1_MAKER1.email,
    timezone: 'Europe/London',
    'user-status': 'active',
  },
  details: {
    created: '1606900241023',
    submissionDate: '1606900616651',
    checker: {
      _id: '5f3ab3f705e6630007dcfb29',
      username: BANK1_CHECKER1.username,
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
      lastLogin: '1606900578887',
      firstname: 'Emilio',
      surname: 'Largo',
      email: BANK1_CHECKER1.email,
      timezone: 'Europe/London',
      'user-status': 'active',
    },
    manualInclusionApplicationSubmissionDate: '1606900616669',
    ukefDealId: '0040004828',
    approvalDate: '1606912140306',
    makerMIN: {
      _id: '5f3ab3f705e6630007dcfb25',
      username: BANK1_MAKER1.username,
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
      lastLogin: '1606901020715',
      firstname: 'Hugo',
      surname: 'Drax',
      email: BANK1_MAKER1.email,
      timezone: 'Europe/London',
      'user-status': 'active',
    },
    manualInclusionNoticeSubmissionDate: '1606912256510',
    checkerMIN: {
      _id: '5f3ab3f705e6630007dcfb29',
      username: BANK1_CHECKER1.username,
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
      lastLogin: '1606912247772',
      firstname: 'Emilio',
      surname: 'Largo',
      email: BANK1_CHECKER1.email,
      timezone: 'Europe/London',
      'user-status': 'active',
    },
  },
  eligibility: {
    status: 'Completed',
    version: 7,
    product: 'BSS/EWCS',
    isInDraft: false,
    createdAt: 1702061978881,
    criteria: [
      {
        _id: '5f3bd4c19b84262f37a97fdc',
        id: 11,
        description: 'The Supplier has confirmed in its Supplier Declaration that the Supply Contract does not involve agents and the Bank is not aware that any of the information contained within it is inaccurate.',
        answer: true,
      },
      {
        _id: '5f3bd4d79b84262f37a97fdd',
        id: 12,
        description: 'The period between the Cover Start Date and the Cover End Date does not exceed: for a Bond, the Bond Maximum Cover Period; and for a Loan, the Loan Maximum Cover Period.',
        answer: false,
      },
      {
        _id: '5f3bd4ec9b84262f37a97fde',
        id: 13,
        description: 'The Covered Bank Exposure under the Transaction (converted (as at the date this representation is made) for this purpose into the Base Currency) is not more than the lesser of: the Available Facility; and the Available Obligor Covered Exposure Limit.',
        answer: true,
      },
      {
        _id: '5f3bd4fa9b84262f37a97fdf',
        id: 14,
        description: 'For a bond Transaction, the bond has not yet been issued or, where the bond has been issued, this was done no more than 3 months prior to the submission of this Inclusion Notice. For a loan Transaction, the loan has not yet been advanced.',
        answer: true,
      },
      {
        _id: '5f3bd5079b84262f37a97fe0',
        id: 15,
        description: 'The Requested Cover Start Date is no more than three months from the date of submission.',
        answer: true,
      },
      {
        _id: '5f3bd5199b84262f37a97fe1',
        id: 16,
        description: 'The Supplier has confirmed in its Supplier Declaration that the Supply Contract does not involve any of the following Controlled Sectors: sharp arms defence, nuclear, radiological, biological, human cloning, pornography, tobacco, gambling, coal, oil, gas or fossil fuel energy and the Bank is not aware that any of the information contained within it is inaccurate.',
        answer: true,
      },
      {
        _id: '5f3bd5289b84262f37a97fe2',
        id: 17,
        description: 'The Bank has completed its Bank Due Diligence to its satisfaction in accordance with its policies and procedures without having to escalate to any Relevant Person.',
        answer: true,
      },
      {
        _id: '5f3bd5379b84262f37a97fe3',
        id: 18,
        description: 'Any applicable fees, interest rate and/or Risk Margin Fee apply to the whole Cover Period of the Covered Transaction, and have been set in accordance with the Bank\'s normal pricing policies and include, if any, overall pricing requirements notified by UKEF.',
        answer: true,
      },
    ],
    agentName: '',
    agentAddressCountry: '',
    agentAddressLine1: '',
    agentAddressLine2: '',
    agentAddressLine3: '',
    agentAddressTown: '',
    agentAddressPostcode: '',
    validationErrors: {
      count: 0,
      errorList: {
        11: {
        },
        12: {
        },
        13: {
        },
        14: {
        },
        15: {
        },
        16: {
        },
        17: {
        },
        18: {
        },
        agentName: {
        },
        agentAddressCountry: {
        },
        agentAddressLine1: {
        },
        agentAddressPostcode: {
        },
        agentAddressTown: {
        },
      },
    },
  },
  submissionDetails: {
    status: 'Incomplete',
    'supplier-type': 'Exporter',
    'supplier-companies-house-registration-number': '',
    'supplier-name': 'DTFS2-2815 MIN - pre submit',
    'supplier-address-country': {
      name: 'Ireland',
      code: 'IRL',
    },
    'supplier-address-line-1': 'DTFS2-2815 MIN - pre submit',
    'supplier-address-line-2': '',
    'supplier-address-line-3': '',
    'supplier-address-town': 'DTFS2-2815 MIN - pre submit',
    'supplier-address-postcode': '',
    'supplier-correspondence-address-is-different': 'false',
    'supplier-correspondence-address-country': {
      name: null,
      code: null,
    },
    'supplier-correspondence-address-line-1': '',
    'supplier-correspondence-address-line-2': '',
    'supplier-correspondence-address-line-3': '',
    'supplier-correspondence-address-town': '',
    'supplier-correspondence-address-postcode': '',
    'industry-sector': {
      code: '1015',
      name: 'Education',
    },
    'industry-class': {
      code: '85310',
      name: 'General secondary education',
    },
    'sme-type': 'Medium',
    'supply-contract-description': 'DTFS2-2815 MIN - pre submit',
    legallyDistinct: 'false',
    'indemnifier-companies-house-registration-number': '',
    'indemnifier-name': '',
    'indemnifier-address-country': {
      name: null,
      code: null,
    },
    'indemnifier-address-line-1': '',
    'indemnifier-address-line-2': '',
    'indemnifier-address-line-3': '',
    'indemnifier-address-town': '',
    'indemnifier-address-postcode': '',
    'indemnifier-correspondence-address-country': {
      name: null,
      code: null,
    },
    'indemnifier-correspondence-address-line-1': '',
    'indemnifier-correspondence-address-line-2': '',
    'indemnifier-correspondence-address-line-3': '',
    'indemnifier-correspondence-address-town': '',
    'indemnifier-correspondence-address-postcode': '',
    indemnifierCorrespondenceAddressDifferent: '',
    'buyer-name': 'DTFS2-2815 MIN - pre submit',
    'buyer-address-country': {
      name: 'Denmark',
      code: 'DNK',
    },
    'buyer-address-line-1': 'DTFS2-2815 MIN - pre submit',
    'buyer-address-line-2': '',
    'buyer-address-line-3': '',
    'buyer-address-town': 'DTFS2-2815 MIN - pre submit',
    'buyer-address-postcode': '',
    destinationOfGoodsAndServices: {
      name: 'Aruba',
      code: 'ABW',
    },
    supplyContractValue: '9000000.00',
    supplyContractCurrency: {
      text: 'GBP - UK Sterling',
      id: 'GBP',
    },
    supplyContractConversionRateToGBP: '',
    'supplyContractConversionDate-day': '',
    'supplyContractConversionDate-month': '',
    'supplyContractConversionDate-year': '',
  },
  summary: {
  },
  comments: [
    {
      user: {
        _id: '5f3ab3f705e6630007dcfb25',
        username: BANK1_MAKER1.username,
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
        lastLogin: '1606912269649',
        firstname: 'Hugo',
        surname: 'Drax',
        email: BANK1_MAKER1.email,
        timezone: 'Europe/London',
        'user-status': 'active',
      },
      timestamp: '1606914139577',
      text: 'test',
    },
    {
      user: {
        _id: '5f3ab3f705e6630007dcfb25',
        username: BANK1_MAKER1.username,
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
        lastLogin: '1606901020715',
        firstname: 'Hugo',
        surname: 'Drax',
        email: BANK1_MAKER1.email,
        timezone: 'Europe/London',
        'user-status': 'active',
      },
      timestamp: '1606912233615',
      text: 'test',
    },
    {
      user: {
        _id: '5f3ab3f705e6630007dcfb25',
        username: BANK1_MAKER1.username,
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
        lastLogin: '1606899737029',
        firstname: 'Hugo',
        surname: 'Drax',
        email: BANK1_MAKER1.email,
        timezone: 'Europe/London',
        'user-status': 'active',
      },
      timestamp: '1606900373442',
      text: 'DTFS2-2815 MIN - pre submit',
    },
  ],
  editedBy: [],
  mandatoryCriteria,
  supportingInformation: {
    validationErrors: {
      count: 0,
      errorList: {
        exporterQuestionnaire: {
        },
      },
    },
    exporterQuestionnaire: [
      {
        type: 'general_correspondence',
        fullPath: 'portal_storage/1000906/File One.docx',
        filename: 'File One.docx',
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    ],
    securityDetails: {
      exporter: '',
    },
  },
  ukefComments: [
    {
      timestamp: '1606912140236',
      text: 'Approved',
    },
  ],
  ukefDecision: [],
};

module.exports = deal;
