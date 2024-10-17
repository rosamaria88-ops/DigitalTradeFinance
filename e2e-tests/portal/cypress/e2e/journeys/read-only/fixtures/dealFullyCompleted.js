const { mandatoryCriteria } = require('../../../../../../e2e-fixtures');
const { yesterday, oneMonth, today } = require('../../../../../../e2e-fixtures/dateConstants');

const deal = {
  submissionType: 'Automatic Inclusion Notice',
  updatedAt: Date.now(),
  additionalRefName: 'mock name',
  bankInternalRefName: 'mock id',
  status: "Ready for Checker's approval",
  previousStatus: 'Draft',
  comments: [
    {
      username: 'bananaman',
      timestamp: '1984/12/25 00:00:00:001',
      text: 'Merry Christmas from the 80s',
    },
    {
      username: 'supergran',
      timestamp: '1982/12/25 00:00:00:001',
      text: 'Also Merry Christmas from the 80s',
    },
  ],
  mockFacilities: [
    {
      type: 'Bond',
      bondIssuer: 'my issuer',
      bondType: 'Retention bond',
      facilityStage: 'Issued',
      hasBeenIssued: true,
      ukefGuaranteeInMonths: '12',
      'requestedCoverStartDate-day': today.dayLong,
      'requestedCoverStartDate-month': today.monthLong,
      'requestedCoverStartDate-year': today.year,
      'coverEndDate-day': oneMonth.day,
      'coverEndDate-month': oneMonth.month,
      'coverEndDate-year': oneMonth.year,
      name: '1234567890',
      bondBeneficiary: 'test',
      value: '1234',
      currencySameAsSupplyContractCurrency: 'false',
      currency: {
        text: 'GBP - UK Sterling',
        id: 'GBP',
      },
      conversionRate: '100',
      'conversionRateDate-day': yesterday.dayLong,
      'conversionRateDate-month': yesterday.monthLong,
      'conversionRateDate-year': yesterday.year,
      riskMarginFee: '12',
      coveredPercentage: '24',
      minimumRiskMarginFee: '1',
      feeType: 'In advance',
      feeFrequency: 'Quarterly',
      dayCountBasis: '360',
      guaranteeFeePayableByBank: '12.345',
      ukefExposure: '1,234.56',
    },
    {
      type: 'Bond',
      bondIssuer: 'my issuer',
      bondType: 'Retention bond',
      facilityStage: 'Issued',
      hasBeenIssued: true,
      ukefGuaranteeInMonths: '12',
      'requestedCoverStartDate-day': today.dayLong,
      'requestedCoverStartDate-month': today.monthLong,
      'requestedCoverStartDate-year': today.year,
      'coverEndDate-day': oneMonth.day,
      'coverEndDate-month': oneMonth.month,
      'coverEndDate-year': oneMonth.year,
      name: '1234567890',
      bondBeneficiary: 'test',
      value: '5678',
      currencySameAsSupplyContractCurrency: 'true',
      currency: {
        text: 'CAD - Canadian Dollars',
        id: 'CAD',
      },
      riskMarginFee: '12',
      coveredPercentage: '24',
      minimumRiskMarginFee: '1',
      feeType: 'In arrear',
      feeFrequency: 'Monthly',
      dayCountBasis: '360',
      guaranteeFeePayableByBank: '12.345',
      ukefExposure: '1,234.56',
    },
    {
      type: 'Loan',
      facilityStage: 'Conditional',
      hasBeenIssued: false,
      ukefGuaranteeInMonths: '12',
      name: '123456',
      guaranteeFeePayableByBank: '10.8000',
      ukefExposure: '2,469,135.60',
      value: '12345678',
      currencySameAsSupplyContractCurrency: 'true',
      interestMarginFee: '12',
      coveredPercentage: '20',
      minimumQuarterlyFee: '20',
      premiumFrequency: 'Monthly',
      premiumType: 'In advance',
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
      'requestedCoverStartDate-day': today.dayLong,
      'requestedCoverStartDate-month': today.monthLong,
      'requestedCoverStartDate-year': today.year,
      'coverEndDate-day': oneMonth.day,
      'coverEndDate-month': oneMonth.month,
      'coverEndDate-year': oneMonth.year,
      name: '12345678',
      guaranteeFeePayableByBank: '10.8000',
      ukefExposure: '3,703,703.40',
      value: '12345678',
      currencySameAsSupplyContractCurrency: 'false',
      currency: {
        text: 'AUD - Australian Dollars',
        id: 'AUD',
      },
      conversionRate: '80',
      'conversionRateDate-day': yesterday.dayLong,
      'conversionRateDate-month': yesterday.monthLong,
      'conversionRateDate-year': yesterday.year,
      disbursementAmount: '10',
      interestMarginFee: '12',
      coveredPercentage: '30',
      minimumQuarterlyFee: '123456',
      premiumFrequency: 'Quarterly',
      premiumType: 'In advance',
      dayCountBasis: '365',
    },
  ],
  eligibility: {
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
    agentAddressLine1: 'ADDR 1',
    agentAddressLine2: 'Addr 2',
    agentAddressLine3: 'Addr 3',
    agentAddressCountry: 'GBR',
    agentName: 'AGENT NAME',
    agentAddressPostcode: 'CF64 5SH',
    agentAddressTown: 'City',
  },
  submissionDetails: {
    'indemnifier-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'indemnifier-address-line-3': '',
    'indemnifier-address-line-1': '1A',
    'indemnifier-address-line-2': 'Test Road',
    'indemnifier-address-postcode': 'test',
    'indemnifier-address-town': 'London',
    'indemnifier-companies-house-registration-number': '06771815',
    'indemnifier-correspondence-address-country': {
      code: 'GBR',
      name: 'United Kingdom',
    },
    'indemnifier-correspondence-address-line-3': 'Essex',
    'indemnifier-correspondence-address-line-1': 'Test address',
    'indemnifier-correspondence-address-line-2': '',
    'indemnifier-correspondence-address-postcode': 'test',
    'indemnifier-correspondence-address-town': 'Chelmsford',
    'indemnifier-name': 'Test Trading Limited',
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
    'supplier-address-postcode': 'test',
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
      name: 'United States',
      code: 'USA',
    },
    viewedPreviewPage: true,
    supplyContractConversionRateToGBP: '1.123456',
    supplyContractCurrency: {
      id: 'USD',
    },
    supplyContractValue: '10,000',
    'supplyContractConversionDate-day': yesterday.dayLong,
    'supplyContractConversionDate-month': yesterday.monthLong,
    'supplyContractConversionDate-year': yesterday.year,
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
  },
  mandatoryCriteria,
  supportingInformation: {},
};

module.exports = deal;
