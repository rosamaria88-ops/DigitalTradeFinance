const Chance = require('chance');

const chance = new Chance();

const MOCK_MAKER = {
  _id: '61cdde40055cf301acf98064',
  username: 'BANK1_MAKER1',
  roles: [
    'maker',
  ],
  bank: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
    mga: [
      'mga_ukef_1.docx',
      'mga_ukef_2.docx',
    ],
    emails: [
      'maker1@ukexportfinance.gov.uk',
      'checker1@ukexportfinance.gov.uk',
    ],
    companiesHouseNo: 'UKEF0001',
    partyUrn: '00318345',
  },
  lastLogin: '1640950583636',
  firstname: chance.first(),
  surname: chance.last(),
  email: 'maker1@ukexportfinance.gov.uk',
  timezone: 'Europe/London',
  'user-status': 'active',
};

const MOCK_CHECKER = {
  _id: '61cdde40055cf301acf98065',
  username: 'BANK1_CHECKER1',
  roles: [
    'checker',
  ],
  bank: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
    mga: [
      'mga_ukef_1.docx',
      'mga_ukef_2.docx',
    ],
    emails: [
      'maker1@ukexportfinance.gov.uk',
      'checker1@ukexportfinance.gov.uk',
    ],
    companiesHouseNo: 'UKEF0001',
    partyUrn: '00318345',
  },
  lastLogin: '1640950583636',
  firstname: chance.first(),
  surname: chance.last(),
  email: 'maker1@ukexportfinance.gov.uk',
  timezone: 'Europe/London',
  'user-status': 'active',
};

module.exports = {
  MOCK_MAKER,
  MOCK_CHECKER,
};