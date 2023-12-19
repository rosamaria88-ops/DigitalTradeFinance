const { signInLink } = require('../../../../portal/cypress/e2e/pages');
const relative = require('../../e2e/relativeURL');

module.exports = (opts) => {
  const { username, password } = opts;
  cy.resetPortalUserStatusAndNumberOfSignInLinks(username);
  cy.enterUsernameAndPassword({ username, password });

  cy.url().should('eq', relative('/login/check-your-email'));

  const signInToken = '6569ca7a6fd828f925e07c6e';
  cy.overridePortalUserSignInTokenByUsername({ username, newSignInToken: signInToken });
  cy.getUserByUsername(username).then(({ _id }) => {
    signInLink.visit({ token: signInToken, userId: _id });
  });

  cy.url().should('eq', relative('/dashboard/deals/0'));
};
