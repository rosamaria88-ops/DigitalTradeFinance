/* eslint-disable no-undef */
const submitToUkefConfirmation = {
  confirmationPanelTitle: () => cy.get('[data-cy="submit-confirmation-title"]'),
  dashboardLink: () => cy.get('[data-cy="dashboard-link"]'),
};

export default submitToUkefConfirmation;
