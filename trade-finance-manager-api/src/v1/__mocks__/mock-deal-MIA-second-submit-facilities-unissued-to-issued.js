const { MOCK_PORTAL_USERS } = require('./mock-portal-users');

const MOCK_DEAL_MIA_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED = {
  _id: 'MOCK_DEAL_MIA_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED',
  dealType: 'BSS/EWCS',
  submissionType: 'Manual Inclusion Application',
  bankInternalRefName: 'Mock supply contract ID',
  additionalRefName: 'Mock supply contract name',
  status: 'Submitted',
  previousStatus: 'Ready for Checker\'s approval',
  bank: {
    id: '123',
    name: 'Barclays Bank',
    emails: [
      'test1@mock.com',
      'test2@mock.com',
    ],
  },
  maker: MOCK_PORTAL_USERS[0],
  details: {
    bank: 'Mock bank',
    ukefDealId: '20010739',
    checker: {
      username: 'CHECKER',
      firstname: 'Emilio',
      surname: 'Largo',
    },
    submissionDate: '1606900616651',
    submissionCount: 2,
  },
  submissionDetails: {
    status: 'Incomplete',
    'indemnifier-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'indemnifier-address-line-1': 'Addr 1',
    'indemnifier-address-line-2': 'Addr 2',
    'indemnifier-address-line-3': 'Addr 3',
    'indemnifier-address-postcode': 'test',
    'indemnifier-address-town': 'test town',
    'indemnifier-companies-house-registration-number': '12345678',
    'indemnifier-correspondence-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'indemnifier-correspondence-address-line-1': 'Addr 1',
    'indemnifier-correspondence-address-line-2': 'Addr 2',
    'indemnifier-correspondence-address-line-3': 'Addr 3',
    'indemnifier-correspondence-address-postcode': 'test',
    'indemnifier-correspondence-address-town': 'test town',
    'indemnifier-name': 'Mock name',
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
    'supplier-correspondence-address-line-1': 'Addr 1',
    'supplier-correspondence-address-line-2': 'Addr 2',
    'supplier-correspondence-address-line-3': 'Addr 3',
    'supplier-correspondence-address-postcode': 'test',
    'supplier-correspondence-address-town': 'test town',
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
  eligibility: {
    version: 7,
    product: 'BSS/EWCS',
    isInDraft: false,
    createdAt: 1702061978881,
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
    agentAddressLine1: 'ADDR 1',
    agentAddressLine2: 'Addr 2',
    agentAddressLine3: 'Addr 3',
    agentAddressCountry: {
      code: 'GBR',
      name: 'United Kingdom',
    },
    agentName: 'AGENT NAME',
    agentAddressPostcode: 'CF64 5SH',
    agentAddressTown: 'City',
  },
  facilities: ['MOCK_DEAL_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED_BOND', 'MOCK_DEAL_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED_BOND'],
  bondTransactions: {
    items: [
      {
        _id: 'MOCK_DEAL_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED_BOND',
        dealId: 'MOCK_DEAL_MIA_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED',
        type: 'Bond',
        bondIssuer: 'Issuer',
        bondType: 'Advance payment guarantee',
        facilityStage: 'Issued',
        hasBeenIssued: true,
        previousFacilityStage: 'Unissued',
        ukefGuaranteeInMonths: '10',
        bondBeneficiary: 'test',
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
        'coverEndDate-day': '20',
        'coverEndDate-month': '10',
        'coverEndDate-year': '2020',
        status: 'Submitted',
        ukefFacilityId: '65431',
        requestedCoverStartDate: Date.now(),
      },
    ],
  },
  loanTransactions: {
    items: [
      {
        _id: 'MOCK_DEAL_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED_LOAN',
        dealId: 'MOCK_DEAL_MIA_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED',
        type: 'Loan',
        createdDate: 1610369832226.0,
        facilityStage: 'Unconditional',
        hasBeenIssued: true,
        previousFacilityStage: 'Conditional',
        ukefGuaranteeInMonths: '12',
        name: '5678',
        guaranteeFeePayableByBank: '27.0000',
        updatedAt: 1610369832226.0,
        value: '1234.00',
        currencySameAsSupplyContractCurrency: 'true',
        interestMarginFee: '30',
        coveredPercentage: '20',
        minimumQuarterlyFee: '10',
        ukefExposure: '246.80',
        premiumType: 'At maturity',
        dayCountBasis: '365',
        'coverEndDate-day': '24',
        'coverEndDate-month': '09',
        'coverEndDate-year': '2020',
        disbursementAmount: '1,234.00',
        issueFacilityDetailsStarted: true,
        nameRequiredForIssuance: true,
        requestedCoverStartDate: Date.now(),
        status: 'Submitted',
        ukefFacilityId: '65432',
        currency: {
          text: 'GBP - UK Sterling',
          id: 'GBP',
        },
      },
    ],
  },
  exporter: {
    companyName: 'test',
  },
};

module.exports = MOCK_DEAL_MIA_SUBMITTED_FACILITIES_UNISSUED_TO_ISSUED;
