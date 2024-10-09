const pages = require('../../pages');
const MOCK_USERS = require('../../../../../e2e-fixtures');
const fillLoanForm = require('./fill-loan-forms');
const LOAN_FORM_VALUES = require('./loan-form-values');

const { BANK1_MAKER1, ADMIN } = MOCK_USERS;

const MOCK_DEAL = {
  bankInternalRefName: 'someDealId',
  additionalRefName: 'someDealName',
  submissionDetails: {
    supplyContractCurrency: {
      id: 'GBP',
    },
  },
};

context('Loan form - Submit loan with created element on page', () => {
  let deal;

  beforeEach(() => {
    cy.deleteDeals(ADMIN);
    cy.insertOneDeal(MOCK_DEAL, BANK1_MAKER1).then((insertedDeal) => {
      deal = insertedDeal;
    });
  });

  it("should not insert created element's data into the loan", () => {
    cy.login(BANK1_MAKER1);

    // navigate to the about-buyer page; use the nav so we have it covered in a test..
    pages.contract.visit(deal);

    cy.clickAddLoanButton();

    // insert text element onto loan form
    cy.insertElement('loan-guarantee-form');

    pages.loanGuaranteeDetails.facilityStageUnconditionalInput().click();
    cy.keyboardInput(pages.loanGuaranteeDetails.unconditionalNameInput(), LOAN_FORM_VALUES.GUARANTEE_DETAILS.name);

    cy.completeDateFormFields({
      idPrefix: 'requestedCoverStartDate',
      day: LOAN_FORM_VALUES.GUARANTEE_DETAILS.requestedCoverStartDateDay,
      month: LOAN_FORM_VALUES.GUARANTEE_DETAILS.requestedCoverStartDateMonth,
      year: LOAN_FORM_VALUES.GUARANTEE_DETAILS.requestedCoverStartDateYear,
    });

    cy.completeDateFormFields({
      idPrefix: 'coverEndDate',
      day: LOAN_FORM_VALUES.GUARANTEE_DETAILS.coverEndDateDay,
      month: LOAN_FORM_VALUES.GUARANTEE_DETAILS.coverEndDateMonth,
      year: LOAN_FORM_VALUES.GUARANTEE_DETAILS.coverEndDateYear,
    });

    cy.clickSubmitButton();

    // insert text element onto loan form
    cy.insertElement('loan-financial-details-form');

    cy.keyboardInput(pages.loanFinancialDetails.facilityValueInput(), LOAN_FORM_VALUES.FINANCIAL_DETAILS.value);

    pages.loanFinancialDetails.currencySameAsSupplyContractCurrencyInputYes().click();
    cy.keyboardInput(pages.loanFinancialDetails.interestMarginFeeInput(), LOAN_FORM_VALUES.FINANCIAL_DETAILS.interestMarginFee);

    cy.keyboardInput(pages.loanFinancialDetails.coveredPercentageInput(), LOAN_FORM_VALUES.FINANCIAL_DETAILS.coveredPercentage);

    cy.keyboardInput(pages.loanFinancialDetails.minimumQuarterlyFeeInput(), LOAN_FORM_VALUES.FINANCIAL_DETAILS.minimumQuarterlyFee);

    cy.keyboardInput(pages.loanFinancialDetails.disbursementAmountInput(), LOAN_FORM_VALUES.FINANCIAL_DETAILS.disbursementAmount);

    cy.clickSubmitButton();

    fillLoanForm.datesRepayments.inAdvanceAnnually();
    // insert text element onto loan form
    cy.insertElement('loan-repayment-form');
    cy.clickSubmitButton();

    // gets deal
    cy.getDeal(deal._id, BANK1_MAKER1).then((updatedDeal) => {
      // gets facilityId from deal
      cy.getFacility(deal._id, updatedDeal.facilities[0], BANK1_MAKER1).then((loan) => {
        // checks loan does not have inserted field
        expect(loan.intruder).to.be.an('undefined');
      });
    });
  });
});
