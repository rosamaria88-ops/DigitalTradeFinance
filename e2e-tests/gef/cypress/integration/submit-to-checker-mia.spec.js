import relative from './relativeURL';
import automaticCover from './pages/automatic-cover';
import manualInclusion from './pages/manual-inclusion-questionnaire';
import securityDetails from './pages/security-details';
import applicationDetails from './pages/application-details';
import applicationSubmission from './pages/application-submission';
import CREDENTIALS from '../fixtures/credentials.json';

const { format } = require('date-fns');

let applicationId;

context('Submit to UKEF as MIA', () => {
  before(() => {
    cy.reinsertMocks();
    cy.apiLogin(CREDENTIALS.CHECKER)
      .then((token) => token)
      .then((token) => {
        cy.apiFetchAllApplications(token);
      })
      .then(({ body }) => {
        applicationId = body.items[2]._id;
        cy.login(CREDENTIALS.MAKER);
      });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('Submit to UKEF', () => {
    it('application banner displays the submission date, pending UKEF deal ID and updated status', () => {
      cy.visit(relative(`/gef/application-details/${applicationId}`));

      // Make the deal an Manual Inclusion Application
      applicationDetails.automaticCoverDetailsLink().click();
      automaticCover.automaticCoverTerm().each(($el, index) => {
        $el.find('[data-cy="automatic-cover-true"]').trigger('click');
        if (index === 7) {
          $el.find('[data-cy="automatic-cover-false"]').trigger('click');
        }
      });
      automaticCover.continueButton().click();
      manualInclusion.continueButton().click();

      cy.uploadFile('test.pdf', `${manualInclusion.url(applicationId)}/upload`);
      manualInclusion.uploadSuccess('test.pdf');
      manualInclusion.continueButton().click();
      cy.visit(relative(`/gef/application-details/${applicationId}`));

      applicationDetails.bannerStatus().contains('Draft');

      const todayFormatted = format(new Date(), 'dd MMM yyyy');
      applicationDetails.bannerDateCreated().contains(todayFormatted);

      securityDetails.visit(applicationId);
      securityDetails.exporterSecurity().type('test');
      securityDetails.applicationSecurity().type('test');
      securityDetails.continueButton().click();
      securityDetails.visit(applicationId);
      securityDetails.cancelButton().click();

      applicationDetails.submitButton().click();
    });

    it('displays correct MIA checker submission message', () => {
      applicationSubmission.submitButton().click();
      applicationSubmission.confirmationPanelTitle().contains('Manual Inclusion Application submitted for checking at your bank');
    });
  });
});
