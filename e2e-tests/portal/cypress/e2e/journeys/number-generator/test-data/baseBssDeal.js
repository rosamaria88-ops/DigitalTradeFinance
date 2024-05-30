const { BANK1_MAKER1 } = require('../../../../../../e2e-fixtures/portal-users.fixture');

exports.BASE_DEAL = {
  submissionType: 'Automatic Inclusion Notice',
  bankInternalRefName: 'abc-1-def',
  additionalRefName: 'Additional reference name example',
  status: "Ready for Checker's approval",
  previousStatus: 'Draft',
  bank: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
    emails: ['maker@ukexportfinance.gov.uk', 'checker@ukexportfinance.gov.uk'],
  },
  maker: {
    _id: '5f3ab3f705e6630007dcfb25',
    username: BANK1_MAKER1.username,
    roles: ['maker'],
    bank: {
      id: '9',
      name: 'UKEF test bank (Delegated)',
      emails: ['maker@ukexportfinance.gov.uk', 'checker@ukexportfinance.gov.uk'],
    },
    lastLogin: '1610710442797',
    firstname: 'Hugo',
    surname: 'Drax',
    email: BANK1_MAKER1.email,
    timezone: 'Europe/London',
    'user-status': 'active',
  },
  details: {},
  submissionDetails: {
    'indemnifier-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'indemnifier-address-line-3': '',
    'indemnifier-address-line-1': '27a',
    'indemnifier-address-line-2': 'Maxwell Road',
    'indemnifier-address-postcode': 'test',
    'indemnifier-address-town': 'Northwood',
    'indemnifier-companies-house-registration-number': '06771815',
    'indemnifier-correspondence-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'indemnifier-correspondence-address-line-3': 'Essex',
    'indemnifier-correspondence-address-line-1': '27 Petersfield',
    'indemnifier-correspondence-address-line-2': '',
    'indemnifier-correspondence-address-postcode': 'CM1 4EP',
    'indemnifier-correspondence-address-town': 'Chelmsford',
    'indemnifier-name': 'TEST TRADING LIMITED',
    indemnifierCorrespondenceAddressDifferent: 'true',
    'industry-sector': {
      code: '1008',
      name: 'Accommodation and food service activities',
    },
    'industry-class': {
      code: '56101',
      name: 'Licensed restaurants',
    },
    legallyDistinct: 'true',
    'sme-type': 'Small',
    'supplier-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'supplier-address-line-3': 'London',
    'supplier-address-line-1': '1 Horseguards Road',
    'supplier-address-line-2': '',
    'supplier-address-postcode': 'SW1A 2HQ',
    'supplier-address-town': 'Westminster',
    'supplier-companies-house-registration-number': '',
    'supplier-correspondence-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'supplier-correspondence-address-line-3': 'Edinburgh',
    'supplier-correspondence-address-line-1': '2 Horseguards Road',
    'supplier-correspondence-address-line-2': '',
    'supplier-correspondence-address-postcode': 'ED1 23S',
    'supplier-correspondence-address-town': 'Eastminster',
    'supplier-name': 'UKEF',
    'supplier-type': 'Exporter',
    'supplier-correspondence-address-is-different': 'true',
    'supply-contract-description': 'Description.',
    'buyer-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'buyer-address-line-1': 'Corner of East and Main',
    'buyer-address-line-2': '',
    'buyer-address-line-3': 'The Bronx',
    'buyer-address-postcode': 'no-idea',
    'buyer-address-town': 'New York',
    'buyer-name': 'Harry Bear',
    destinationOfGoodsAndServices: {
      code: 'USA',
      name: 'United States',
    },
    viewedPreviewPage: true,
    supplyContractConversionRateToGBP: '1.123456',
    supplyContractCurrency: {
      id: 'USD',
      text: 'USD - US Dollars',
    },
    supplyContractValue: '10,000',
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
        answer: true,
      },
      {
        id: 12,
        answer: true,
      },
      {
        id: 13,
        answer: true,
      },
      {
        id: 14,
        answer: true,
      },
      {
        id: 15,
        answer: true,
      },
      {
        id: 16,
        answer: true,
      },
      {
        id: 17,
        answer: true,
      },
      {
        id: 18,
        answer: true,
      },
    ],
  },
  mockFacilities: [
    {
      type: 'Bond',
      bondIssuer: 'Issuer',
      bondType: 'Advance payment guarantee',
      facilityStage: 'Unissued',
      hasBeenIssued: false,
      ukefGuaranteeInMonths: '10',
      bondBeneficiary: '',
      guaranteeFeePayableByBank: '9.0000',
      value: '12345.00',
      currencySameAsSupplyContractCurrency: 'true',
      riskMarginFee: '10',
      coveredPercentage: '20',
      minimumRiskMarginFee: '30',
      ukefExposure: '2,469.00',
      feeType: 'At maturity',
      dayCountBasis: '365',
      currency: {
        text: 'GBP - UK Sterling',
        id: 'GBP',
      },
    },
    {
      type: 'Loan',
      facilityStage: 'Unconditional',
      hasBeenIssued: true,
      name: '8888888',
      guaranteeFeePayableByBank: '18.0000',
      value: '44444.00',
      currencySameAsSupplyContractCurrency: 'true',
      disbursementAmount: '100.00',
      interestMarginFee: '20',
      coveredPercentage: '21',
      minimumQuarterlyFee: '22',
      ukefExposure: '9,333.24',
      premiumFrequency: 'Annually',
      premiumType: 'In advance',
      dayCountBasis: '365',
      currency: {
        text: 'GBP - UK Sterling',
        id: 'GBP',
      },
    },
  ],
  summary: {
    totalValue: {
      dealInDealCurrency: '10,000',
      dealInGbp: '12,000',
      bondInDealCurrency: '8,000',
      bondInGbp: '16,000',
      loanInDealCurrency: '4,000',
      loanInGbp: '8,000',
    },
  },
};
