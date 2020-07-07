const moment = require('moment');

const now = moment();

const deal = {
  _id: 123456,
  details: {
    bankSupplyContractName: 'mock name',
    bankSupplyContractID: 'mock id',
    status: 'Ready for Checker\'s approval',
    dateOfLastAction: '02/02/2020 12:12',
    previousStatus: 'Draft',
    maker: {username: 'some.user@client.com'},
    submissionDate: '01/01/2020',
  },
  comments: [{
    username: 'bananaman',
    timestamp: '1984/12/25 00:00:00:001',
    text: 'Merry Christmas from the 80s',
  }, {
    username: 'supergran',
    timestamp: '1982/12/25 00:00:00:001',
    text: 'Also Merry Christmas from the 80s',
  }],
  bondTransactions: {
    items: [
      {
        _id: '1000101',
        bondIssuer: 'my issuer',
        bondType: 'Retention bond',
        bondStage: 'Issued',
        ukefGuaranteeInMonths: '12',
        'requestedCoverStartDate-day' : `${moment().format('DD')}`,
        'requestedCoverStartDate-month' : `${moment().format('MM')}`,
        'requestedCoverStartDate-year' : `${moment().format('YYYY')}`,
        'coverEndDate-day': `${now.add(1, 'month').format('DD')}`,
        'coverEndDate-month': `${now.add(1, 'month').format('MM')}`,
        'coverEndDate-year': `${now.add(1, 'month').format('YYYY')}`,
        uniqueIdentificationNumber: '1234567890',
        bondBeneficiary: 'test',
        status: 'Completed',
        facilityValue: '1234',
        currencySameAsSupplyContractCurrency: 'true',
        currency: {
          text: 'GBP - UK Sterling',
          id: 'GBP',
        },
        conversionRate: '100',
        'conversionRateDate-day': `${moment().subtract(1, 'day').format('DD')}`,
        'conversionRateDate-month': `${moment().subtract(1, 'day').format('MM')}`,
        'conversionRateDate-year': `${moment().subtract(1, 'day').format('YYYY')}`,
        riskMarginFee: '12',
        coveredPercentage: '24',
        minimumRiskMarginFee: '1',
        feeType: 'In advance',
        feeFrequency: 'Quarterly',
        dayCountBasis: '360',
        guaranteeFeePayableByBank: '9.000',
        ukefExposure: '100',
      },
      {
        _id: '1000102',
        bondIssuer: 'my issuer',
        bondType: 'Retention bond',
        bondStage: 'Issued',
        ukefGuaranteeInMonths: '12',
        'requestedCoverStartDate-day' : `${moment().format('DD')}`,
        'requestedCoverStartDate-month' : `${moment().format('MM')}`,
        'requestedCoverStartDate-year' : `${moment().format('YYYY')}`,
        'coverEndDate-day': `${now.add(1, 'month').format('DD')}`,
        'coverEndDate-month': `${now.add(1, 'month').format('MM')}`,
        'coverEndDate-year': `${now.add(1, 'month').format('YYYY')}`,
        uniqueIdentificationNumber: '1234567890',
        bondBeneficiary: 'test',
        status: 'Completed',
        facilityValue: '5678',
        currencySameAsSupplyContractCurrency: 'true',
        currency: {
          text: 'GBP - UK Sterling',
          id: 'GBP',
        },
        conversionRate: '100',
        'conversionRateDate-day': `${moment().subtract(1, 'day').format('DD')}`,
        'conversionRateDate-month': `${moment().subtract(1, 'day').format('MM')}`,
        'conversionRateDate-year': `${moment().subtract(1, 'day').format('YYYY')}`,
        riskMarginFee: '12',
        coveredPercentage: '24',
        minimumRiskMarginFee: '1',
        feeType: 'In arrear',
        feeFrequency: 'Monthly',
        dayCountBasis: '360',
        guaranteeFeePayableByBank: '9.000',
        ukefExposure: '100',
      },
    ],
  },
  "loanTransactions": {
    "items": [
      {
        _id: '321321',
        "facilityStage": "Unconditional",
        "bankReferenceNumber": "123",
        "facilityValue": "123",
        "disbursementAmount": "12",
        "currencySameAsSupplyContractCurrency": "true",
        "interestMarginFee": "10",
        "coveredPercentage": "9",
      }
    ]
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
        answer: true,
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
    agentAddress1: 'ADDR 1',
    agentAddress2: 'Addr 2',
    agentAddress3: 'Addr 3',
    agentCountry: 'GBR',
    agentName: 'AGENT NAME',
    agentPostcode: 'CF64 5SH',
    agentTown: 'City',
  },
  "submissionDetails" : {
    "indemnifier-address-country" : "GBR",
    "indemnifier-address-line-3" : "",
    "indemnifier-address-line-1" : "27a",
    "indemnifier-address-line-2" : "Maxwell Road",
    "indemnifier-address-postcode" : "HA6 2XY",
    "indemnifier-address-town" : "Northwood",
    "indemnifier-companies-house-registration-number" : "08547313",
    "indemnifier-correspondence-address-country" : "GBR",
    "indemnifier-correspondence-address-line-3" : "Essex",
    "indemnifier-correspondence-address-line-1" : "27 Petersfield",
    "indemnifier-correspondence-address-line-2" : "",
    "indemnifier-correspondence-address-postcode" : "CM1 4EP",
    "indemnifier-correspondence-address-town" : "Chelmsford",
    "indemnifier-name" : "WATKINSON TRADING LIMITED",
    "indemnifierCorrespondenceAddressDifferent" : "true",
    "industry-sector" : "1008",
    "industry-class" : "56210",
    "legallyDistinct" : "true",
    "sme-type" : "Small",
    "supplier-address-country" : "GBR",
    "supplier-address-line-3" : "London",
    "supplier-address-line-1" : "1 Horseguards Road",
    "supplier-address-line-2" : "",
    "supplier-address-postcode" : "SW1A 2HQ",
    "supplier-address-town" : "Westminster",
    "supplier-companies-house-registration-number" : "",
    "supplier-correspondence-address-country" : "GBR",
    "supplier-correspondence-address-line-3" : "Edinburgh",
    "supplier-correspondence-address-line-1" : "2 Horseguards Road",
    "supplier-correspondence-address-line-2" : "",
    "supplier-correspondence-address-postcode" : "ED1 23S",
    "supplier-correspondence-address-town" : "Eastminster",
    "supplier-name" : "UKFS",
    "supplier-type" : "Exporter",
    "supplier-correspondence-address-is-different" : "true",
    "supply-contract-description" : "Description.",
    "buyer-address-country" : "USA",
    "buyer-address-line-1" : "Corner of East and Main",
    "buyer-address-line-2" : "",
    "buyer-address-line-3" : "The Bronx",
    "buyer-address-postcode" : "no-idea",
    "buyer-address-town" : "New York",
    "buyer-name" : "Huggy Bear",
    "destinationOfGoodsAndServices" : "USA",
    "hasBeenPreviewed" : true,
    "supplyContractConversionRateToGBP" : "1.123456",
    "supplyContractCurrency" : {
        "id" : "USD"
    },
    "supplyContractValue" : "10,000",
    "supplyContractConversionDate-day" : `${now.format('DD')}`,
    "supplyContractConversionDate-month" : `${now.format('MM')}`,
    "supplyContractConversionDate-year" : `${now.format('YYYY')}`,
  },
  summary: {
    totalValue: {
      dealInDealCurrency: '10,000',
      dealInGbp: '12,000',
      bondInDealCurrency: '8,000',
      bondInGbp: '16,000',
      loanInDealCurrency: '4,000',
      loanInGbp: '8,000',
    },
    totalUkefExposure: {
      dealInDealCurrency: '5,000',
      dealInGbp: '6,000',
      bondInDealCurrency: '4,000',
      bondInGbp: '8,000',
      loanInDealCurrency: '2,000',
      loanInGbp: '4,000',
    },
  },
  dealFiles: {
    exporterQuestionnaire: [
      {
        type: 'general_correspondence',
        fullPath: 'private-files/ukef_portal_storage/1000256/exporterQuestionnaire/test-file-1.txt',
        filename: 'test-file-1.txt',
        mimetype: 'text/plain',
      },
      {
        type: 'general_correspondence',
        fullPath: 'private-files/ukef_portal_storage/1000256/exporterQuestionnaire/test-file-2.txt',
        filename: 'test-file-2.txt',
        mimetype: 'text/plain',
      },
    ],
    auditedFinancialStatements: [
      {
        type: 'financials',
        fullPath: 'private-files/ukef_portal_storage/1000256/auditedFinancialStatements/test-file-3.txt',
        filename: 'test-file-3.txt',
        mimetype: 'text/plain',
      },
    ],
    security: 'security test',
  },
};

module.exports = deal;
