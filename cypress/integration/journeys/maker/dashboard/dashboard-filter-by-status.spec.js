const {dashboard} = require('../../../pages');
const relative = require('../../../relativeURL');

const maker1 = {username: 'MAKER', password: 'MAKER'};

// test data we want to set up + work with..
const twentyOneDeals = require('./twentyOneDeals');

context('Dashboard Deals filter by status', () => {

  beforeEach( () => {
    // [dw] at time of writing, the portal was throwing exceptions; this stops cypress caring
    cy.on('uncaught:exception', (err, runnable) => {
      console.log(err.stack);
      return false;
    });
  });

  before( () => {
    cy.deleteDeals(maker1);
    cy.insertManyDeals(twentyOneDeals, { ...maker1 });
  });

  it('The Dashboard: status=all -> all deals displayed', () => {
    cy.allDeals().then( (deals) => {
      cy.login({...maker1});
      dashboard.visit();

      dashboard.showFilters().click();
      dashboard.filterByStatus().select('all');
      dashboard.applyFilters().click();

      dashboard.confirmDealsPresent(deals.slice(0,20));
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal('(21 items)');
      });

      dashboard.showFilters().click();
      dashboard.filterByStatus().should('have.value', 'all');
    });
  });

  it('The Dashboard: status=draft -> filters deals displayed', () => {
    cy.login({...maker1});
    dashboard.visit();

    dashboard.showFilters().click();
    dashboard.filterByStatus().select('draft');
    dashboard.applyFilters().click();

    cy.dealsInStatus('Draft').then( (deals) => {
      dashboard.confirmDealsPresent(deals);
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal(`(${deals.length} items)`);
      });

      dashboard.filterByStatus().should('be.visible');
      dashboard.filterByStatus().should('have.value', 'draft');
    });
  });

  it('The Dashboard: status=readyForApproval -> filters deals displayed', () => {
    cy.login({...maker1});
    dashboard.visit();

    dashboard.showFilters().click();
    dashboard.filterByStatus().select('readyForApproval');
    dashboard.applyFilters().click();

    cy.dealsInStatus("Ready for Checker's approval").then( (deals) => {
      dashboard.confirmDealsPresent(deals);
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal(`(${deals.length} items)`);
      });

      dashboard.filterByStatus().should('be.visible');
      dashboard.filterByStatus().should('have.value', 'readyForApproval');
    });
  });

  it('The Dashboard: status=inputRequired -> filters deals displayed', () => {
    cy.login({...maker1});
    dashboard.visit();

    dashboard.showFilters().click();
    dashboard.filterByStatus().select('inputRequired');
    dashboard.applyFilters().click();

    cy.dealsInStatus("Further Maker's input required").then( (deals) => {
      dashboard.confirmDealsPresent(deals);
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal(`(${deals.length} items)`);
      });

      dashboard.filterByStatus().should('be.visible');
      dashboard.filterByStatus().should('have.value', 'inputRequired');
    });
  });

  it('The Dashboard: status=abandoned -> filters deals displayed', () => {
    cy.login({...maker1});
    dashboard.visit();

    dashboard.showFilters().click();
    dashboard.filterByStatus().select('abandoned');
    dashboard.applyFilters().click();

    cy.dealsInStatus("Abandoned Deal").then( (deals) => {
      dashboard.confirmDealsPresent(deals);
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal(`(${deals.length} items)`);
      });

      dashboard.filterByStatus().should('be.visible');
      dashboard.filterByStatus().should('have.value', 'abandoned');
    });
  });

  it('The Dashboard: status=submitted -> filters deals displayed', () => {
    cy.login({...maker1});
    dashboard.visit();

    dashboard.showFilters().click();
    dashboard.filterByStatus().select('submitted');
    dashboard.applyFilters().click();

    cy.dealsInStatus("Submitted").then( (deals) => {
      dashboard.confirmDealsPresent(deals);
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal(`(${deals.length} items)`);
      });

      dashboard.filterByStatus().should('be.visible');
      dashboard.filterByStatus().should('have.value', 'submitted');
    });
  });

  it('The Dashboard: status=submissionAcknowledged -> filters deals displayed', () => {
    cy.login({...maker1});
    dashboard.visit();

    dashboard.showFilters().click();
    dashboard.filterByStatus().select('submissionAcknowledged');
    dashboard.applyFilters().click();

    cy.dealsInStatus("Acknowledged by UKEF").then( (deals) => {
      dashboard.confirmDealsPresent(deals);
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal(`(${deals.length} items)`);
      });

      dashboard.filterByStatus().should('be.visible');
      dashboard.filterByStatus().should('have.value', 'submissionAcknowledged');
    });
  });

  it('The Dashboard: status=approved -> filters deals displayed', () => {
    cy.login({...maker1});
    dashboard.visit();

    dashboard.showFilters().click();
    dashboard.filterByStatus().select('approved');
    dashboard.applyFilters().click();

    cy.dealsInStatus("Accepted by UKEF (without conditions)").then( (deals) => {
      dashboard.confirmDealsPresent(deals);
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal(`(${deals.length} items)`);
      });

      dashboard.filterByStatus().should('be.visible');
      dashboard.filterByStatus().should('have.value', 'approved');
    });
  });

  it('The Dashboard: status=approvedWithConditions -> filters deals displayed', () => {
    cy.login({...maker1});
    dashboard.visit();

    dashboard.showFilters().click();
    dashboard.filterByStatus().select('approvedWithConditions');
    dashboard.applyFilters().click();

    cy.dealsInStatus("Accepted by UKEF (with conditions)").then( (deals) => {
      dashboard.confirmDealsPresent(deals);
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal(`(${deals.length} items)`);
      });

      dashboard.filterByStatus().should('be.visible');
      dashboard.filterByStatus().should('have.value', 'approvedWithConditions');
    });
  });

  it('The Dashboard: status=refused -> filters deals displayed', () => {
    cy.login({...maker1});
    dashboard.visit();

    dashboard.showFilters().click();
    dashboard.filterByStatus().select('refused');
    dashboard.applyFilters().click();

    cy.dealsInStatus("Rejected by UKEF").then( (deals) => {
      dashboard.confirmDealsPresent(deals);
      dashboard.totalItems().invoke('text').then((text) => {
        expect(text.trim()).equal(`(${deals.length} items)`);
      });

      dashboard.filterByStatus().should('be.visible');
      dashboard.filterByStatus().should('have.value', 'refused');
    });
  });
});
