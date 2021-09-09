import relative from '../../../relativeURL';
import portalPages from '../../../../../../portal/cypress/integration/pages';

import MOCK_USERS from '../../../../../../portal/cypress/fixtures/mockUsers';
import MOCK_MIA_DEAL_READY_TO_SUBMIT from '../test-data/MIA-deal/dealReadyToSubmit';

const MAKER = MOCK_USERS.find((user) => (user.roles.includes('maker') && user.username === 'BANK1_MAKER1'));
const CHECKER = MOCK_USERS.find((user) => (user.roles.includes('checker') && user.username === 'BANK1_CHECKER1'));

context('Portal to TFM deal submission', () => {
  let deal;
  let dealId;
  const dealFacilities = [];

  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      console.log(err.stack);
      return false;
    });
  });

  before(() => {
    cy.insertManyDeals([
      MOCK_MIA_DEAL_READY_TO_SUBMIT(),
    ], MAKER)
      .then((insertedDeals) => {
        deal = insertedDeals[0];
        dealId = insertedDeals[0]._id;

        const { mockFacilities } = deal;

        cy.createFacilities(dealId, mockFacilities, MAKER).then((createdFacilities) => {
          dealFacilities.push(...createdFacilities);
        });
      });
  });

  it('Portal MIA deal is submitted to UKEF, TFM acknowledges the submission and updates the portal deal status from `Submitted` to `Acknowledged by UKEF`', () => {
    //---------------------------------------------------------------
    // portal maker submits deal for review
    //---------------------------------------------------------------
    cy.login(MAKER);
    portalPages.contract.visit(deal);
    portalPages.contract.proceedToReview().click();
    cy.url().should('eq', relative(`/contract/${dealId}/ready-for-review`));

    portalPages.contractReadyForReview.comments().type('go');
    portalPages.contractReadyForReview.readyForCheckersApproval().click();


    //---------------------------------------------------------------
    // portal checker submits deal to ukef
    //---------------------------------------------------------------
    cy.login(CHECKER);
    portalPages.contract.visit(deal);

    portalPages.contract.status().invoke('text').then((text) => {
      expect(text.trim()).to.equal('Ready for Checker\'s approval');
    });

    portalPages.contract.proceedToSubmit().click();

    portalPages.contractConfirmSubmission.confirmSubmit().check();
    portalPages.contractConfirmSubmission.acceptAndSubmit().click();

    // expect to land on the /dashboard page with a success message
    cy.url().should('include', '/dashboard');


    //---------------------------------------------------------------
    // portal deal status should be updated
    //---------------------------------------------------------------
    portalPages.contract.visit(deal);

    portalPages.contract.status().invoke('text').then((text) => {
      expect(text.trim()).to.equal('In progress by UKEF');
    });

    portalPages.contract.previousStatus().invoke('text').then((text) => {
      expect(text.trim()).to.equal('Submitted');
    });
  });
});
