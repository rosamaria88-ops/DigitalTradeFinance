const { dashboard } = require('../../../pages');
const relative = require('../../../relativeURL');

const user = { username: 'MAKER', password: 'MAKER' };
const admin = { username: 'ADMIN', password: 'ADMIN' };

context('Admin dashboard', () => {
  let deal;
  const dummyDeal = {
    details: {
      bankSupplyContractID: 'abc/1/def',
      bankSupplyContractName: 'Tibettan submarine acquisition scheme',
    },
  };

  beforeEach(() => {
    // [dw] at time of writing, the portal was throwing exceptions; this stops cypress caring
    cy.on('uncaught:exception', (err, runnable) => {
      console.log(err.stack);
      return false;
    });

    // clear down our test users old deals, and insert a new one - updating our deal object
    cy.deleteDeals(user);
    cy.insertOneDeal(dummyDeal, user)
      .then((insertedDeal) => deal = insertedDeal);
  });

  it('Bank column should appear for admin user', () => {
    // login and go to dashboard
    cy.login(admin);
    dashboard.visit();

    // get the row that corresponds to our deal
    const row = dashboard.row(deal);

    // check the fields we understand
    expect(dashboard.tableHeaders.bank().should('exist'));
    expect(row.bank().should('exist'));
  });

  it("Dashboard screen should pass Lighthouse audit", function () {
    // login and go to dashboard
    cy.login(admin);
    dashboard.visit();
    
    cy.lighthouse({
      performance: 85,
      accessibility: 100,
      "best-practices": 85,
      seo: 85,
      pwa: 100,
    });
    cy.pa11y();
  });

});
