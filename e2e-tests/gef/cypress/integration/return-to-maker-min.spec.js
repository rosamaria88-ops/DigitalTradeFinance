import relative from './relativeURL';
import returnToMaker from './pages/return-to-maker';
import CREDENTIALS from '../fixtures/credentials.json';
import applicationDetails from './pages/application-details';
import automaticCover from './pages/automatic-cover';
import manualInclusion from './pages/manual-inclusion-questionnaire';
import securityDetails from './pages/security-details';
import applicationSubmission from './pages/application-submission';
import applicationPreview from './pages/application-preview';

let applicationId;

context('Return to Maker as MIN', () => {
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

  describe('creates and submits MIN', () => {
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('connect.sid');
      cy.login(CREDENTIALS.MAKER);
      cy.visit(relative(`/gef/application-details/${applicationId}`));
    });

    it('submits as MIN', () => {
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

      cy.uploadFile('upload-file-valid.doc', `${manualInclusion.url(applicationId)}/upload`);
      manualInclusion.uploadSuccess('upload-file-valid.doc');
      manualInclusion.continueButton().click();
      securityDetails.visit(applicationId);
      securityDetails.exporterSecurity().type('test');
      securityDetails.applicationSecurity().type('test2');
      securityDetails.continueButton().click();
      securityDetails.visit(applicationId);
      securityDetails.cancelButton().click();

      applicationDetails.submitButton().click();

      applicationSubmission.submitButton().click();
      applicationSubmission.confirmationPanelTitle();
    });
  });

  describe('return to maker as checker', () => {
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('connect.sid');
      cy.login(CREDENTIALS.CHECKER);
      cy.visit(relative(`/gef/application-details/${applicationId}`));
    });

    it('returns to maker', () => {
      applicationPreview.returnButton().click();
      returnToMaker.comment().type('comment1');
      returnToMaker.submitButton().click();
      cy.location('pathname').should('contain', 'dashboard');
    });
  });

  describe('return to maker', () => {
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('connect.sid');
      cy.login(CREDENTIALS.MAKER);
      cy.visit(relative(`/gef/application-details/${applicationId}`));
    });

    it('comments are showing', () => {
      applicationPreview.task().contains('check manual inclusion application');
      applicationPreview.comments().contains('comment1');
    });

    it('Status shows correct status', () => {
      applicationPreview.status().contains('Further Maker\'s input required');
    });

    it('can change security details commments', () => {
      securityDetails.visit(applicationId);
      securityDetails.exporterSecurity().type(' test3');
      securityDetails.applicationSecurity().type('test4');
    });

    it('can submit back to checker', () => {
      applicationDetails.submitButton().click();
      applicationSubmission.submitButton().click();
      applicationSubmission.confirmationPanelTitle().contains('Manual Inclusion Application submitted for checking at your bank');
      cy.visit(relative(`/gef/application-details/${applicationId}`));
      applicationPreview.status().contains('Ready for Checker\'s approval');
    });
  });
});
