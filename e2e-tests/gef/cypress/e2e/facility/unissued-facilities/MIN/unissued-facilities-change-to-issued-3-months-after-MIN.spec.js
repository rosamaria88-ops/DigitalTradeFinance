import relative from '../../../relativeURL';

import CONSTANTS from '../../../../fixtures/constants';

import dateConstants from '../../../../../../e2e-fixtures/dateConstants';

import { MOCK_APPLICATION_MIN } from '../../../../fixtures/mocks/mock-deals';
import { BANK1_MAKER1 } from '../../../../../../e2e-fixtures/portal-users.fixture';
import { multipleMockGefFacilities } from '../../../../fixtures/mocks/mock-facilities';
import { mainHeading, errorSummary } from '../../../partials';
import applicationPreview from '../../../pages/application-preview';
import unissuedFacilityTable from '../../../pages/unissued-facilities';
import aboutFacilityUnissued from '../../../pages/unissued-facilities-about-facility';
import facilityEndDate from '../../../pages/facility-end-date';
import statusBanner from '../../../pages/application-status-banner';

let dealId;
let token;
let facilityOneId;

const facilityEndDateEnabled = Number(Cypress.env('GEF_DEAL_VERSION')) >= 1;

const { unissuedCashFacility, issuedCashFacility, unissuedContingentFacility, unissuedCashFacilityWith20MonthsOfCover } = multipleMockGefFacilities({
  facilityEndDateEnabled,
});

const FACILITY_THREE_SPECIAL = { ...unissuedContingentFacility };
FACILITY_THREE_SPECIAL.specialIssuePermission = true;

