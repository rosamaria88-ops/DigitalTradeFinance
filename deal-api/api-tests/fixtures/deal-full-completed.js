const deal = {
  details: {
    bankSupplyContractName: 'mock name',
    bankSupplyContractID: 'mock id',
    status: 'Draft',
    dateOfLastAction: '1985/11/04 21:00:00:000',
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
        _id: '5ea954bf21280f0049791448',
        bondIssuer: 'my issuer',
        bondType: 'Retention bond',
        bondStage: 'Unissued',
        ukefGuaranteeInMonths: '12',
        'requestedCoverStartDate-day': '12',
        'requestedCoverStartDate-month': '04',
        'requestedCoverStartDate-year': '1981',
        'coverEndDate-day': '24',
        'coverEndDate-month': '03',
        'coverEndDate-year': '2050',
        uniqueIdentificationNumber: '1234567890',
        bondBeneficiary: 'test',
        status: 'Incomplete',
        bondValue: '1234',
        transactionCurrencySameAsSupplyContractCurrency: 'true',
        currency: {
          text: 'GBP - UK Sterling',
          id: 'GBP',
        },
        conversionRate: '100',
        'conversionRateDate-day': '12',
        'conversionRateDate-month': '04',
        'conversionRateDate-year': '1981',
        riskMarginFee: '12',
        coveredPercentage: '24',
        minimumRiskMarginFee: '1',
        feeType: 'In advance',
        feeFrequency: 'Quarterly',
        dayCountBasis: '360',
      },
      {
        _id: '2a',
        bondIssuer: 'my issuer',
        bondType: 'Retention bond',
        bondStage: 'Unissued',
        ukefGuaranteeInMonths: '12',
        'requestedCoverStartDate-day': '29',
        'requestedCoverStartDate-month': '06',
        'requestedCoverStartDate-year': '2011',
        'coverEndDate-day': '24',
        'coverEndDate-month': '03',
        'coverEndDate-year': '2050',
        uniqueIdentificationNumber: '1234567890',
        bondBeneficiary: 'test',
        status: 'Incomplete',
        bondValue: '5678',
        transactionCurrencySameAsSupplyContractCurrency: 'true',
        currency: {
          text: 'GBP - UK Sterling',
          id: 'GBP',
        },
        conversionRate: '100',
        'conversionRateDate-day': '12',
        'conversionRateDate-month': '04',
        'conversionRateDate-year': '1981',
        riskMarginFee: '12',
        coveredPercentage: '24',
        minimumRiskMarginFee: '1',
        feeType: 'In arrear',
        feeFrequency: 'Monthly',
        dayCountBasis: '360',
      },
    ],
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
  submissionDetails: {
    status: 'Incomplete',
    'indemnifier-address-country': '',
    'indemnifier-address-county': '',
    'indemnifier-address-line-1': '27a',
    'indemnifier-address-line-2': 'Maxwell Road',
    'indemnifier-address-postcode': 'HA6 2XY',
    'indemnifier-address-town': 'Northwood',
    'indemnifier-companies-house-registration-number': '08547313',
    'indemnifier-correspondence-address-country': 'GBR',
    'indemnifier-correspondence-address-county': 'Essex',
    'indemnifier-correspondence-address-line-1': '27 Petersfield',
    'indemnifier-correspondence-address-line-2': '',
    'indemnifier-correspondence-address-postcode': 'CM1 4EP',
    'indemnifier-correspondence-address-town': 'Chelmsford',
    'indemnifier-name': 'WATKINSON TRADING LIMITED',
    indemnifierCorrespondenceAddressDifferent: 'true',
    'industry-class': '62012',
    'industry-sector': '1009',
    legallyDistinct: 'true',
    'sme-type': 'Small',
    'supplier-address-country': 'GBR',
    'supplier-address-county': 'London',
    'supplier-address-line-1': '1 Horseguards Road',
    'supplier-address-line-2': '',
    'supplier-address-postcode': 'SW1A 2HQ',
    'supplier-address-town': 'Westminster',
    'supplier-companies-house-registration-number': '',
    'supplier-correspondence-address-country': '',
    'supplier-correspondence-address-county': 'Edinburgh',
    'supplier-correspondence-address-line-1': '2 Horseguards Road',
    'supplier-correspondence-address-line-2': '',
    'supplier-correspondence-address-postcode': 'ED1 23S',
    'supplier-correspondence-address-town': 'Eastminster',
    'supplier-name': 'UKFS',
    'supplier-type': 'Exporter',
    'supplier-correspondence-address-is-different': 'true',
    'supply-contract-description': 'Description.',
  },
};

module.exports = deal;
