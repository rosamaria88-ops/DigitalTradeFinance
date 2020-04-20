const pages = require('../../../pages');
const partials = require('../../../partials');
const fillBondForm = require('./fill-bond-forms');
const assertBondFormValues = require('./assert-bond-form-values');
const BOND_FORM_VALUES = require('./bond-form-values');
const relative = require('../../../relativeURL');

const user = { username: 'MAKER', password: 'MAKER' };

const MOCK_DEAL = {
  details: {
    bankSupplyContractID: 'someDealId',
    bankSupplyContractName: 'someDealName',
  },
};

const goToBondFinancialDetailsPage = (deal) => {
  cy.loginGoToDealPage(user, deal);

  pages.contract.addBondButton().click();
  partials.bondProgressNav.progressNavBondFinancialDetails().click();
  cy.url().should('include', '/contract');
  cy.url().should('include', '/bond/');
  cy.url().should('include', '/financial-details');
};

context('Bond financial details', () => {
  beforeEach(() => {
    // [dw] at time of writing, the portal was throwing exceptions; this stops cypress caring
    cy.on('uncaught:exception', (err, runnable) => {
      console.log(err.stack);
      return false;
    });
    cy.deleteDeals(user);
    cy.insertOneDeal(MOCK_DEAL, user);
  });

  describe('When a user submits the `Bond Financial Details` form', () => {
    it('should progress to the bond `Fee Details` page', () => {
      cy.allDeals().then((deals) => {
        const deal = deals[0];
        cy.loginGoToDealPage(user, deal);

        pages.contract.addBondButton().click();
        partials.bondProgressNav.progressNavBondFinancialDetails().click();
        cy.url().should('include', '/contract');
        cy.url().should('include', '/bond/');
        cy.url().should('include', '/financial-details');

        fillBondForm.financialDetails.transactionCurrencySameAsSupplyContractCurrency();
        pages.bondFinancialDetails.submit().click();

        cy.url().should('include', '/contract');
        cy.url().should('include', '/bond/');
        cy.url().should('include', '/fee-details');
      });
    });

    it('should prepopulate submitted form fields when returning back to Bond Financial Details page', () => {
      cy.allDeals().then((deals) => {
        const deal = deals[0];
        cy.loginGoToDealPage(user, deal);

        pages.contract.addBondButton().click();
        partials.bondProgressNav.progressNavBondFinancialDetails().click();
        cy.url().should('include', '/financial-details');

        fillBondForm.financialDetails.transactionCurrencySameAsSupplyContractCurrency();
        pages.bondFinancialDetails.submit().click();

        cy.url().should('include', '/fee-details');
        partials.bondProgressNav.progressNavBondFinancialDetails().click();
        cy.url().should('include', '/financial-details');

        assertBondFormValues.financialDetails.transactionCurrencySameAsSupplyContractCurrency();
      });
    });
  });

  describe('When a user clicks `save and go back` button', () => {
    it('should save the form data, return to Deal page and prepopulate form fields when returning back to Bond Details page', () => {
      cy.allDeals().then((deals) => {
        const deal = deals[0];
        cy.loginGoToDealPage(user, deal);

        pages.contract.addBondButton().click();
        partials.bondProgressNav.progressNavBondFinancialDetails().click();
        cy.url().should('include', '/financial-details');

        fillBondForm.financialDetails.transactionCurrencySameAsSupplyContractCurrency();

        partials.bondProgressNav.bondId().then((bondIdHiddenInput) => {
          const bondId = bondIdHiddenInput[0].value;

          pages.bondFinancialDetails.saveGoBackButton().click();

          cy.url().should('not.include', '/financial-details');
          cy.url().should('include', '/contract');

          const row = pages.contract.bondTransactionsTable.row(bondId);

          row.uniqueNumber().click();
          partials.bondProgressNav.progressNavBondFinancialDetails().click();
          cy.url().should('include', '/financial-details');

          assertBondFormValues.financialDetails.transactionCurrencySameAsSupplyContractCurrency();
        });
      });
    });
  });

  describe('when a user selects that the currency is NOT the same as the Supply Contract currency', () => {
    it('should render additional form fields', () => {
      cy.allDeals().then((deals) => {
        goToBondFinancialDetailsPage(deals[0]);

        pages.bondFinancialDetails.transactionCurrencySameAsSupplyContractCurrencyNoInput().click();

        pages.bondFinancialDetails.currencyInput().should('be.visible');
        pages.bondFinancialDetails.conversionRateInput().should('be.visible');
        pages.bondFinancialDetails.conversionRateDateDayInput().should('be.visible');
        pages.bondFinancialDetails.conversionRateDateMonthInput().should('be.visible');
        pages.bondFinancialDetails.conversionRateDateYearInput().should('be.visible');
      });
    });

    it('should prepopulate submitted form fields when returning back to Bond Financial Details page', () => {
      cy.allDeals().then((deals) => {
        const deal = deals[0];
        cy.loginGoToDealPage(user, deal);

        pages.contract.addBondButton().click();
        partials.bondProgressNav.progressNavBondFinancialDetails().click();
        cy.url().should('include', '/financial-details');

        fillBondForm.financialDetails.transactionCurrencyNotTheSameAsSupplyContractCurrency();

        pages.bondFinancialDetails.submit().click();

        cy.url().should('include', '/fee-details');
        partials.bondProgressNav.progressNavBondFinancialDetails().click();
        cy.url().should('include', '/financial-details');

        assertBondFormValues.financialDetails.transactionCurrencyNotTheSameAsSupplyContractCurrency();
      });
    });

    it('should render additional submitted form field values in Bond Preview page', () => {
      cy.allDeals().then((deals) => {
        goToBondFinancialDetailsPage(deals[0]);

        pages.bondFinancialDetails.transactionCurrencySameAsSupplyContractCurrencyNoInput().click();

        fillBondForm.financialDetails.transactionCurrencyNotTheSameAsSupplyContractCurrency();

        pages.bondFinancialDetails.submit().click();

        cy.url().should('include', '/fee-details');
        pages.bondFeeDetails.submit().click();
        cy.url().should('include', '/preview');

        pages.bondPreview.currency().invoke('text').then((text) => {
          expect(text.trim()).equal(BOND_FORM_VALUES.FINANCIAL_DETAILS.currency.text);
        });

        pages.bondPreview.conversionRate().invoke('text').then((text) => {
          expect(text.trim()).equal(BOND_FORM_VALUES.FINANCIAL_DETAILS.conversionRate);
        });

        pages.bondPreview.conversionRateDate().invoke('text').then((text) => {
          const {
            conversionRateDateDay,
            conversionRateDateMonth,
            conversionRateDateYear,
          } = BOND_FORM_VALUES.FINANCIAL_DETAILS;

          const expected = `${conversionRateDateDay}/${conversionRateDateMonth}/${conversionRateDateYear}`;
          expect(text.trim()).equal(expected);
        });
      });
    });

    it('should populate the bond\'s `value` in Deal page with the submitted bond currency', () => {
      cy.allDeals().then((deals) => {
        const deal = deals[0];
        goToBondFinancialDetailsPage(deal);

        pages.bondFinancialDetails.bondValueInput().type(BOND_FORM_VALUES.FINANCIAL_DETAILS.bondValue);
        pages.bondFinancialDetails.transactionCurrencySameAsSupplyContractCurrencyNoInput().click();
        pages.bondFinancialDetails.currencyInput().select(BOND_FORM_VALUES.FINANCIAL_DETAILS.currency.value);

        // get bondId, go back to deal page
        // assert that some inputted bond data is displayed in the table
        partials.bondProgressNav.bondId().then((bondIdHiddenInput) => {
          const bondId = bondIdHiddenInput[0].value;

          pages.bondFinancialDetails.submit().click();
          pages.bondFeeDetails.saveGoBackButton().click();
          cy.url().should('eq', relative(`/contract/${deal._id}`));

          const row = pages.contract.bondTransactionsTable.row(bondId);
          row.bondValue().invoke('text').then((text) => {
            const expectedValue = `${BOND_FORM_VALUES.FINANCIAL_DETAILS.currency.value} ${BOND_FORM_VALUES.FINANCIAL_DETAILS.bondValue}`;
            expect(text.trim()).equal(expectedValue);
          });
        });
      });
    });
  });

  // TODO: financial details - disabled inputs guaranteeFeePayableByBank and ukefExposure work as expected
  // functionality needs to be done first - assuming these get automatically populated
});
