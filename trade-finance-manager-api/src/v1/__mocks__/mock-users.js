const { TEAM_IDS } = require('@ukef/dtfs2-common');

const MOCK_USERS = [
  {
    _id: '6051d94564494924d38ce67c',
    username: 'BUSINESS_SUPPORT_USER_1',
    password: 'AbC!2345',
    email: 'test@testing.com',
    teams: [TEAM_IDS.BUSINESS_SUPPORT],
    timezone: 'Europe/London',
    firstName: 'John',
    lastName: 'Davies',
  },
  {
    _id: '6051d94564494924d38ce123',
    username: 'myUsername',
    password: 'AbC!2345',
    email: 'test@testing.com',
    teams: [TEAM_IDS.BUSINESS_SUPPORT],
    timezone: 'Europe/London',
    firstName: 'Sarah',
    lastName: 'Walker',
  },
  {
    _id: '6051d94564494924d38ce124',
    username: 'myUsername',
    password: 'AbC!2345',
    email: 'test@testing.com',
    teams: [TEAM_IDS.UNDERWRITING_SUPPORT],
    timezone: 'Europe/London',
    firstName: 'Ben',
    lastName: 'Wilson',
  },
  {
    _id: '6051d94564494924d38ce125',
    username: 'UNDERWRITER_MANAGER_1',
    password: 'AbC!2345',
    email: 'test@testing.com',
    teams: [TEAM_IDS.UNDERWRITER_MANAGERS],
    timezone: 'Europe/London',
    firstName: 'Benjamin',
    lastName: 'Jones',
  },
  {
    _id: '6051d94564494924d38ce126',
    username: 'UNDERWRITER_1',
    password: 'AbC!2345',
    email: 'test@testing.com',
    teams: [TEAM_IDS.UNDERWRITERS],
    timezone: 'Europe/London',
    firstName: 'Olivia',
    lastName: 'Williams',
  },
  {
    _id: '6051d94564494924d38ce127',
    username: 'RISK_MANAGER_1',
    password: 'AbC!2345',
    email: 'test@testing.com',
    teams: [TEAM_IDS.RISK_MANAGERS],
    timezone: 'Europe/London',
    firstName: 'Steven',
    lastName: 'Robinson',
  },
  {
    username: 'PIM_USER_1',
    password: 'AbC!2345',
    email: 'test@testing.com',
    teams: [TEAM_IDS.PIM],
    timezone: 'Europe/London',
    firstName: 'Piper',
    lastName: 'Matthews',
  },
  {
    username: 'PDC_READ_USER',
    password: 'AbC!2345',
    email: 'test@testing.com',
    teams: [TEAM_IDS.PDC_READ],
    timezone: 'Europe/London',
    firstName: 'Peter',
    lastName: 'Reading',
  },
  {
    username: 'PDC_RECONCILE_USER',
    password: 'AbC!2345',
    email: 'test@testing.com',
    teams: [TEAM_IDS.PDC_RECONCILE],
    timezone: 'Europe/London',
    firstName: 'Colin',
    lastName: 'Bellamy',
  },
];

module.exports = MOCK_USERS;
