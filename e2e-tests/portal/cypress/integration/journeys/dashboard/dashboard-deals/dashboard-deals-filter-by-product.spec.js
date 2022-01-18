const relative = require('../../../relativeURL');
const mockUsers = require('../../../../fixtures/mockUsers');
const CONSTANTS = require('../../../../fixtures/constants');
const { dashboard } = require('../../../pages');
const {
  BSS_DEAL_DRAFT,
  GEF_DEAL_DRAFT,
} = require('./fixtures');

const BANK1_MAKER1 = mockUsers.find((user) => (user.roles.includes('maker')));

context('Dashboard Deals filters - filter by dealType/product', () => {
  const ALL_DEALS = [];

  before(() => {
    cy.deleteGefApplications(BANK1_MAKER1);
    cy.deleteDeals(BANK1_MAKER1);

    cy.insertOneDeal(BSS_DEAL_DRAFT, BANK1_MAKER1).then((deal) => {
      ALL_DEALS.push(deal);
    });

    cy.insertOneGefApplication(GEF_DEAL_DRAFT, BANK1_MAKER1).then((deal) => {
      ALL_DEALS.push(deal);
    });
  });

  describe('BSS', () => {
    before(() => {
      cy.login(BANK1_MAKER1);
      dashboard.visit();
      cy.url().should('eq', relative('/dashboard/deals/0'));
    });

    it('submits the filter and redirects to the dashboard', () => {
      // toggle to show filters (hidden by default)
      dashboard.filters.showHideButton().click();

      // apply filter
      dashboard.filters.panel.form.dealType.bssEwcs.checkbox().click();
      dashboard.filters.panel.form.applyFiltersButton().click();

      cy.url().should('eq', relative('/dashboard/deals/0'));
    });

    it('renders checked checkbox', () => {
      // toggle to show filters (hidden by default)
      dashboard.filters.showHideButton().click();

      dashboard.filters.panel.form.dealType.bssEwcs.checkbox().should('be.checked');
    });

    it('renders the applied filter in the `applied filters` section', () => {
      dashboard.filters.panel.selectedFilters.container().should('be.visible');
      dashboard.filters.panel.selectedFilters.list().should('be.visible');

      const firstAppliedFilterHeading = dashboard.filters.panel.selectedFilters.heading().first();

      firstAppliedFilterHeading.should('be.visible');
      firstAppliedFilterHeading.should('have.text', 'Product');

      const firstAppliedFilter = dashboard.filters.panel.selectedFilters.listItem().first();

      firstAppliedFilter.should('be.visible');

      const expectedText = `Remove this filter ${CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS}`;
      firstAppliedFilter.should('have.text', expectedText);
    });

    it('renders only BSS deals', () => {
      const ALL_BSS_DEALS = ALL_DEALS.filter(({ dealType }) => dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS);
      dashboard.rows().should('have.length', ALL_BSS_DEALS.length);

      const firstBssDeal = ALL_BSS_DEALS[0];

      dashboard.row.product(firstBssDeal._id).should('have.text', CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS);
    });
  });

  describe('GEF', () => {
    before(() => {
      cy.login(BANK1_MAKER1);
      dashboard.visit();
      cy.url().should('eq', relative('/dashboard/deals/0'));
    });

    it('submits the filter and redirects to the dashboard', () => {
      // toggle to show filters (hidden by default)
      dashboard.filters.showHideButton().click();

      // apply filter
      dashboard.filters.panel.form.dealType.gef.checkbox().click();
      dashboard.filters.panel.form.applyFiltersButton().click();

      cy.url().should('eq', relative('/dashboard/deals/0'));
    });

    it('renders checked checkbox', () => {
      // toggle to show filters (hidden by default)
      dashboard.filters.showHideButton().click();

      dashboard.filters.panel.form.dealType.gef.checkbox().should('be.checked');
    });

    it('renders the applied filter in the `applied filters` section', () => {
      dashboard.filters.panel.selectedFilters.container().should('be.visible');
      dashboard.filters.panel.selectedFilters.list().should('be.visible');

      const firstAppliedFilterHeading = dashboard.filters.panel.selectedFilters.heading().first();

      firstAppliedFilterHeading.should('be.visible');
      firstAppliedFilterHeading.should('have.text', 'Product');

      const firstAppliedFilter = dashboard.filters.panel.selectedFilters.listItem().first();

      firstAppliedFilter.should('be.visible');

      const expectedText = `Remove this filter ${CONSTANTS.DEALS.DEAL_TYPE.GEF}`;
      firstAppliedFilter.should('have.text', expectedText);
    });

    it('renders the applied filter in the `main container selected filters` section', () => {
      dashboard.filters.mainContainer.selectedFilters.productGEF().should('be.visible');

      const expectedText = `Remove this filter ${CONSTANTS.DEALS.DEAL_TYPE.GEF}`;
      dashboard.filters.mainContainer.selectedFilters.productGEF().contains(expectedText);
    });

    it('renders only GEF deals', () => {
      const ALL_GEF_DEALS = ALL_DEALS.filter(({ dealType }) => dealType === CONSTANTS.DEALS.DEAL_TYPE.GEF);
      dashboard.rows().should('have.length', ALL_GEF_DEALS.length);

      const firstGefDeal = ALL_GEF_DEALS[0];

      dashboard.row.product(firstGefDeal._id).should('have.text', CONSTANTS.DEALS.DEAL_TYPE.GEF);
    });
  });
});