const BANKS = require('../banks');

const UKEF_TEST_BANK_1 = BANKS.find((bank) => bank.name === 'UKEF test bank (Delegated)');
const UKEF_TEST_BANK_2 = BANKS.find((bank) => bank.name === 'UKEF test bank (Delegated) 2');
const UKEF_GEF_ONLY_BANK = BANKS.find((bank) => bank.name === 'GEF Only Bank');

const USERS = [
  {
    username: 'BANK1_MAKER1',
    password: 'AbC!2345',
    firstname: 'Tamil',
    surname: 'Rahani',
    email: 'maker1@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: UKEF_TEST_BANK_1,
  },
  {
    username: 'BANK1_MAKER2',
    password: 'AbC!2345',
    firstname: 'Tamara',
    surname: 'Raikovic',
    email: 'maker2@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: UKEF_TEST_BANK_1,
  },
  {
    username: 'BANK3_GEF_MAKER1',
    password: 'AbC!2345',
    firstname: 'Benito',
    surname: 'Sutton',
    email: 'maker2@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: UKEF_GEF_ONLY_BANK,
  },
  {
    username: 'BANK3_GEF_CHECKER1',
    password: 'AbC!2345',
    firstname: 'Tony',
    surname: 'Sheridan',
    email: 'maker2@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['checker'],
    bank: UKEF_GEF_ONLY_BANK,
  },
  {
    username: 'BANK1_CHECKER1',
    password: 'AbC!2345',
    firstname: 'Nikolaevich',
    surname: 'Chernov',
    email: 'checker1@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['checker'],
    bank: UKEF_TEST_BANK_1,
  },
  {
    username: 'BANK1_MAKER_CHECKER1',
    password: 'AbC!2345',
    firstname: 'Vladimir',
    surname: 'Scorpius',
    email: 'maker2@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['maker', 'checker'],
    bank: UKEF_TEST_BANK_1,
  },
  {
    username: 'BANK1_MAKENCHECK2',
    password: 'AbC!2345',
    firstname: 'Vladimir',
    surname: 'Scorpius',
    email: 'checker2@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['maker', 'checker'],
    bank: UKEF_TEST_BANK_1,
  },
  {
    username: 'BANK2_MAKER2',
    password: 'AbC!2345',
    firstname: 'Tamara',
    surname: 'Ratkevicius',
    email: 'maker2@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: UKEF_TEST_BANK_2,
  },
  {
    username: 'BANK2_MAKER1',
    password: 'AbC!2345',
    firstname: 'Tamil',
    surname: 'Rahani',
    email: 'maker1@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: UKEF_TEST_BANK_2,
  },
  {
    username: 'BANK2_CHECKER1',
    password: 'AbC!2345',
    firstname: 'Nikolaevich',
    surname: 'Chernov',
    email: 'checker@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['checker'],
    bank: UKEF_TEST_BANK_2,
  },
  {
    username: 'NOBODY',
    password: 'AbC!2345',
    firstname: 'Seraffimo',
    surname: 'Spang',
    email: '',
    timezone: 'Europe/London',
    roles: [],
  },
  {
    username: 'ADMIN',
    password: 'AbC!2345',
    firstname: 'Julius',
    surname: 'No',
    email: '',
    timezone: 'Europe/London',
    roles: ['maker', 'editor', 'admin'],
    bank: {
      id: '*',
    },
  },
  {
    username: 'ADMINNOMAKER',
    password: 'AbC!2345',
    firstname: 'Julius',
    surname: 'No',
    email: '',
    timezone: 'Europe/London',
    roles: ['admin'],
    bank: {
      id: '*',
    },
  },
  {
    username: 'UKEF_OPERATIONS',
    password: 'AbC!2345',
    firstname: 'Elliot',
    surname: 'Carver',
    email: '',
    timezone: 'Europe/London',
    roles: ['ukef_operations'],
    bank: {
      id: '*',
    },
  },
  {
    username: 'EDITOR',
    password: 'AbC!2345',
    firstname: 'Domingo',
    surname: 'Espada',
    email: '',
    timezone: 'Europe/London',
    roles: ['editor'],
    bank: {
      id: '*',
    },
  },
  {
    username: 'TEST_EMAIL_NO_GOV_NOTIFY',
    password: 'AbC!2345',
    firstname: 'Wolfgang',
    surname: 'Weisen',
    email: 'test_no_notify@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: {
      id: '*',
    },
  },
];

module.exports = USERS;
