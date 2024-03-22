const { utilisationReportUpload } = require('../../../pages');
const MOCK_USERS = require('../../../../../../e2e-fixtures');
const relativeURL = require('../../../relativeURL');
const { december2023ToFebruary2024ReportDetails } = require('../../../../fixtures/mockUtilisationReportDetails');

const { BANK2_PAYMENT_REPORT_OFFICER1 } = MOCK_USERS;

context('Quarterly utilisation report upload', () => {
  beforeEach(() => {
    cy.removeAllUtilisationReports();
    cy.insertUtilisationReports(december2023ToFebruary2024ReportDetails);
      
    cy.login(BANK2_PAYMENT_REPORT_OFFICER1);
    cy.visit(relativeURL('/utilisation-report-upload'));
  });

  after(() => {
    cy.removeAllUtilisationReports();
  });

  describe('Submitting a file to the utilisation report upload', () => {
    it('Should route to the Confirm and Send page when a file is successfully validated', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('valid-utilisation-report-December_2023_to_February_2024.xlsx');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.utilisationReportFileInputErrorMessage().should('not.exist');
      utilisationReportUpload.currentUrl().should('contain', '/confirm-and-send');
    });

    it('should display an error if the file selected does not contain the current report period', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('valid-utilisation-report-September_2023.xlsx');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.utilisationReportFileInputErrorMessage().should('have.length', 1);
      utilisationReportUpload.utilisationReportFileInputErrorMessage().contains('The selected file must be the December 2023 to February 2024 report');
    });

    it('should display an error if the file selected does not contain any report period', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('valid-utilisation-report-next_week.xlsx');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.utilisationReportFileInputErrorMessage().should('have.length', 1);
      utilisationReportUpload.utilisationReportFileInputErrorMessage().contains('The selected file must be the December 2023 to February 2024 report');
    });

    it('should display an error when trying to upload the wrong type of file', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('questionnaire_December_2023_to_February_2024.pdf');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.utilisationReportFileInputErrorMessage().should('have.length', 1);
    });

    it('should display an error when trying to upload a file that is too large', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('test-large-file-December_2023_to_February_2024.xlsx');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.utilisationReportFileInputErrorMessage().should('have.length', 1);
    });

    it('should display an error if no file has been selected', () => {
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.utilisationReportFileInputErrorMessage().should('have.length', 1);
    });

    it('should display an error if the file selected is password protected', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('password-protected-report-December_2023_to_February_2024.xlsx');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.utilisationReportFileInputErrorMessage().should('have.length', 1);
      utilisationReportUpload.utilisationReportFileInputErrorMessage().contains('password protected');
      utilisationReportUpload.mainHeading().contains('Report GEF utilisation and fees');
    });

    it('should display the check the report page with an error if uploading a file with an error on the check the report page', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('invalid-utilisation-report-December_2023_to_February_2024.xlsx');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.utilisationReportFileInput().attachFile('password-protected-report-December_2023_to_February_2024.xlsx');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.errorSummary().should('exist');
      utilisationReportUpload.utilisationReportFileInputErrorMessage().should('have.length', 1);
    });
  });

  describe('Failing data validation on file upload', () => {
    it('should display a summary of errors for an invalid .xlsx file', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('invalid-utilisation-report-December_2023_to_February_2024.xlsx');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.checkReportTitle().should('exist');
      utilisationReportUpload.validationErrorTable().should('exist');
      utilisationReportUpload.validationErrorTableRows().should('have.length', 7);
    });

    it('should display a summary of errors for an invalid .csv file', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('invalid-utilisation-report-December_2023_to_February_2024.csv');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.checkReportTitle().should('exist');
      utilisationReportUpload.errorSummary().should('exist');
      utilisationReportUpload.validationErrorTable().should('exist');
      utilisationReportUpload.validationErrorTableRows().should('have.length', 6);
    });

    it('should allow a file to be re-uploaded after failing the data validation', () => {
      utilisationReportUpload.utilisationReportFileInput().attachFile('invalid-utilisation-report-December_2023_to_February_2024.csv');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.checkReportTitle().should('exist');

      utilisationReportUpload.utilisationReportFileInput().attachFile('valid-utilisation-report-December_2023_to_February_2024.xlsx');
      utilisationReportUpload.continueButton().click();

      utilisationReportUpload.utilisationReportFileInputErrorMessage().should('not.exist');
      utilisationReportUpload.currentUrl().should('contain', '/confirm-and-send');
    });
  });
});
