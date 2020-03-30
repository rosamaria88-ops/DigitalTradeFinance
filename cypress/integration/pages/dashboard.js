const page = {
  visit: () => cy.visit('/dashboard'),
  next: () => cy.contains('Next'),
  previous: () => cy.contains('Previous'),
  first: () => cy.contains('First'),
  last: () => cy.contains('Last'),
  totalItems: () => cy.get('#totalItems'),
  deal: (bankDealId) => cy.contains(bankDealId),
  confirmDealsPresent: (bankIds) => {
    for (const bankId of bankIds) {
      cy.contains(bankId).should('be.visible');
    }
  }
}

module.exports = page;
