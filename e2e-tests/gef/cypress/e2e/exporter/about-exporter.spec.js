import relative from '../relativeURL';
import { backLink, errorSummary, form, headingCaption, mainHeading, saveAndReturnButton } from '../partials';
import aboutExporter from '../pages/about-exporter';
import applicationDetails from '../pages/application-details';
import { BANK1_MAKER1 } from '../../../../e2e-fixtures/portal-users.fixture';

const dealIds = [];
let dealWithNoExporterIndustries;
let dealWithExporterIndustries;
let dealWithEmptyExporter;
let dealWithCompletedExporter;
let token;

context('About Exporter Page', () => {
  before(() => {
    cy.loadData();
    cy.apiLogin(BANK1_MAKER1)
      .then((tok) => {
        token = tok;
      })
      .then(() => cy.apiFetchAllGefApplications(token))
      .then(({ body }) => {
        body.items.forEach((item) => {
          dealIds.push(item._id);
        });

        dealWithNoExporterIndustries = body.items.find((deal) => deal.exporter?.industries?.length === 0);

        dealWithExporterIndustries = body.items.find((deal) => deal.exporter?.industries?.length);

        dealWithEmptyExporter = body.items.find((deal) => deal.exporter.status === 'Not started');

        dealWithCompletedExporter = body.items.find((deal) => deal.exporter.status === 'Completed');
      });
    cy.login(BANK1_MAKER1);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('With no exporter fields provided', () => {
    it('should render `Not started` status in the main deal page', () => {
      cy.visit(relative(`/gef/application-details/${dealWithEmptyExporter._id}`));
      applicationDetails.exporterStatus().should('contain', 'Not started');
    });
  });

  describe('Visiting page', () => {
    it('displays the correct elements', () => {
      cy.visit(relative(`/gef/application-details/${dealWithNoExporterIndustries._id}/about-exporter`));

      backLink().should('exist');
      headingCaption();
      mainHeading();
      form();
      aboutExporter.industryTitle();
      aboutExporter.microRadioButton();
      aboutExporter.smallRadioButton();
      aboutExporter.mediumRadioButton();
      aboutExporter.notSMERadioButton();
      aboutExporter.probabilityOfDefaultInput();
      aboutExporter.isFinancingIncreasingRadioYes();
      aboutExporter.isFinancingIncreasingRadioNo();
      aboutExporter.doneButton();
      saveAndReturnButton();
    });

    it('redirects user to enter exporters address page when clicking on `Back` Link', () => {
      cy.visit(relative(`/gef/application-details/${dealWithNoExporterIndustries._id}/about-exporter`));
      cy.clickBackLink();
      cy.url().should('eq', relative(`/gef/application-details/${dealWithNoExporterIndustries._id}/exporters-address`));
    });

    it('displays selected Industry string', () => {
      cy.visit(relative(`/gef/application-details/${dealWithNoExporterIndustries._id}/about-exporter`));
      aboutExporter.industry();
    });

    it('displays no industry options', () => {
      cy.visit(relative(`/gef/application-details/${dealWithNoExporterIndustries._id}/about-exporter`));
      aboutExporter.industries().should('not.exist');
    });
  });

  describe('Visiting page with multiple industries', () => {
    it('displays the correct amount of industries', () => {
      cy.visit(relative(`/gef/application-details/${dealWithExporterIndustries._id}/about-exporter`));
      aboutExporter.industries().find('input[type="radio"]').its('length').should('be.eq', 3);
    });
  });

  describe('Clicking on Done', () => {
    it('validates form', () => {
      cy.visit(relative(`/gef/application-details/${dealWithEmptyExporter._id}/about-exporter`));
      aboutExporter.doneButton().click();
      errorSummary();
      aboutExporter.probabilityOfDefaultError();
      aboutExporter.isFinancingIncreasingError();
    });

    it('takes user back to application details page when form has been filled in and renders `In progress` status', () => {
      cy.visit(relative(`/gef/application-details/${dealWithEmptyExporter._id}/about-exporter`));
      aboutExporter.microRadioButton().click();
      cy.keyboardInput(aboutExporter.probabilityOfDefaultInput(), '10');
      aboutExporter.isFinancingIncreasingRadioYes().click();
      aboutExporter.doneButton().click();
      cy.url().should('eq', relative(`/gef/application-details/${dealWithEmptyExporter._id}`));
      applicationDetails.exporterStatus().should('contain', 'In progress');
    });
  });

  describe('Clicking on Save and return, bypasses validation and takes user back to application details page', () => {
    it('validates form', () => {
      cy.visit(relative(`/gef/application-details/${dealWithEmptyExporter._id}/about-exporter`));
      cy.clickSaveAndReturnButton();
      cy.url().should('eq', relative(`/gef/application-details/${dealWithEmptyExporter._id}`));
    });
  });

  describe('when all exporter fields are completed', () => {
    it('should render `Completed` status in the main deal page', () => {
      cy.visit(relative(`/gef/application-details/${dealWithCompletedExporter._id}`));
      applicationDetails.exporterStatus().should('contain', 'Completed');
    });
  });
});
