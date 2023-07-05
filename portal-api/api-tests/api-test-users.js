const api = require('./api');
const db = require('../src/drivers/db-client');
const { genPassword } = require('../src/crypto/utils');
const wipeDB = require('./wipeDB');

const banks = {
  Barclays: {
    id: '956',
    name: 'Barclays Bank',
    emails: [
      'maker4@ukexportfinance.gov.uk',
      'checker4@ukexportfinance.gov.uk',
    ],
  },
  HSBC: {
    id: '961',
    name: 'HSBC',
    emails: [
      'maker1@ukexportfinance.gov.uk',
      'maker2@ukexportfinance.gov.uk',
    ],
  },
  LLOYDS: {
    id: '964',
    name: 'LLOYDS',
  },
  RBS: {
    id: '1004',
    name: 'RBS',
  },
  Santander: {
    id: '953',
    name: 'Santander',
  },
  UKEF: {
    id: '9',
    name: 'UKEF test bank (Delegated)',
    emails: [
      'maker1@ukexportfinance.gov.uk',
      'checker1@ukexportfinance.gov.uk',
    ],
  },
  any: {
    id: '*',
  },
};

const testUsers = [
  {
    username: 'no-roles', email: 'no-roles@ukexportfinance.gov.uk', password: 'P@ssword1234', roles: []
  },
  {
    username: 'an-editor', email: 'an-editor@ukexportfinance.gov.uk', password: 'P@ssword1234', roles: ['editor']
  },
  {
    username: 'HSBC-maker-1',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'One',
    email: 'one@email.com',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: banks.HSBC,
  },
  {
    username: 'HSBC-maker-2',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'Two',
    email: 'two@email.com',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: banks.HSBC,
  },
  {
    username: 'Barclays-maker-1',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'Three',
    email: 'three@email.com',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: banks.Barclays,
  },
  {
    username: 'Barclays-maker-2',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'Four',
    email: 'four@email.com',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: banks.Barclays,
  },
  {
    username: 'Barclays-checker-1',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'Five',
    email: 'five@email.com',
    timezone: 'Europe/London',
    roles: ['checker'],
    bank: banks.Barclays,
  },
  {
    username: 'Ukef-maker-1',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'Six',
    email: 'six@email.com',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: banks.UKEF,
  },
  {
    username: 'super-user',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'Seven',
    email: 'seven@email.com',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: banks.any,
  },
  {
    username: 'data-admin',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'Eight',
    email: 'eight@email.com',
    timezone: 'Europe/London',
    roles: ['data-admin'],
  },
  {
    username: 'Barclays-maker-checker-1',
    password: 'P@ssword1234',
    firstname: 'Mister',
    surname: 'Nine',
    email: 'nine@email.com',
    timezone: 'Europe/London',
    roles: ['maker', 'checker'],
    bank: banks.Barclays,
  },

  {
    username: 'maker-tfm',
    password: 'AbC!2345',
    firstname: 'First',
    surname: 'Last',
    email: 'maker@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['maker'],
    bank: banks.UKEF,
  },
  {
    username: 'checker-tfm',
    password: 'AbC!2345',
    firstname: 'Mister',
    surname: 'Checker',
    email: 'checker@ukexportfinance.gov.uk',
    timezone: 'Europe/London',
    roles: ['checker'],
    bank: banks.UKEF,
  },
];

let notYetInitialised = true;
const loadedUsers = [];

const finder = () => {
  let users = [...loadedUsers];

  const fluidBuilder = {
    all: () => users,
    one: () => users[0],
    withRole: (role) => {
      users = users.filter((user) => user.roles.includes(role));
      return fluidBuilder;
    },
    withMultipleRoles: (role1, role2) => {
      users = users.filter((user) => user.roles.includes(role1) && user.roles.includes(role2));
      return fluidBuilder;
    },
    withoutRole: (role) => {
      users = users.filter((user) => !user.roles.includes(role));
      return fluidBuilder;
    },
    withoutAnyRoles: () => {
      users = users.filter((user) => user.roles.length === 0);
      return fluidBuilder;
    },
    withBankName: (bankName) => {
      users = users.filter((user) => user.bank && user.bank.name === bankName);
      return fluidBuilder;
    },
    superuser: () => {
      users = users.filter((user) => user.bank && user.bank.id === '*');
      return fluidBuilder;
    },
  };

  return fluidBuilder;
};

const apiTestUser = {
  username: 'api-test-user',
  password: 'P@ssword1234',
  firstname: 'API',
  surname: 'Test User',
  email: 'api-tester@example.com',
  timezone: 'Europe/London',
  roles: ['maker'],
  bank: banks.any,
};

const setUpApiTestUser = async (as) => {
  const { salt, hash } = genPassword(apiTestUser.password);

  const userToCreate = {
    'user-status': 'active',
    salt,
    hash,
    ...apiTestUser,
  };

  userToCreate.password = '';
  userToCreate.passwordConfirm = '';

  const collection = await db.getCollection('users');
  await collection.insertOne(userToCreate);

  const apiTestUserLoginResponse = await as().post({ username: apiTestUser.username, password: apiTestUser.password })
    .to('/v1/login');
  return { token: apiTestUserLoginResponse.body.token, ...userToCreate };
};

const initialise = async (app) => {
  if (notYetInitialised) {
    await wipeDB.wipe(['users']);

    const { as } = api(app);

    const loggedInApiTestUser = await setUpApiTestUser(as);

    for (const testUser of testUsers) {
      await as(loggedInApiTestUser).post(testUser).to('/v1/users/');
      const { body } = await as().post({ username: testUser.username, password: testUser.password }).to('/v1/login');
      const { token } = body;
      loadedUsers.push({
        ...testUser,
        _id: body.user._id,
        token,
      });
    }

    notYetInitialised = false;
  }

  return finder;
};

module.exports = {
  initialise,
  setUpApiTestUser,
};
