const relative = require('../../../relativeURL');
const MOCK_USERS = require('../../../../fixtures/users');
const CONSTANTS = require('../../../../fixtures/constants');
const { dashboardDeals } = require('../../../pages');
const {
  BSS_DEAL_MIA,
  GEF_DEAL_DRAFT,
} = require('./fixtures');

const { BANK1_MAKER1, ADMIN } = MOCK_USERS;

context('Dashboard Deals filters - remove all filters', () => {
  const ALL_DEALS = [];

  before(() => {
    cy.deleteGefApplications(ADMIN);
    cy.deleteDeals(ADMIN);

    cy.insertOneDeal(BSS_DEAL_MIA, BANK1_MAKER1).then((deal) => {
      ALL_DEALS.push(deal);
    });

    cy.insertOneDeal(BSS_DEAL_MIA, BANK1_MAKER1).then((deal) => {
      ALL_DEALS.push(deal);
    });

    cy.insertOneGefApplication(GEF_DEAL_DRAFT, BANK1_MAKER1).then((deal) => {
      ALL_DEALS.push(deal);
    });
  });

  before(() => {
    cy.login(BANK1_MAKER1);
    dashboardDeals.visit();
    cy.url().should('eq', relative('/dashboard/deals/0'));
  });

  it('removes all applied filters by clicking `clear filters` button', () => {
    // toggle to show filters (hidden by default)
    dashboardDeals.filters.showHideButton().click();

    // apply filter 1
    dashboardDeals.filters.panel.form.status.draft.checkbox().click();

    // apply filter 2
    dashboardDeals.filters.panel.form.submissionType.MIA.checkbox().click();

    // submit filters
    dashboardDeals.filters.panel.form.applyFiltersButton().click();

    cy.url().should('eq', relative('/dashboard/deals/0'));

    // toggle to show filters (hidden by default)
    dashboardDeals.filters.showHideButton().click();

    // check filters are applied
    dashboardDeals.filters.panel.form.status.draft.checkbox().should('be.checked');
    dashboardDeals.filters.panel.form.submissionType.MIA.checkbox().should('be.checked');

    // click `clear all` button
    dashboardDeals.filters.panel.selectedFilters.clearAllLink().should('be.visible');
    dashboardDeals.filters.panel.selectedFilters.clearAllLink().click();

    // should be redirected
    cy.url().should('eq', relative('/dashboard/deals/0'));

    // toggle to show filters (hidden by default)
    dashboardDeals.filters.showHideButton().click();
    dashboardDeals.filters.panel.container().should('be.visible');

    // should have empty panel applied filters
    dashboardDeals.filters.panel.selectedFilters.container().should('not.exist');
    dashboardDeals.filters.panel.selectedFilters.list().should('not.exist');

    // should have empty main container applied filters
    dashboardDeals.filters.mainContainer.selectedFilters.container().should('not.exist');

    // checkbox should be NOT be checked
    dashboardDeals.filters.panel.form.status.draft.checkbox().should('not.be.checked');
    dashboardDeals.filters.panel.form.submissionType.MIA.checkbox().should('not.be.checked');

    // should render all deals
    dashboardDeals.rows().should('have.length', ALL_DEALS.length);
  });
});