context('Unissued Facilities MIN - change to issued more than 3 months after MIN submission date', () => {
  before(() => {
    cy.apiLogin(BANK1_MAKER1)
      .then((t) => {
        token = t;
      })
      .then(() => {
        cy.apiCreateApplication(BANK1_MAKER1, token).then(({ body }) => {
          dealId = body._id;
          MOCK_APPLICATION_MIN.manualInclusionNoticeSubmissionDate = `${dateConstants.oneYearUnix}608`;
          cy.apiUpdateApplication(dealId, token, MOCK_APPLICATION_MIN).then(() => {
            cy.apiCreateFacility(dealId, CONSTANTS.FACILITY_TYPE.CASH, token).then((facility) => {
              facilityOneId = facility.body.details._id;
              cy.apiUpdateFacility(facility.body.details._id, token, unissuedCashFacility);
            });
            cy.apiCreateFacility(dealId, CONSTANTS.FACILITY_TYPE.CASH, token).then((facility) =>
              cy.apiUpdateFacility(facility.body.details._id, token, issuedCashFacility),
            );
            cy.apiCreateFacility(dealId, CONSTANTS.FACILITY_TYPE.CONTINGENT, token).then((facility) =>
              cy.apiUpdateFacility(facility.body.details._id, token, FACILITY_THREE_SPECIAL),
            );
            cy.apiCreateFacility(dealId, CONSTANTS.FACILITY_TYPE.CASH, token).then((facility) =>
              cy.apiUpdateFacility(facility.body.details._id, token, unissuedCashFacilityWith20MonthsOfCover),
            );
            cy.apiSetApplicationStatus(dealId, token, CONSTANTS.DEAL_STATUS.UKEF_ACKNOWLEDGED);
          });
        });
      });
  });

  describe('Change facility to issued from application preview', () => {
    beforeEach(() => {
      cy.saveSession();
      cy.login(BANK1_MAKER1);
      cy.visit(relative(`/gef/application-details/${dealId}`));
    });

    it('clicking unissued facilities link takes you to unissued facility list page', () => {
      applicationPreview.unissuedFacilitiesReviewLink().click();
      unissuedFacilityTable.updateFacilitiesLater().contains('Update facility stage later');
      statusBanner.applicationBanner().should('exist');
      cy.clickBackLink();
      cy.url().should('eq', relative(`/gef/application-details/${dealId}`));
    });

    it('clicking on update should take you to the update facility page with correct url', () => {
      applicationPreview.unissuedFacilitiesReviewLink().click();
      unissuedFacilityTable.updateIndividualFacilityButton(0).click();
      cy.url().should('eq', relative(`/gef/application-details/${dealId}/unissued-facilities/${facilityOneId}/about`));
    });

    it('update facility page should have correct titles and text', () => {
      applicationPreview.unissuedFacilitiesReviewLink().click();
      unissuedFacilityTable.updateIndividualFacilityButton(0).click();

      mainHeading().contains("Tell us you've issued this facility");
      aboutFacilityUnissued.facilityNameLabel().contains('Name for this cash facility');
      aboutFacilityUnissued.facilityName().should('have.value', unissuedCashFacility.name);

      aboutFacilityUnissued.issueDateDay().should('have.value', '');
      aboutFacilityUnissued.issueDateMonth().should('have.value', '');
      aboutFacilityUnissued.issueDateMonth().should('have.value', '');
      aboutFacilityUnissued.coverStartDateDay().should('have.value', '');
      aboutFacilityUnissued.coverStartDateMonth().should('have.value', '');
      aboutFacilityUnissued.coverStartDateYear().should('have.value', '');
      aboutFacilityUnissued.coverEndDateDay().should('have.value', '');
      aboutFacilityUnissued.coverEndDateMonth().should('have.value', '');
      aboutFacilityUnissued.coverEndDateYear().should('have.value', '');

      if (facilityEndDateEnabled) {
        aboutFacilityUnissued.isUsingFacilityEndDateYes().should('be.checked');
        aboutFacilityUnissued.isUsingFacilityEndDateNo().should('not.be.checked');
      }
    });

    it('should not be able to update facility and then go back to application preview page with coverStartDate more than 3 months in the future', () => {
      applicationPreview.unissuedFacilitiesReviewLink().click();
      unissuedFacilityTable.updateIndividualFacilityButton(0).click();

      cy.keyboardInput(aboutFacilityUnissued.issueDateDay(), dateConstants.todayDay);
      cy.keyboardInput(aboutFacilityUnissued.issueDateMonth(), dateConstants.todayMonth);
      cy.keyboardInput(aboutFacilityUnissued.issueDateYear(), dateConstants.todayYear);

      aboutFacilityUnissued.shouldCoverStartOnSubmissionNo().click();
      cy.keyboardInput(aboutFacilityUnissued.coverStartDateDay(), dateConstants.tomorrowDay);
      cy.keyboardInput(aboutFacilityUnissued.coverStartDateMonth(), dateConstants.tomorrowMonth);
      cy.keyboardInput(aboutFacilityUnissued.coverStartDateYear(), dateConstants.tomorrowYear);

      cy.keyboardInput(aboutFacilityUnissued.coverEndDateDay(), dateConstants.threeYearsDay);
      cy.keyboardInput(aboutFacilityUnissued.coverEndDateMonth(), dateConstants.threeYearsMonth);
      cy.keyboardInput(aboutFacilityUnissued.coverEndDateYear(), dateConstants.threeYearsYear);

      cy.clickContinueButton();

      errorSummary().contains('The cover start date must be within 3 months of the inclusion notice submission date');
      aboutFacilityUnissued.coverStartDateError().contains('The cover start date must be within 3 months of the inclusion notice submission date');

      aboutFacilityUnissued.shouldCoverStartOnSubmissionYes().click();
      cy.clickContinueButton();

      errorSummary().contains('The cover start date must be within 3 months of the inclusion notice submission date');
      aboutFacilityUnissued.coverStartDateError().contains('The cover start date must be within 3 months of the inclusion notice submission date');
    });

    it('should be able to update facility and then go back to application preview page with coverStartDate more than 3 months in the future if specialIssuePermission', () => {
      applicationPreview.unissuedFacilitiesReviewLink().click();
      unissuedFacilityTable.updateIndividualFacilityButton(1).click();

      cy.keyboardInput(aboutFacilityUnissued.issueDateDay(), dateConstants.todayDay);
      cy.keyboardInput(aboutFacilityUnissued.issueDateMonth(), dateConstants.todayMonth);
      cy.keyboardInput(aboutFacilityUnissued.issueDateYear(), dateConstants.todayYear);

      aboutFacilityUnissued.shouldCoverStartOnSubmissionNo().click();
      cy.keyboardInput(aboutFacilityUnissued.coverStartDateDay(), dateConstants.tomorrowDay);
      cy.keyboardInput(aboutFacilityUnissued.coverStartDateMonth(), dateConstants.tomorrowMonth);
      cy.keyboardInput(aboutFacilityUnissued.coverStartDateYear(), dateConstants.tomorrowYear);

      cy.keyboardInput(aboutFacilityUnissued.coverEndDateDay(), dateConstants.threeYearsDay);
      cy.keyboardInput(aboutFacilityUnissued.coverEndDateMonth(), dateConstants.threeYearsMonth);
      cy.keyboardInput(aboutFacilityUnissued.coverEndDateYear(), dateConstants.threeYearsYear);

      if (facilityEndDateEnabled) {
        aboutFacilityUnissued.isUsingFacilityEndDateYes().click();
      }

      cy.clickContinueButton();

      if (facilityEndDateEnabled) {
        cy.keyboardInput(facilityEndDate.facilityEndDateDay(), dateConstants.threeMonthsOneDayDay);
        cy.keyboardInput(facilityEndDate.facilityEndDateMonth(), dateConstants.threeMonthsOneDayMonth);
        cy.keyboardInput(facilityEndDate.facilityEndDateYear(), dateConstants.threeMonthsOneDayYear);
        cy.clickContinueButton();
      }

      // to go back to application preview page
      unissuedFacilityTable.updateFacilitiesLater().click();
    });

    if (facilityEndDateEnabled) {
      it('should display error on facility end date page if date is not provided', () => {
        applicationPreview.facilitySummaryListTable(1).facilityEndDateAction().click();

        facilityEndDate.facilityEndDateDay().clear();
        facilityEndDate.facilityEndDateMonth().clear();
        facilityEndDate.facilityEndDateYear().clear();
        cy.clickContinueButton();

        errorSummary().contains('Facility end date must be in the correct format DD/MM/YYYY');
        facilityEndDate.facilityEndDateError();
      });

      it('should display error on facility end date page if date is over 6 years in the future', () => {
        applicationPreview.facilitySummaryListTable(1).facilityEndDateAction().click();

        cy.keyboardInput(facilityEndDate.facilityEndDateDay(), dateConstants.sixYearsOneDayDay);
        cy.keyboardInput(facilityEndDate.facilityEndDateMonth(), dateConstants.sixYearsOneDayMonth);
        cy.keyboardInput(facilityEndDate.facilityEndDateYear(), dateConstants.sixYearsOneDayYear);
        cy.clickContinueButton();

        errorSummary().contains('Facility end date cannot be greater than 6 years in the future');
        facilityEndDate.facilityEndDateError();
      });

      it('should display error on facility end date page if date before the cover start date', () => {
        applicationPreview.facilitySummaryListTable(1).facilityEndDateAction().click();

        cy.keyboardInput(facilityEndDate.facilityEndDateDay(), dateConstants.todayDay);
        cy.keyboardInput(facilityEndDate.facilityEndDateMonth(), dateConstants.todayMonth);
        cy.keyboardInput(facilityEndDate.facilityEndDateYear(), dateConstants.todayYear);
        cy.clickContinueButton();

        errorSummary().contains('Facility end date cannot be before the cover start date');
        facilityEndDate.facilityEndDateError();
      });
    }

    it('should not be able to update facility from application preview with coverStartDate more than 3 months in the future if specialIssuePermission', () => {
      // to change to issued from preview page by clicking change on issued row
      applicationPreview.facilitySummaryListTable(0).hasBeenIssuedAction().click();

      cy.keyboardInput(aboutFacilityUnissued.facilityName(), `${unissuedCashFacilityWith20MonthsOfCover.name}name`);

      cy.keyboardInput(aboutFacilityUnissued.issueDateDay(), dateConstants.todayDay);
      cy.keyboardInput(aboutFacilityUnissued.issueDateMonth(), dateConstants.todayMonth);
      cy.keyboardInput(aboutFacilityUnissued.issueDateYear(), dateConstants.todayYear);

      aboutFacilityUnissued.shouldCoverStartOnSubmissionNo().click();
      cy.keyboardInput(aboutFacilityUnissued.coverStartDateDay(), dateConstants.tomorrowDay);
      cy.keyboardInput(aboutFacilityUnissued.coverStartDateMonth(), dateConstants.tomorrowMonth);
      cy.keyboardInput(aboutFacilityUnissued.coverStartDateYear(), dateConstants.tomorrowYear);

      cy.keyboardInput(aboutFacilityUnissued.coverEndDateDay(), dateConstants.threeYearsDay);
      cy.keyboardInput(aboutFacilityUnissued.coverEndDateMonth(), dateConstants.threeYearsMonth);
      cy.keyboardInput(aboutFacilityUnissued.coverEndDateYear(), dateConstants.threeYearsYear);
      cy.clickContinueButton();

      errorSummary().contains('The cover start date must be within 3 months of the inclusion notice submission date');
      aboutFacilityUnissued.coverStartDateError().contains('The cover start date must be within 3 months of the inclusion notice submission date');

      aboutFacilityUnissued.shouldCoverStartOnSubmissionYes().click();
      cy.clickContinueButton();

      errorSummary().contains('The cover start date must be within 3 months of the inclusion notice submission date');
      aboutFacilityUnissued.coverStartDateError().contains('The cover start date must be within 3 months of the inclusion notice submission date');
    });
  });
});
