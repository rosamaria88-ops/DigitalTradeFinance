const { UKEF_OPERATIONS } = require('./roles');

const userHasRole = ({
  user,
  targetRole,
}) => {
  const { roles: userRoles } = user;
  return userRoles.includes(targetRole);
};

/**
 * Returns true if the user has one of allowedNonAdminRoles or is an admin.
 * @param {{ user: { roles: string[] }, allowedNonAdminRoles: string[] }}
 * @returns {boolean}
 */
const userHasSufficientRole = ({
  user,
  allowedNonAdminRoles,
}) => {
  if (userHasRole({ user, targetRole: UKEF_OPERATIONS })) {
    return true;
  }
  return allowedNonAdminRoles.some((allowedRole) => userHasRole({ user, targetRole: allowedRole }));
};

module.exports = {
  userHasSufficientRole,
};
