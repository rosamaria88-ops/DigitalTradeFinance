import relative from '../../../relativeURL';
import portalPages from '../../../../../../portal/cypress/integration/pages';
import tfmPages from '../../../../../../trade-finance-manager/cypress/integration/pages';
import tfmPartials from '../../../../../../trade-finance-manager/cypress/integration/partials';

import MOCK_USERS from '../../../../../../portal/cypress/fixtures/mockUsers';
import MOCK_MIA_DEAL_READY_TO_SUBMIT from '../test-data/MIA-deal/dealReadyToSubmit';

const mockDeal = MOCK_MIA_DEAL_READY_TO_SUBMIT();

const MAKER_LOGIN = MOCK_USERS.find((user) => (user.roles.includes('maker') && user.username === 'BANK1_MAKER1'));
const CHECKER_LOGIN = MOCK_USERS.find((user) => (user.roles.includes('checker') && user.username === 'BANK1_CHECKER1'));

context('Portal to TFM deal submission', () => {
  let deal;
  let dealId;
  const dealFacilities = [];

  before(() => {
    cy.insertManyDeals([
      mockDeal,
    ], MAKER_LOGIN)
      .then((insertedDeals) => {
        [deal] = insertedDeals;
        dealId = deal._id;

        const { mockFacilities } = deal;

        cy.createFacilities(dealId, mockFacilities, MAKER_LOGIN).then((createdFacilities) => {
          dealFacilities.push(...createdFacilities);
        });
      });
  });

  it('Portal MIA deal is submitted to UKEF, `Application` deal stage and product is added to the deal in TFM. Exporter and submission type should display', () => {
    //---------------------------------------------------------------
    // portal maker submits deal for review
    //---------------------------------------------------------------
    cy.login(MAKER_LOGIN);
    portalPages.contract.visit(deal);
    portalPages.contract.proceedToReview().click();
    cy.url().should('eq', relative(`/contract/${dealId}/ready-for-review`));

    portalPages.contractReadyForReview.comments().type('go');
    portalPages.contractReadyForReview.readyForCheckersApproval().click();


    //---------------------------------------------------------------
    // portal checker submits deal to ukef
    //---------------------------------------------------------------
    cy.login(CHECKER_LOGIN);
    portalPages.contract.visit(deal);
    portalPages.contract.proceedToSubmit().click();

    portalPages.contractConfirmSubmission.confirmSubmit().check();
    portalPages.contractConfirmSubmission.acceptAndSubmit().click(deal);

    // expect to land on the /dashboard page with a success message
    cy.url().should('include', '/dashboard');


    //---------------------------------------------------------------
    // user login to TFM
    //---------------------------------------------------------------
    // Cypress.config('tfmUrl') returns incorrect url...
    const tfmRootUrl = 'http://localhost:5003';

    cy.forceVisit(tfmRootUrl);

    tfmPages.landingPage.email().type('BUSINESS_SUPPORT_USER_1');
    tfmPages.landingPage.submitButton().click();


    //---------------------------------------------------------------
    // exporter and submission type should be displayed in the deals table
    //---------------------------------------------------------------
    cy.url().should('include', '/deals');
    const row = tfmPages.dealsPage.dealsTable.row(mockDeal._id);

    row.submissionType().invoke('text').then((text) => {
      expect(text.trim()).to.contain(mockDeal.submissionType);
    });

    row.exporterName().invoke('text').then((text) => {
      expect(text.trim()).to.contain(mockDeal.exporter.companyName);
    });


    //---------------------------------------------------------------
    // user vists the case/deal page
    //---------------------------------------------------------------
    const tfmCaseDealPage = `${tfmRootUrl}/case/${dealId}/deal`;
    cy.forceVisit(tfmCaseDealPage);


    //---------------------------------------------------------------
    // deal stage and product type should be  populated in the Case Summary
    //---------------------------------------------------------------
    tfmPartials.caseSummary.ukefDealStage().invoke('text').then((text) => {
      expect(text.trim()).to.contain('Application');
    });

    tfmPartials.caseSummary.ukefProduct().invoke('text').then((text) => {
      expect(text.trim()).to.contain('BSS & EWCS');
    });

    //---------------------------------------------------------------
    // submission type and exporter should be displayed in the Case Summary
    //---------------------------------------------------------------
    tfmPartials.caseSummary.dealSubmissionType().invoke('text').then((text) => {
      expect(text.trim()).to.contain(mockDeal.submissionType);
    });

    tfmPartials.caseSummary.exporterName().invoke('text').then((text) => {
      expect(text.trim()).to.contain(mockDeal.exporter.companyName);
    });

    // todo test in AIN spec as well
  });
});
