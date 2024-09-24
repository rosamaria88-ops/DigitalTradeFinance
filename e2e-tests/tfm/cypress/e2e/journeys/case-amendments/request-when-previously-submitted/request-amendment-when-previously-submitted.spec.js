import relative from '../../../relativeURL';
import { errorSummary } from '../../../partials';
import facilityPage from '../../../pages/facilityPage';
import amendmentsPage from '../../../pages/amendments/amendmentsPage';
import MOCK_DEAL_AIN from '../../../../fixtures/deal-AIN';
import dateConstants from '../../../../../../e2e-fixtures/dateConstants';
import { PIM_USER_1, UNDERWRITER_MANAGER_1, BANK1_MAKER1, ADMIN } from '../../../../../../e2e-fixtures';
import pages from '../../../pages';

context('Amendments - should not allow amendments to have same coverEndDate/value if previously submitted', () => {
  let dealId;
  const dealFacilities = [];
  before(() => {
    cy.insertOneDeal(MOCK_DEAL_AIN, BANK1_MAKER1).then((insertedDeal) => {
      dealId = insertedDeal._id;

      const { dealType, mockFacilities } = MOCK_DEAL_AIN;

      cy.createFacilities(dealId, [mockFacilities[0], mockFacilities[1]], BANK1_MAKER1).then((createdFacilities) => {
        dealFacilities.push(...createdFacilities);
      });

      cy.submitDeal(dealId, dealType, PIM_USER_1);
    });
  });

  after(() => {
    cy.deleteDeals(dealId, ADMIN);
    dealFacilities.forEach((facility) => {
      cy.deleteFacility(facility._id, BANK1_MAKER1);
    });
  });

  it('should submit an automatic amendment request', () => {
    cy.login(PIM_USER_1);
    const facilityId = dealFacilities[0]._id;
    cy.visit(relative(`/case/${dealId}/facility/${facilityId}`));

    facilityPage.facilityTabAmendments().click();
    amendmentsPage.addAmendmentButton().should('exist');
    amendmentsPage.addAmendmentButton().contains('Add an amendment request');
    amendmentsPage.addAmendmentButton().click();
    cy.url().should('contain', 'request-date');

    cy.keyboardInput(amendmentsPage.amendmentRequestDayInput(), dateConstants.todayDay);
    cy.keyboardInput(amendmentsPage.amendmentRequestMonthInput(), dateConstants.todayMonth);
    cy.keyboardInput(amendmentsPage.amendmentRequestYearInput(), dateConstants.todayYear);
    cy.clickContinueButton();

    cy.url().should('contain', 'request-approval');
    // automatic approval
    amendmentsPage.amendmentRequestApprovalNo().click();
    cy.clickContinueButton();

    cy.url().should('contain', 'amendment-effective-date');

    cy.keyboardInput(amendmentsPage.amendmentEffectiveDayInput(), dateConstants.todayDay);
    cy.keyboardInput(amendmentsPage.amendmentEffectiveMonthInput(), dateConstants.todayMonth);
    cy.keyboardInput(amendmentsPage.amendmentEffectiveYearInput(), dateConstants.todayYear);
    cy.clickContinueButton();

    cy.url().should('contain', 'amendment-options');
    amendmentsPage.amendmentCoverEndDateCheckbox().should('not.be.checked');
    amendmentsPage.amendmentFacilityValueCheckbox().should('not.be.checked');

    // update both the cover end date and the facility value
    amendmentsPage.amendmentCoverEndDateCheckbox().click();
    amendmentsPage.amendmentFacilityValueCheckbox().click();
    amendmentsPage.amendmentCoverEndDateCheckbox().should('be.checked');
    amendmentsPage.amendmentFacilityValueCheckbox().should('be.checked');
    cy.clickContinueButton();
    cy.url().should('contain', 'cover-end-date');

    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateDayInput(), dateConstants.tomorrowDay);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateMonthInput(), dateConstants.tomorrowMonth);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateYearInput(), dateConstants.tomorrowYear);
    cy.clickContinueButton();

    cy.url().should('contain', 'facility-value');

    cy.keyboardInput(amendmentsPage.amendmentFacilityValueInput(), '123');
    cy.clickContinueButton();

    cy.url().should('contain', 'check-answers');
    cy.clickContinueButton();
  });

  it('should throw an error if same facility coverEndDate and value when previous amendment was automatic and submit when different', () => {
    cy.login(PIM_USER_1);
    const facilityId = dealFacilities[0]._id;
    cy.visit(relative(`/case/${dealId}/facility/${facilityId}`));

    facilityPage.facilityTabAmendments().click();
    amendmentsPage.addAmendmentButton().should('exist');
    amendmentsPage.addAmendmentButton().contains('Add an amendment request');
    amendmentsPage.addAmendmentButton().click();
    cy.url().should('contain', 'request-date');

    cy.keyboardInput(amendmentsPage.amendmentRequestDayInput(), dateConstants.todayDay);
    cy.keyboardInput(amendmentsPage.amendmentRequestMonthInput(), dateConstants.todayMonth);
    cy.keyboardInput(amendmentsPage.amendmentRequestYearInput(), dateConstants.todayYear);
    cy.clickContinueButton();

    cy.url().should('contain', 'request-approval');
    // manual approval
    amendmentsPage.amendmentRequestApprovalYes().click();
    cy.clickContinueButton();

    cy.url().should('contain', 'amendment-options');
    amendmentsPage.amendmentCoverEndDateCheckbox().should('not.be.checked');
    amendmentsPage.amendmentFacilityValueCheckbox().should('not.be.checked');

    // update both the cover end date and the facility value
    amendmentsPage.amendmentCoverEndDateCheckbox().click();
    amendmentsPage.amendmentFacilityValueCheckbox().click();
    amendmentsPage.amendmentCoverEndDateCheckbox().should('be.checked');
    amendmentsPage.amendmentFacilityValueCheckbox().should('be.checked');
    cy.clickContinueButton();
    cy.url().should('contain', 'cover-end-date');

    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateDayInput(), dateConstants.tomorrowDay);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateMonthInput(), dateConstants.tomorrowMonth);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateYearInput(), dateConstants.tomorrowYear);
    cy.clickContinueButton();

    errorSummary().contains('The new cover end date cannot be the same as the current cover end date');
    amendmentsPage.errorMessage().contains('The new cover end date cannot be the same as the current cover end date');

    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateDayInput(), dateConstants.threeDaysDay);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateMonthInput(), dateConstants.threeDaysMonth);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateYearInput(), dateConstants.threeDaysYear);
    cy.clickContinueButton();

    cy.url().should('contain', 'facility-value');
    cy.keyboardInput(amendmentsPage.amendmentFacilityValueInput(), '123');

    cy.clickContinueButton();

    errorSummary().contains('The new facility value cannot be the same as the current facility value');
    amendmentsPage.errorMessage().contains('The new facility value cannot be the same as the current facility value');

    cy.keyboardInput(amendmentsPage.amendmentFacilityValueInput(), '1234');

    cy.clickContinueButton();

    cy.url().should('contain', 'check-answers');
    cy.clickContinueButton();
  });

  it('should accept the facility value and decline cover end date and bank should proceed', () => {
    cy.login(UNDERWRITER_MANAGER_1);
    cy.visit(relative(`/case/${dealId}/underwriting`));

    pages.underwritingPage.addAmendmentUnderwriterManagerDecisionButton().contains('Add decision');
    pages.underwritingPage.addAmendmentUnderwriterManagerDecisionButton().click({ force: true });

    cy.url().should('contain', '/cover-end-date/managers-decision');
    amendmentsPage.underWriterManagerDecisionRadioInputDecline().click();
    cy.clickContinueButton();

    cy.url().should('contain', '/facility-value/managers-decision');
    amendmentsPage.underWriterManagerDecisionRadioInputApproveWithConditions().click();
    cy.clickContinueButton();
    cy.url().should('contain', '/managers-conditions');

    cy.keyboardInput(amendmentsPage.amendmentsManagersDecisionConditions(), 'This is a list of conditions');
    cy.keyboardInput(amendmentsPage.amendmentsManagersDecisionReasons(), 'This is the reason for declining the amendment');
    cy.keyboardInput(amendmentsPage.amendmentsManagersDecisionComments(), 'This is a comment visible only to UKEF staff');

    cy.clickContinueButton();
    cy.url().should('contain', '/managers-conditions/summary');
    amendmentsPage.amendmentSendToBankButton().should('be.visible');

    amendmentsPage.amendmentSendToBankButton().click();

    cy.login(PIM_USER_1);
    cy.visit(relative(`/case/${dealId}/underwriting`));

    amendmentsPage.addBankDecisionButton().should('exist');
    amendmentsPage.addBankDecisionButton().click({ force: true });

    amendmentsPage.amendmentBankChoiceProceedRadio().click();
    cy.clickContinueButton();

    cy.url().should('contain', '/banks-decision/received-date');
    cy.keyboardInput(amendmentsPage.amendmentBankDecisionReceivedDateDay(), '05');
    cy.keyboardInput(amendmentsPage.amendmentBankDecisionReceivedDateMonth(), '06');
    cy.keyboardInput(amendmentsPage.amendmentBankDecisionReceivedDateYear(), '2022');
    cy.clickContinueButton();

    cy.url().should('contain', '/banks-decision/effective-date');
    cy.keyboardInput(amendmentsPage.amendmentBankDecisionEffectiveDateDay(), '05');
    cy.keyboardInput(amendmentsPage.amendmentBankDecisionEffectiveDateMonth(), '06');
    cy.keyboardInput(amendmentsPage.amendmentBankDecisionEffectiveDateYear(), '2022');
    cy.clickContinueButton();

    cy.url().should('contain', '/banks-decision/check-answers');
    cy.clickContinueButton();
  });

  it('should throw an error if keeping the same facility value.  should submit amendment if same coverEndDate but different facility value', () => {
    cy.login(PIM_USER_1);
    const facilityId = dealFacilities[0]._id;
    cy.visit(relative(`/case/${dealId}/facility/${facilityId}`));

    facilityPage.facilityTabAmendments().click();
    amendmentsPage.addAmendmentButton().should('exist');
    amendmentsPage.addAmendmentButton().contains('Add an amendment request');
    amendmentsPage.addAmendmentButton().click();
    cy.url().should('contain', 'request-date');

    cy.keyboardInput(amendmentsPage.amendmentRequestDayInput(), dateConstants.todayDay);
    cy.keyboardInput(amendmentsPage.amendmentRequestMonthInput(), dateConstants.todayMonth);
    cy.keyboardInput(amendmentsPage.amendmentRequestYearInput(), dateConstants.todayYear);
    cy.clickContinueButton();

    cy.url().should('contain', 'request-approval');
    // manual approval
    amendmentsPage.amendmentRequestApprovalYes().click();
    cy.clickContinueButton();

    cy.url().should('contain', 'amendment-options');
    amendmentsPage.amendmentCoverEndDateCheckbox().should('not.be.checked');
    amendmentsPage.amendmentFacilityValueCheckbox().should('not.be.checked');

    // update both the cover end date and the facility value
    amendmentsPage.amendmentCoverEndDateCheckbox().click();
    amendmentsPage.amendmentFacilityValueCheckbox().click();
    amendmentsPage.amendmentCoverEndDateCheckbox().should('be.checked');
    amendmentsPage.amendmentFacilityValueCheckbox().should('be.checked');
    cy.clickContinueButton();
    cy.url().should('contain', 'cover-end-date');

    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateDayInput(), dateConstants.threeYearsDay);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateMonthInput(), dateConstants.threeYearsMonth);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateYearInput(), dateConstants.threeYearsYear);
    cy.clickContinueButton();

    cy.url().should('contain', 'facility-value');
    cy.keyboardInput(amendmentsPage.amendmentFacilityValueInput(), '1234');

    cy.clickContinueButton();

    errorSummary().contains('The new facility value cannot be the same as the current facility value');
    amendmentsPage.errorMessage().contains('The new facility value cannot be the same as the current facility value');

    cy.keyboardInput(amendmentsPage.amendmentFacilityValueInput(), '12345');

    cy.clickContinueButton();

    cy.url().should('contain', 'check-answers');
    cy.clickContinueButton();
  });

  it('should accept the coverEndDate and accept facility value and bank should withdraw', () => {
    cy.login(UNDERWRITER_MANAGER_1);
    cy.visit(relative(`/case/${dealId}/underwriting`));

    pages.underwritingPage.addAmendmentUnderwriterManagerDecisionButton().contains('Add decision');
    pages.underwritingPage.addAmendmentUnderwriterManagerDecisionButton().click({ force: true });

    cy.url().should('contain', '/cover-end-date/managers-decision');
    amendmentsPage.underWriterManagerDecisionRadioInputApproveWithConditions().click();
    cy.clickContinueButton();

    cy.url().should('contain', '/facility-value/managers-decision');
    amendmentsPage.underWriterManagerDecisionRadioInputApproveWithConditions().click();
    cy.clickContinueButton();
    cy.url().should('contain', '/managers-conditions');

    cy.keyboardInput(amendmentsPage.amendmentsManagersDecisionConditions(), 'This is a list of conditions');
    cy.keyboardInput(amendmentsPage.amendmentsManagersDecisionComments(), 'This is a comment visible only to UKEF staff');

    cy.clickContinueButton();
    cy.url().should('contain', '/managers-conditions/summary');
    amendmentsPage.amendmentSendToBankButton().should('be.visible');

    amendmentsPage.amendmentSendToBankButton().click();

    cy.login(PIM_USER_1);
    cy.visit(relative(`/case/${dealId}/underwriting`));

    amendmentsPage.addBankDecisionButton().should('exist');
    amendmentsPage.addBankDecisionButton().click({ force: true });

    amendmentsPage.amendmentBankChoiceWithdrawRadio().click();
    cy.clickContinueButton();

    cy.url().should('contain', '/banks-decision/received-date');
    cy.keyboardInput(amendmentsPage.amendmentBankDecisionReceivedDateDay(), '05');
    cy.keyboardInput(amendmentsPage.amendmentBankDecisionReceivedDateMonth(), '06');
    cy.keyboardInput(amendmentsPage.amendmentBankDecisionReceivedDateYear(), '2022');
    cy.clickContinueButton();

    cy.url().should('contain', '/banks-decision/check-answers');
    cy.clickContinueButton();
  });

  it('should submit an amendment without errors with same values as last request as was withdrawn by bank', () => {
    cy.login(PIM_USER_1);
    const facilityId = dealFacilities[0]._id;
    cy.visit(relative(`/case/${dealId}/facility/${facilityId}`));

    facilityPage.facilityTabAmendments().click();
    amendmentsPage.addAmendmentButton().should('exist');
    amendmentsPage.addAmendmentButton().contains('Add an amendment request');
    amendmentsPage.addAmendmentButton().click();
    cy.url().should('contain', 'request-date');

    cy.keyboardInput(amendmentsPage.amendmentRequestDayInput(), dateConstants.todayDay);
    cy.keyboardInput(amendmentsPage.amendmentRequestMonthInput(), dateConstants.todayMonth);
    cy.keyboardInput(amendmentsPage.amendmentRequestYearInput(), dateConstants.todayYear);
    cy.clickContinueButton();

    cy.url().should('contain', 'request-approval');
    // manual approval
    amendmentsPage.amendmentRequestApprovalYes().click();
    cy.clickContinueButton();

    cy.url().should('contain', 'amendment-options');
    amendmentsPage.amendmentCoverEndDateCheckbox().should('not.be.checked');
    amendmentsPage.amendmentFacilityValueCheckbox().should('not.be.checked');

    // update both the cover end date and the facility value
    amendmentsPage.amendmentCoverEndDateCheckbox().click();
    amendmentsPage.amendmentFacilityValueCheckbox().click();
    amendmentsPage.amendmentCoverEndDateCheckbox().should('be.checked');
    amendmentsPage.amendmentFacilityValueCheckbox().should('be.checked');
    cy.clickContinueButton();
    cy.url().should('contain', 'cover-end-date');

    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateDayInput(), dateConstants.threeDaysDay);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateMonthInput(), dateConstants.threeDaysMonth);
    cy.keyboardInput(amendmentsPage.amendmentCoverEndDateYearInput(), dateConstants.threeDaysYear);
    cy.clickContinueButton();

    cy.url().should('contain', 'facility-value');

    cy.keyboardInput(amendmentsPage.amendmentFacilityValueInput(), '1234');

    cy.clickContinueButton();

    cy.url().should('contain', 'check-answers');
    cy.clickContinueButton();
  });
});