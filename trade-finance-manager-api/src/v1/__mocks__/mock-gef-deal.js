const MOCK_CASH_CONTINGENT_FACILITIES = require('./mock-cash-contingent-facilities');

const MOCK_GEF_DEAL = {
  _id: 'MOCK_GEF_DEAL',
  dealType: 'GEF',
  applicationId: 'MOCK_GEF_DEAL',
  additionalRefName: 'Additional Reference 001',
  bankInternalRefName: 'Internal Reference 001',
  submissionDate: '1626169888809',
  submissionCount: 1,
  submissionType: 'Automatic Inclusion Notice',
  createdAt: 1625827333471,
  exporter: {
    isFinanceIncreasing: true,
    companiesHouseRegistrationNumber: '10686321',
    companyName: 'FOUNDRY4 CONSULTING LTD',
    correspondenceAddress: {
      addressLine1: 'Test line 1',
      addressLine2: 'Test line 2',
      addressLine3: 'Test line 3',
      locality: 'Test locality',
      postalCode: 'Test postcode',
      country: 'Test country',
    },
    createdAt: 1625827333468,
    industries: [
      {
        code: '1009',
        name: 'Information and communication',
        class: {
          code: '62020',
          name: 'Information technology consultancy activities',
        },
      },
    ],
    probabilityOfDefault: 14,
    registeredAddress: {
      organisationName: null,
      addressLine1: '7 Savoy Court',
      addressLine2: null,
      addressLine3: null,
      locality: 'London',
      postalCode: 'WC2R 0EX',
      country: 'United Kingdom',
    },
    selectedIndustry: {
      code: '1009',
      name: 'Information and communication',
      class: {
        code: '62020',
        name: 'Information technology consultancy activities',
      },
    },
    smeType: 'MEDIUM',
    updatedAt: 162582748022,
  },
  maker: {
    username: 'JOE',
    firstname: 'Joe',
    surname: 'Bloggs',
  },
  bank: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
    emails: [
      'maker1@ukexportfinance.gov.uk',
      'checker1@ukexportfinance.gov.uk',
    ],
  },
  mandatoryVersionId: null,
  status: 'SUBMITTED_TO_UKEF',
  updatedAt: null,
  userId: '60e705d74cf03e0013d38395',
  checkerId: '60a705d74bf03d1300d96383',
  comments: [
    {
      createdAt: 1625482095783,
      userName: 'Sample User',
      comment: 'Sample comment',
    },
  ],
  facilities: MOCK_CASH_CONTINGENT_FACILITIES,
};

module.exports = MOCK_GEF_DEAL;
