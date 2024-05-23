const { ObjectId } = require('mongodb');

const createTfmDealToInsertIntoDb = (ukefDealId, companyName, dealObjectId) => ({
  _id: new ObjectId(dealObjectId),
  dealSnapshot: {
    _id: new ObjectId(),
    additionalRefName: 'Mock supply contract name',
    bank: {
      companiesHouseNo: 'UKEF0001',
      emails: ['maker1@ukexportfinance.gov.uk', 'checker1@ukexportfinance.gov.uk'],
      hasGefAccessOnly: false,
      id: '9',
      mga: ['mga_ukef_1.docx', 'mga_ukef_2.docx'],
      name: 'UKEF test bank (Delegated)',
      partyUrn: '00318345',
    },
    bankInternalRefName: 'Mock supply contract ID',
    bondTransactions: {
      items: [
        {
          _id: new ObjectId(),
          type: 'Bond',
          bondIssuer: 'Issuer',
          bondType: 'Advance payment guarantee',
          facilityStage: 'Issued',
          hasBeenIssued: true,
          ukefGuaranteeInMonths: '10',
          bondBeneficiary: 'test',
          guaranteeFeePayableByBank: '9.0000',
          value: '12345.00',
          currencySameAsSupplyContractCurrency: 'true',
          riskMarginFee: '10',
          coveredPercentage: '20',
          minimumRiskMarginFee: '30',
          ukefExposure: '2,469.00',
          feeFrequency: 'Quarterly',
          feeType: 'At maturity',
          dayCountBasis: '365',
          currency: {
            text: 'GBP - UK Sterling',
            id: 'GBP',
          },
          'coverEndDate-day': '06',
          'coverEndDate-month': '03',
          'coverEndDate-year': '2024',
          issuedDate: '1644160701000',
          requestedCoverStartDate: '1644160701000',
          name: 'Test-123',
          updatedAt: 1707232703089,
          ukefFacilityId: '10000008',
          createdDate: 1707232703089,
          dealId: new ObjectId(),
        },
      ],
    },
    comments: [],
    dealType: 'BSS/EWCS',
    details: {
      bank: 'Mock bank',
      checker: {
        firstname: 'Emilio',
        surname: 'Largo',
        username: 'CHECKER',
      },
      created: 1707232702216,
      submissionCount: 1,
      submissionDate: '1707232701561',
      ukefDealId,
    },
    editedBy: [],
    eligibility: {
      agentAddressCountry: {
        code: 'GBR',
        name: 'United Kingdom',
      },
      agentAddressLine1: 'ADDR 1',
      agentAddressLine2: 'Addr 2',
      agentAddressLine3: 'Addr 3',
      agentAddressPostcode: 'CF64 5SH',
      agentAddressTown: 'City',
      agentName: 'AGENT NAME',
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
          answer: false,
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
      isInDraft: false,
      lastUpdated: null,
      product: 'BSS/EWCS',
      status: 'Not started',
      version: 7,
    },
    exporter: {
      companyName,
    },
    facilities: [
      {
        _id: new ObjectId(),
        type: 'Bond',
        bondIssuer: 'Issuer',
        bondType: 'Advance payment guarantee',
        facilityStage: 'Issued',
        hasBeenIssued: true,
        ukefGuaranteeInMonths: '10',
        bondBeneficiary: 'test',
        guaranteeFeePayableByBank: '9.0000',
        value: '12345.00',
        currencySameAsSupplyContractCurrency: 'true',
        riskMarginFee: '10',
        coveredPercentage: '20',
        minimumRiskMarginFee: '30',
        ukefExposure: '2,469.00',
        feeFrequency: 'Quarterly',
        feeType: 'At maturity',
        dayCountBasis: '365',
        currency: {
          text: 'GBP - UK Sterling',
          id: 'GBP',
        },
        'coverEndDate-day': '06',
        'coverEndDate-month': '03',
        'coverEndDate-year': '2024',
        issuedDate: '1644160701000',
        requestedCoverStartDate: '1644160701000',
        name: 'Test-123',
        updatedAt: 1707232703089,
        ukefFacilityId: '10000008',
        createdDate: 1707232703089,
        dealId: new ObjectId(),
      },
    ],
    loanTransactions: {
      items: [],
    },
    maker: {
      _id: '65c24c24cdf8e3dbe213feb3',
      bank: {
        companiesHouseNo: 'UKEF0001',
        emails: ['maker1@ukexportfinance.gov.uk', 'checker1@ukexportfinance.gov.uk'],
        hasGefAccessOnly: false,
        id: '9',
        mga: ['mga_ukef_1.docx', 'mga_ukef_2.docx'],
        name: 'UKEF test bank (Delegated)',
        partyUrn: '00318345',
      },
      email: 'maker1@ukexportfinance.gov.uk',
      firstname: 'First',
      lastLogin: 1707232702188,
      roles: ['maker'],
      surname: 'Last',
      timezone: 'Europe/London',
      'user-status': 'active',
      username: 'BANK1_MAKER1',
    },
    mockFacilities: [
      {
        type: 'Bond',
        bondIssuer: 'Issuer',
        bondType: 'Advance payment guarantee',
        facilityStage: 'Issued',
        hasBeenIssued: true,
        ukefGuaranteeInMonths: '10',
        bondBeneficiary: 'test',
        guaranteeFeePayableByBank: '9.0000',
        value: '12345.00',
        currencySameAsSupplyContractCurrency: 'true',
        riskMarginFee: '10',
        coveredPercentage: '20',
        minimumRiskMarginFee: '30',
        ukefExposure: '2,469.00',
        feeFrequency: 'Quarterly',
        feeType: 'At maturity',
        dayCountBasis: '365',
        currency: {
          text: 'GBP - UK Sterling',
          id: 'GBP',
        },
        'coverEndDate-day': '06',
        'coverEndDate-month': '03',
        'coverEndDate-year': '2024',
        issuedDate: '1644160701000',
        requestedCoverStartDate: '1644160701000',
        name: 'Test-123',
        updatedAt: 1707232701494,
      },
    ],
    previousStatus: 'Submitted',
    status: 'Submitted',
    submissionDetails: {
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
      status: 'Incomplete',
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
      'supplier-name': `Mock-Supplier-${ukefDealId}`,
      'supplier-type': 'Exporter',
      'supply-contract-description': 'test',
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
    submissionType: 'Automatic Inclusion Notice',
    summary: {},
    supportingInformation: {
      securityDetails: {
        exporter: null,
      },
    },
    updatedAt: 1707232703098,
  },
  tfm: {
    activities: [],
    dateReceived: '06-02-2024',
    dateReceivedTimestamp: 1707232706,
    exporterCreditRating: 'Acceptable (B+)',
    lastUpdated: 1707232707652,
    lossGivenDefault: 50,
    parties: {
      agent: {
        partyUrn: '',
        partyUrnRequired: true,
      },
      buyer: {
        partyUrn: '',
        partyUrnRequired: true,
      },
      exporter: {
        partyUrn: '',
        partyUrnRequired: true,
      },
      indemnifier: {
        partyUrn: '',
        partyUrnRequired: true,
      },
    },
    probabilityOfDefault: 14.1,
    product: 'BSS',
    stage: 'Confirmed',
    estore: {},
    tasks: [
      {
        groupTitle: 'Set up deal',
        id: 1,
        groupTasks: [
          {
            id: '1',
            groupId: 1,
            title: 'Match or create the parties in this deal',
            team: {
              id: 'BUSINESS_SUPPORT',
              name: 'Business support group',
            },
            isConditional: true,
            status: 'To do',
            assignedTo: {
              userId: 'Unassigned',
              userFullName: 'Unassigned',
            },
            canEdit: true,
            history: [],
            emailSent: true,
          },
          {
            id: '2',
            groupId: 1,
            title: 'Create or link this opportunity in Salesforce',
            team: {
              id: 'BUSINESS_SUPPORT',
              name: 'Business support group',
            },
            status: 'Cannot start yet',
            assignedTo: {
              userId: 'Unassigned',
              userFullName: 'Unassigned',
            },
            canEdit: false,
            history: [],
          },
        ],
      },
    ],
  },
});

module.exports = createTfmDealToInsertIntoDb;
