import relative from '../../../../relativeURL';
import CONSTANTS from '../../../../../fixtures/constants';
import { today, threeYears, twoYears } from '../../../../../../../e2e-fixtures/dateConstants';
import { MOCK_APPLICATION_MIN } from '../../../../../fixtures/mocks/mock-deals';
import { BANK1_MAKER1 } from '../../../../../../../e2e-fixtures/portal-users.fixture';
import { multipleMockGefFacilities } from '../../../../../../../e2e-fixtures/mock-gef-facilities';
import { continueButton } from '../../../../partials';
import applicationPreview from '../../../../pages/application-preview';
import unissuedFacilityTable from '../../../../pages/unissued-facilities';
import aboutFacilityUnissued from '../../../../pages/unissued-facilities-about-facility';
import applicationSubmission from '../../../../pages/application-submission';

let dealId;
let token;

const { unissuedCashFacility, issuedCashFacility, unissuedContingentFacility, unissuedCashFacilityWith20MonthsOfCover } = multipleMockGefFacilities();

unissuedCashFacility.specialIssuePermission = true;
issuedCashFacility.specialIssuePermission = true;
unissuedContingentFacility.specialIssuePermission = true;
unissuedCashFacilityWith20MonthsOfCover.specialIssuePermission = true;

const unissuedFacilitiesArray = [unissuedCashFacility, unissuedContingentFacility, unissuedCashFacilityWith20MonthsOfCover];

