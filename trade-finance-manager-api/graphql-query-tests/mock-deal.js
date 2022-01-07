const CONSTANTS = require('./constants');

const MOCK_DEAL = {
  _id: '1234567',
  dealSnapshot: {
    submissionType: CONSTANTS.DEALS.SUBMISSION_TYPE.AIN,
    bankInternalRefName: 'Mock supply contract ID',
    additionalRefName: 'Mock supply contract name',
    status: CONSTANTS.DEALS.DEAL_STATUS.UKEF_ACKNOWLEDGED,
    previousStatus: 'Submitted',
    bank: {
      id: '123',
      name: 'Barclays Bank',
      emails: [
        'test1@mock.com',
        'test2@mock.com',
      ],
    },
    maker: {
      username: 'JOE',
      firstname: 'Joe',
      surname: 'Bloggs',
    },
    details: {
      bank: 'Mock bank',
      ukefDealId: '20010739',
      checker: {
        username: 'CHECKER',
        firstname: 'Emilio',
        surname: 'Largo',
      },
      submissionDate: '1606900616651',
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
      'supplier-companies-house-registration-number': '12345678',
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
      criteria: [
        {
          id: 11,
          description: 'The Supplier has confirmed in its Supplier Declaration that the Supply Contract does not involve agents and the Bank is not aware that any of the information contained within it is inaccurate.',
          answer: true,
        },
        {
          id: 12,
          description: 'The cover period for each Transaction does not exceed 5 years, or such other period approved by UKEF (that has not lapsed or been withdrawn) in relation to bonds and/or loans for this Obligor.',
          answer: false,
        },
        {
          id: 13,
          description: 'The total UKEF exposure, across all short-term schemes (including bond support and export working capital transactions), for this Obligor (including this Transaction) does not exceed £2 million, or such other limit approved by UKEF (that has not lapsed or been withdrawn).',
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
          description: 'The Supplier has confirmed in its Supplier Declaration that the Supply Contract does not involve any of the following Controlled Sectors: sharp arms defence, nuclear, radiological, biological, human cloning, pornography, tobacco or gambling, and the Bank is not aware that any of the information contained within it is inaccurate.',
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
    facilities: [
      {
        _id: '1010738',
        facilityType: CONSTANTS.DEALS.FACILITY_TYPE.LOAN,
        createdDate: '1640088922460',
        bankReferenceNumber: '1122444',
        'coverEndDate-day': '21',
        'coverEndDate-month': '1',
        'coverEndDate-year': '2022',
        facilityStage: 'Unconditional',
        lastEdited: '1640088967413',
        requestedCoverStartDate: 1640088922054,
        'requestedCoverStartDate-day': '10',
        'requestedCoverStartDate-month': '03',
        'requestedCoverStartDate-year': '2021',
        ukefGuaranteeInMonths: null,
        coveredPercentage: '12',
        currency: {
          id: 'USD',
          text: 'USD - US Dollars',
        },
        currencySameAsSupplyContractCurrency: 'true',
        disbursementAmount: '100.00',
        value: '1234.00',
        guaranteeFeePayableByBank: '21.6000',
        interestMarginFee: '24',
        minimumQuarterlyFee: '',
        ukefExposure: '148.08',
        dayCountBasis: '365',
        premiumFrequency: null,
        premiumType: 'At maturity',
        status: CONSTANTS.DEALS.DEAL_STATUS.UKEF_ACKNOWLEDGED,

        dealId: '1007117',
        issueFacilityDetailsSubmitted: true,
        issuedFacilitySubmittedToUkefBy: {
          _id: '61c0de9fa9b7dc0013f58303',
          bank: {
            companiesHouseNo: 'UKEF0001',
            emails: [
              'maker1@ukexportfinance.gov.uk',
              'checker1@ukexportfinance.gov.uk',
            ],
            id: '9',
            mga: [
              'mga_ukef_1.docx',
              'mga_ukef_2.docx',
            ],
            name: 'UKEF test bank (Delegated)',
            partyUrn: '00318345',
          },
          email: 'checker@ukexportfinance.gov.uk',
          firstname: 'Nikolaevich',
          lastLogin: '1640088929902',
          roles: [
            'checker',
          ],
          surname: 'Chernov',
          timezone: 'Europe/London',
          'user-status': 'active',
          username: 'BANK1_CHECKER1',
        },
        issuedFacilitySubmittedToUkefTimestamp: '1640088932972',
        ukefFacilityId: '0030134209',
        previousStatus: 'Completed',
        hasBeenAcknowledged: true,
      },
      {
        _id: '1010739',
        facilityType: CONSTANTS.DEALS.FACILITY_TYPE.BOND,
        createdDate: '1640088922461',
        bondBeneficiary: '',
        bondIssuer: '',
        bondType: 'Advance payment guarantee',
        'coverEndDate-day': '21',
        'coverEndDate-month': '1',
        'coverEndDate-year': '2022',
        facilityStage: 'Issued',
        lastEdited: '1640088967410',
        requestedCoverStartDate: 1640088922054,
        'requestedCoverStartDate-day': '10',
        'requestedCoverStartDate-month': '03',
        'requestedCoverStartDate-year': '2021',
        ukefGuaranteeInMonths: null,
        uniqueIdentificationNumber: '1234',
        conversionRate: '100',
        coveredPercentage: '24',
        currency: {
          id: 'USD',
          text: 'USD - US Dollars',
        },
        currencySameAsSupplyContractCurrency: 'true',
        value: '2400.00',
        guaranteeFeePayableByBank: '10.8000',
        minimumRiskMarginFee: '',
        riskMarginFee: '12',
        ukefExposure: '576.00',
        dayCountBasis: '365',
        feeFrequency: null,
        feeType: 'At maturity',
        dealId: '1007117',
        issueFacilityDetailsSubmitted: true,
        issuedFacilitySubmittedToUkefBy: {
          _id: '61c0de9fa9b7dc0013f58303',
          bank: {
            companiesHouseNo: 'UKEF0001',
            emails: [
              'maker1@ukexportfinance.gov.uk',
              'checker1@ukexportfinance.gov.uk',
            ],
            id: '9',
            mga: [
              'mga_ukef_1.docx',
              'mga_ukef_2.docx',
            ],
            name: 'UKEF test bank (Delegated)',
            partyUrn: '00318345',
          },
          email: 'checker@ukexportfinance.gov.uk',
          firstname: 'Nikolaevich',
          lastLogin: '1640088929902',
          roles: [
            'checker',
          ],
          surname: 'Chernov',
          timezone: 'Europe/London',
          'user-status': 'active',
          username: 'BANK1_CHECKER1',
        },
        issuedFacilitySubmittedToUkefTimestamp: '1640088932976',
        status: CONSTANTS.DEALS.DEAL_STATUS.UKEF_ACKNOWLEDGED,
        ukefFacilityId: '0030134210',
        previousStatus: 'Completed',
        hasBeenAcknowledged: true,
      },
    ],
    bondTransactions: {
      items: [
        {
          _id: '12345678',
          ukefFacilityId: '0040004833',
          bondIssuer: 'Issuer',
          facilityType: CONSTANTS.DEALS.FACILITY_TYPE.BOND,
          bondType: 'Advance payment guarantee',
          facilityStage: 'Unissued',
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
        },
      ],
    },
    loanTransactions: {
      items: [
        {
          _id: '23456789',
          facilityType: CONSTANTS.DEALS.FACILITY_TYPE.LOAN,
          ukefFacilityId: '0040004833',
          createdDate: 1610369832226.0,
          facilityStage: 'Conditional',
          ukefGuaranteeInMonths: '12',
          bankReferenceNumber: '5678',
          guaranteeFeePayableByBank: '27.0000',
          lastEdited: 1610369832226.0,
          value: '1234.00',
          currencySameAsSupplyContractCurrency: 'true',
          interestMarginFee: '30',
          coveredPercentage: '20',
          minimumQuarterlyFee: '10',
          ukefExposure: '246.80',
          premiumType: 'At maturity',
          dayCountBasis: '365',
          'issuedDate-day': '25',
          'issuedDate-month': '08',
          'issuedDate-year': '2020',
          'coverEndDate-day': '24',
          'coverEndDate-month': '09',
          'coverEndDate-year': '2020',
          disbursementAmount: '1,234.00',
          issueFacilityDetailsStarted: true,
          bankReferenceNumberRequiredForIssuance: true,
          requestedCoverStartDate: 1610369832226,
          issuedDate: 1610369832226,
          issueFacilityDetailsProvided: true,
          status: 'Acknowledged',
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
  },
  tfm: {
    submissionDetails: {
      supplierPartyUrn: 'MOCK supplierPartyUrn',
    },
    activities: [],
  },
};

module.exports = MOCK_DEAL;
