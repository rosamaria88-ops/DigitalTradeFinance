const MOCK_USERS = require('../../utils/mock-data-loader/portal/users');
const { PORTAL_USER_ROLES } = require('./constants.fixture');

const {
  BANK1_MAKER1,
  BANK1_MAKER2,
  BANK2_MAKER2,
  BANK3_GEF_MAKER1,
  BANK1_CHECKER1,
  BANK1_READ_ONLY1,
  ADMIN,
  READ_ONLY_ALL_BANKS,
  BANK1_MAKER_CHECKER1,
} = MOCK_USERS;

const USER_WITH_INJECTION = {
  username: '{ "$gt": "" }',
  email: '{ "$gt": "" }',
  password: 'TestPassword123!',
  firstname: 'test',
  surname: 'injection',
  bank: 'HSBC',
  roles: [PORTAL_USER_ROLES.MAKER],
};

module.exports = {
  BANK1_MAKER1,
  BANK1_MAKER2,
  BANK2_MAKER2,
  BANK3_GEF_MAKER1,
  BANK1_CHECKER1,
  BANK1_READ_ONLY1,
  ADMIN,
  USER_WITH_INJECTION,
  READ_ONLY_ALL_BANKS,
  BANK1_MAKER_CHECKER1,
};