/*
  for changing facilities to issued from preview page.
  To unlock functionality, need to first issue one facility from unissued-facility table
*/
context('Unissued Facilities MIN - change to issued from preview page - specialIssuedPermission - feature flag disabled', () => {
  before(() => {
    cy.apiLogin(BANK1_MAKER1)
      .then((t) => {
        token = t;
      })
      .then(() => {
        cy.apiCreateApplication(BANK1_MAKER1, token).then(({ body }) => {
          dealId = body._id;
          cy.apiUpdateApplication(dealId, token, MOCK_APPLICATION_MIN).then(() => {
            cy.apiCreateFacility(dealId, CONSTANTS.FACILITY_TYPE.CASH, token).then((facility) => {
              cy.apiUpdateFacility(facility.body.details._id, token, unissuedCashFacility);
            });
            cy.apiCreateFacility(dealId, CONSTANTS.FACILITY_TYPE.CASH, token).then((facility) =>
              cy.apiUpdateFacility(facility.body.details._id, token, issuedCashFacility),
            );
            cy.apiCreateFacility(dealId, CONSTANTS.FACILITY_TYPE.CONTINGENT, token).then((facility) =>
              cy.apiUpdateFacility(facility.body.details._id, token, unissuedContingentFacility),
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

    it('should be able to update facility and then go back to application preview page with coverStartDate more than 3 months in the future', () => {
      applicationPreview.unissuedFacilitiesReviewLink().click();
      unissuedFacilityTable.updateIndividualFacilityButton(0).click();

      cy.completeDateFormFields({ idPrefix: 'issue-date' });

      aboutFacilityUnissued.shouldCoverStartOnSubmissionNo().click();

      cy.completeDateFormFields({ idPrefix: 'cover-start-date', date: twoYears.date });
      cy.completeDateFormFields({ idPrefix: 'cover-end-date', date: threeYears.date });

      cy.clickContinueButton();

      unissuedFacilityTable.successBanner().contains(`${unissuedFacilitiesArray[0].name} is updated`);
      unissuedFacilityTable.rows().should('have.length', unissuedFacilitiesArray.length - 1);
      continueButton().should('not.exist');
      // to go back to application preview page
      unissuedFacilityTable.updateFacilitiesLater().click();
    });

    it('preview review facility stage has correct headers and shows 1 updated facilities', () => {
      applicationPreview.reviewFacilityStage().contains('Review facility stage');

      applicationPreview.updatedUnissuedFacilitiesHeader().contains('The following facility stages have been updated to issued:');
      applicationPreview.updatedUnissuedFacilitiesList().contains(unissuedFacilitiesArray[0].name);
      // should not be able to go back to unissued-facilities table once updated at least one facility
      applicationPreview.unissuedFacilitiesReviewLink().should('not.exist');
      // should be able to submit to checker since facility issued
      applicationPreview.submitButtonPostApproval().should('exist');
    });

    it('facility table should have change links on the changed to issued facilities', () => {
      const issuedDate = today.d_MMMM_yyyy;
      const coverStart = twoYears.d_MMMM_yyyy;
      const coverEnd = threeYears.d_MMMM_yyyy;

      // can change facility one name and issue dates etc since changed to issued
      applicationPreview.facilitySummaryListTable(3).nameValue().contains(unissuedCashFacility.name);
      applicationPreview.facilitySummaryListTable(3).nameAction().contains('Change');
      applicationPreview.facilitySummaryListTable(3).ukefFacilityIdAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(3).hasBeenIssuedAction().contains('Change');
      applicationPreview.facilitySummaryListTable(3).issueDateValue().contains(issuedDate);
      applicationPreview.facilitySummaryListTable(3).issueDateAction().contains('Change');
      applicationPreview.facilitySummaryListTable(3).coverStartDateValue().contains(coverStart);
      applicationPreview.facilitySummaryListTable(3).coverStartDateAction().contains('Change');
      applicationPreview.facilitySummaryListTable(3).coverEndDateValue().contains(coverEnd);
      applicationPreview.facilitySummaryListTable(3).coverEndDateAction().contains('Change');
      applicationPreview.facilitySummaryListTable(3).valueAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(3).coverPercentageAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(3).interestPercentageAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(3).feeFrequencyAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(3).dayCountBasisAction().should('have.class', 'govuk-!-display-none');

      // not be able to change facility four name, but can change to issued
      applicationPreview.facilitySummaryListTable(0).nameValue().contains(unissuedCashFacilityWith20MonthsOfCover.name);
      applicationPreview.facilitySummaryListTable(0).nameAction().should('have.class', 'govuk-!-display-none');

      applicationPreview.facilitySummaryListTable(0).ukefFacilityIdAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(0).hasBeenIssuedValue().contains('Unissued');
      applicationPreview.facilitySummaryListTable(0).hasBeenIssuedAction().contains('Change');

      applicationPreview.facilitySummaryListTable(0).issueDateAction().should('not.exist');
      applicationPreview.facilitySummaryListTable(0).coverStartDateAction().should('not.exist');
      applicationPreview.facilitySummaryListTable(0).coverEndDateAction().should('not.exist');

      // should not be able to change facility two has previously issued
      applicationPreview.facilitySummaryListTable(2).nameValue().contains(issuedCashFacility.name);
      applicationPreview.facilitySummaryListTable(2).nameAction().should('have.class', 'govuk-!-display-none');

      applicationPreview.facilitySummaryListTable(2).ukefFacilityIdAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(2).hasBeenIssuedValue().contains('Issued');
      applicationPreview.facilitySummaryListTable(2).hasBeenIssuedAction().should('have.class', 'govuk-!-display-none');

      applicationPreview.facilitySummaryListTable(2).issueDateAction().should('not.exist');
      applicationPreview.facilitySummaryListTable(2).coverStartDateValue().contains('Date you submit the notice');
      applicationPreview.facilitySummaryListTable(2).coverStartDateAction().should('have.class', 'govuk-!-display-none');
    });

    it('change unissued to issued from application preview page with coverStartDate more than 3 months in the future', () => {
      // to change to issued from preview page by clicking change on issued row
      applicationPreview.facilitySummaryListTable(0).hasBeenIssuedAction().click();

      cy.keyboardInput(aboutFacilityUnissued.facilityName(), `${unissuedCashFacilityWith20MonthsOfCover.name}name`);

      cy.completeDateFormFields({ idPrefix: 'issue-date' });

      aboutFacilityUnissued.shouldCoverStartOnSubmissionYes().click();

      cy.completeDateFormFields({ idPrefix: 'cover-end-date', date: threeYears.date });

      cy.clickContinueButton();
    });

    it('change links should appear for facility four and three should be unissued still', () => {
      const issuedDate = today.d_MMMM_yyyy;
      const coverStartNow = today.d_MMMM_yyyy;
      const coverEnd = threeYears.d_MMMM_yyyy;

      applicationPreview.reviewFacilityStage().contains('Review facility stage');
      applicationPreview.updatedUnissuedFacilitiesHeader().contains('The following facility stages have been updated to issued:');
      applicationPreview.updatedUnissuedFacilitiesList().contains(unissuedFacilitiesArray[0].name);
      // should show new facility four name
      applicationPreview.updatedUnissuedFacilitiesList().contains(`${unissuedFacilitiesArray[2].name}name`);

      // check correct change links are shown for rows of issued facility
      applicationPreview.facilitySummaryListTable(0).nameValue().contains(`${unissuedFacilitiesArray[2].name}name`);
      applicationPreview.facilitySummaryListTable(0).nameAction().contains('Change');
      applicationPreview.facilitySummaryListTable(0).ukefFacilityIdAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(0).hasBeenIssuedValue().contains('Issued');
      applicationPreview.facilitySummaryListTable(0).nameAction().contains('Change');
      applicationPreview.facilitySummaryListTable(0).issueDateValue().contains(issuedDate);
      applicationPreview.facilitySummaryListTable(0).issueDateAction().contains('Change');
      applicationPreview.facilitySummaryListTable(0).coverStartDateValue().contains(coverStartNow);
      applicationPreview.facilitySummaryListTable(0).coverStartDateAction().contains('Change');
      applicationPreview.facilitySummaryListTable(0).coverEndDateValue().contains(coverEnd);
      applicationPreview.facilitySummaryListTable(0).coverEndDateAction().contains('Change');

      // facility three still unissued
      applicationPreview.facilitySummaryListTable(1).nameValue().contains(unissuedContingentFacility.name);
      applicationPreview.facilitySummaryListTable(1).nameAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(1).ukefFacilityIdAction().should('have.class', 'govuk-!-display-none');
      applicationPreview.facilitySummaryListTable(1).hasBeenIssuedValue().contains('Unissued');
      applicationPreview.facilitySummaryListTable(1).hasBeenIssuedAction().contains('Change');
      applicationPreview.facilitySummaryListTable(1).issueDateAction().should('not.exist');
      applicationPreview.facilitySummaryListTable(1).coverStartDateAction().should('not.exist');
      applicationPreview.facilitySummaryListTable(1).coverEndDateAction().should('not.exist');
    });

    it('pressing submit button takes you to submit page and with correct panel once submitted to checker', () => {
      // ensures that can submit even with 1 unissued left still
      applicationPreview.submitButtonPostApproval().click();
      applicationSubmission.submissionText().contains('Someone at your bank must check your update before they can submit it to UKEF');
      cy.clickSubmitButton();

      cy.url().should('eq', relative(`/gef/application-details/${dealId}/submit`));
      applicationSubmission.confirmationPanelTitleFacilities().contains('Issued facilities submitted for checking at your bank');
    });
  });
});
