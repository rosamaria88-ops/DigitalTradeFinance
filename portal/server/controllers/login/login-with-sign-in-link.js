const { isValidUserId, isValidSignInToken } = require('../../validation/validate-ids');
const api = require('../../api');
const CONSTANTS = require('../../constants');
const { getUserRoles } = require('../../helpers');

const updateSessionAfterLogin = ({
  req,
  newUserToken,
  loginStatus,
  user,
}) => {
  req.session.userToken = newUserToken;
  req.session.user = user;
  req.session.loginStatus = loginStatus;
  req.session.dashboardFilters = CONSTANTS.DASHBOARD.DEFAULT_FILTERS;
  delete req.session.numberOfSendSignInLinkAttemptsRemaining;
  delete req.session.userEmail;
};

/**
 * Gets the redirect url for the user after they have successfully logged in
 * @param {object} user - The user object
 * @returns {'dashboard/deals/0' | 'utilisation-report-upload'}
 */
const getUserRedirectUrl = (user) => {
  const { isMaker, isChecker, isAdmin, isPaymentReportOfficer } = getUserRoles(user.roles);

  if (isMaker || isChecker || isAdmin) {
    return '/dashboard/deals/0';
  }
  if (isPaymentReportOfficer) {
    return '/utilisation-report-upload';
  }
  return '/dashboard/deals/0';
};

module.exports.loginWithSignInLink = async (req, res) => {
  try {
    const { query: { t: signInToken, u: userId } } = req;

    if (!isValidUserId(userId)) {
      console.error('Error validating sign in link: invalid userId %s', userId);
      return res.status(400).render('_partials/problem-with-service.njk');
    }

    if (!isValidSignInToken(signInToken)) {
      console.error('Error validating sign in token: invalid signInToken %s', signInToken);
      return res.status(400).render('_partials/problem-with-service.njk');
    }

    const loginResponse = await api.loginWithSignInLink({ signInToken, userId });
    const { token: newUserToken, loginStatus, user } = loginResponse;

    updateSessionAfterLogin({
      req,
      newUserToken,
      loginStatus,
      user,
    });

    const redirectUrl = getUserRedirectUrl(user);
    return res.render('login/post-login-redirect.njk', {
      redirectUrl,
    });
  } catch (e) {
    console.error(`Error validating sign in link: ${e}`);

    if (e.response?.status === 403) {
      return res.redirect('/login/sign-in-link-expired');
    }

    return res.status(500).render('_partials/problem-with-service.njk');
  }
};
