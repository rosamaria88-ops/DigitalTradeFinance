const ROLES = require('../server/constants/roles');

const getRolesListExcluding = (rolesToExclude) => {
  const roleValues = Object.values(ROLES);
  return roleValues.filter((role) => rolesToExclude.includes(role) === false);
};

const COMMON_ROLE_COMBINATIONS = {
  NON_MAKER_ROLES: getRolesListExcluding([ROLES.MAKER]),
  NON_CHECKER_ROLES: getRolesListExcluding([ROLES.CHECKER]),
  NON_MAKER_OR_CHECKER_ROLES: getRolesListExcluding([ROLES.MAKER, ROLES.CHECKER]),
  NON_MAKER_OR_CHECKER_OR_ADMIN_ROLES: getRolesListExcluding([ROLES.MAKER, ROLES.CHECKER, ROLES.ADMIN]),
};

module.exports = COMMON_ROLE_COMBINATIONS;
