/* eslint-disable no-undef */
const aboutFacility = {
  errorSummary: () => cy.get('[data-cy="error-summary"]'),
  backLink: () => cy.get('[data-cy="back-link"]'),
  headingCaption: () => cy.get('[data-cy="heading-caption"]'),
  mainHeading: () => cy.get('[data-cy="main-heading"]'),
  form: () => cy.get('[data-cy="form"]'),
  facilityName: () => cy.get('[data-cy="facility-name"]'),
  facilityNameError: () => cy.get('[data-cy="facility-name-error"]'),
  coverStartDateError: () => cy.get('[data-cy="cover-start-date-error"]'),
  coverStartDateDay: () => cy.get('[data-cy="cover-start-date-day"]'),
  coverStartDateMonth: () => cy.get('[data-cy="cover-start-date-month"]'),
  coverStartDateYear: () => cy.get('[data-cy="cover-start-date-year"]'),
  shouldCoverStartOnSubmissionError: () => cy.get('[data-cy="should-cover-start-on-submission-error"]'),
  shouldCoverStartOnSubmissionYes: () => cy.get('[data-cy="should-cover-start-on-submission-yes"]'),
  shouldCoverStartOnSubmissionNo: () => cy.get('[data-cy="should-cover-start-on-submission-no"]'),
  coverEndDateError: () => cy.get('[data-cy="cover-end-date-error"]'),
  coverEndDateDay: () => cy.get('[data-cy="cover-end-date-day"]'),
  coverEndDateMonth: () => cy.get('[data-cy="cover-end-date-month"]'),
  coverEndDateYear: () => cy.get('[data-cy="cover-end-date-year"]'),
  monthsOfCover: () => cy.get('[data-cy="months-of-cover"]'),
  monthsOfCoverError: () => cy.get('[data-cy="months-of-cover-error"]'),
  continueButton: () => cy.get('[data-cy="continue-button"]'),
  saveAndReturnButton: () => cy.get('[data-cy="save-and-return-button"]'),
};

export default aboutFacility;
