import relative from '../../relativeURL';
import MOCK_DEAL_AIN from '../../../fixtures/deal-AIN';
import { ADMIN, BANK1_MAKER1, PIM_USER_1 } from '../../../../../e2e-fixtures';
import caseDealPage from '../../pages/caseDealPage';
import { backLink, cancelLink, continueButton, errorSummary } from '../../partials';
import effectiveFromDatePage from '../../pages/deal-cancellation/effective-from-date';
import { today, twelveMonthsOneDay, twelveMonthsOneDayAgo } from '../../../../../e2e-fixtures/dateConstants';

context('Deal cancellation - effective from date', () => {
  let dealId;
  const dealFacilities = [];

  before(() => {
    cy.insertOneDeal(MOCK_DEAL_AIN, BANK1_MAKER1).then((insertedDeal) => {
      dealId = insertedDeal._id;

      const { dealType, mockFacilities } = MOCK_DEAL_AIN;

      cy.createFacilities(dealId, [mockFacilities[0]], BANK1_MAKER1).then((createdFacilities) => {
        dealFacilities.push(...createdFacilities);
      });

      cy.submitDeal(dealId, dealType, PIM_USER_1);
    });
  });

  after(() => {
    cy.deleteDeals(dealId, ADMIN);
    dealFacilities.forEach((facility) => {
      cy.deleteFacility(facility._id, BANK1_MAKER1);
    });
  });

  describe('when logged in as a PIM user', () => {
    beforeEach(() => {
      cy.login(PIM_USER_1);
      cy.visit(relative(`/case/${dealId}/deal`));

      caseDealPage.cancelDealButton().click();

      cy.url().should('eq', relative(`/case/${dealId}/cancellation/reason`));
      cy.clickContinueButton();

      cy.url().should('eq', relative(`/case/${dealId}/cancellation/bank-request-date`));

      cy.completeDateFormFields({ idPrefix: 'bank-request-date' });

      cy.clickContinueButton();
    });

    it('should render page correctly', () => {
      cy.url().should('eq', relative(`/case/${dealId}/cancellation/effective-from-date`));

      cancelLink();
      continueButton();
      backLink();
      effectiveFromDatePage.effectiveFromDateDay();
      effectiveFromDatePage.effectiveFromDateMonth();
      effectiveFromDatePage.effectiveFromDateYear();
    });

    it('should validate submitting a date more than 12 months in the future', () => {
      cy.completeDateFormFields({ idPrefix: 'effective-from-date', date: twelveMonthsOneDay.date });

      cy.clickContinueButton();
      errorSummary().contains('The effective date cannot exceed 12 months in the future from the submission date');
    });

    it('should validate submitting a date more than 12 months in the past', () => {
      cy.completeDateFormFields({ idPrefix: 'effective-from-date', date: twelveMonthsOneDayAgo.date });

      cy.clickContinueButton();
      errorSummary().contains('The effective date cannot exceed 12 months in the past from the submission date');
    });

    it('back link should take you to the bank request date page', () => {
      cy.clickBackLink();

      cy.url().should('eq', relative(`/case/${dealId}/cancellation/bank-request-date`));
    });

    it('continue button should take you to the check answers page', () => {
      cy.completeDateFormFields({ idPrefix: 'effective-from-date' });

      cy.clickContinueButton();

      cy.url().should('eq', relative(`/case/${dealId}/cancellation/check-details`));
    });

    it('cancel link should take you to confirm cancellation page', () => {
      cy.clickCancelLink();

      cy.url().should('eq', relative(`/case/${dealId}/cancellation/cancel`));
    });

    it('returning to the page should display saved data', () => {
      cy.completeDateFormFields({ idPrefix: 'effective-from-date' });

      cy.clickContinueButton();
      cy.visit(relative(`/case/${dealId}/cancellation/effective-from-date`));

      effectiveFromDatePage.effectiveFromDateDay().should('have.value', today.day);
      effectiveFromDatePage.effectiveFromDateMonth().should('have.value', today.month);
      effectiveFromDatePage.effectiveFromDateYear().should('have.value', today.year);
    });
  });
});
