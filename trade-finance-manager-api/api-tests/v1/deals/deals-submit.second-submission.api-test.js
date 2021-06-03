const app = require('../../../src/createApp');
const api = require('../../api')(app);
const externalApis = require('../../../src/v1/api');
const acbsController = require('../../../src/v1/controllers/acbs.controller');
const dealController = require('../../../src/v1/controllers/deal.controller');
const getGuaranteeDates = require('../../../src/v1/helpers/get-guarantee-dates');
const CONSTANTS = require('../../../src/constants');

const MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED = require('../../../src/v1/__mocks__/mock-deal-AIN-second-submit-facilities-unissued-to-issued');
const MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED = require('../../../src/v1/__mocks__/mock-deal-MIA-second-submit-facilities-unissued-to-issued');
const MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED = require('../../../src/v1/__mocks__/mock-deal-MIN-second-submit-facilities-unissued-to-issued');
const MOCK_MIA_SECOND_SUBMIT = require('../../../src/v1/__mocks__/mock-deal-MIA-second-submit');
const MOCK_NOTIFY_EMAIL_RESPONSE = require('../../../src/v1/__mocks__/mock-notify-email-response');
const MOCK_PREMIUM_SCHEUDLE_RESPONSE = require('../../../src/v1/__mocks__/mock-premium-schedule-response');

const { capitalizeFirstLetter } = require('../../../src/utils/string');

const sendEmailApiSpy = jest.fn(() => Promise.resolve(
  MOCK_NOTIFY_EMAIL_RESPONSE,
));

jest.mock('../../../src/v1/controllers/acbs.controller', () => ({
  issueAcbsFacilities: jest.fn(),
}));

jest.mock('../../../src/v1/controllers/deal.controller', () => ({
  ...jest.requireActual('../../../src/v1/controllers/deal.controller'),
  submitACBSIfAllPartiesHaveUrn: jest.fn(),
}));


describe('/v1/deals', () => {
  beforeEach(() => {
    acbsController.issueAcbsFacilities.mockClear();
    externalApis.getFacilityExposurePeriod.mockClear();
    externalApis.getPremiumSchedule.mockClear();

    sendEmailApiSpy.mockClear();
    externalApis.sendEmail = sendEmailApiSpy;
  });

  describe('PUT /v1/deals/:dealId/submit', () => {
    describe('AIN deal - on second submission', () => {
      describe('when a facilityStage changes from `Unissued` to `Issued`', () => {
        it('should update bond status to `Acknowledged`', async () => {
          // check status before calling submit endpoint
          const initialBond = MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.bondTransactions.items[0];

          expect(initialBond.status).toEqual('Submitted');

          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const updatedBond = body.dealSnapshot.bondTransactions.items[0];
          expect(updatedBond.status).toEqual('Acknowledged by UKEF');
        });

        it('should update bond.exposurePeriodInMonths', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const updatedBond = body.dealSnapshot.bondTransactions.items[0];

          const expected = 12; // value is declared in mock api response.
          expect(updatedBond.tfm.exposurePeriodInMonths).toEqual(expected);
        });

        it('should add bond.facilityGuaranteeDates', async () => {
          const initialBond = MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.bondTransactions.items[0];
          const dealSubmissionDate = MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.details.submissionDate;

          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const updatedBond = body.dealSnapshot.bondTransactions.items[0];

          const expected = getGuaranteeDates(initialBond, dealSubmissionDate);
          expect(updatedBond.tfm.facilityGuaranteeDates).toEqual(expected);
        });

        it('should add bond.premiumSchedule', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const updatedBond = body.dealSnapshot.bondTransactions.items[0];

          const expected = MOCK_PREMIUM_SCHEUDLE_RESPONSE;
          expect(updatedBond.tfm.premiumSchedule).toEqual(expected);
        });
      });

      describe('when a facilityStage changes from `Conditional` to `Unconditional`', () => {
        it('should update loan status to `Acknowledged`', async () => {
          // check status before calling submit endpoint
          const initialLoan = MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.loanTransactions.items[0];
          expect(initialLoan.status).toEqual('Submitted');

          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const updatedLoan = body.dealSnapshot.loanTransactions.items[0];
          expect(updatedLoan.status).toEqual('Acknowledged by UKEF');
        });

        it('should update loan.exposurePeriodInMonths', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const updatedLoan = body.dealSnapshot.loanTransactions.items[0];

          const expected = 12; // value is declared in mock api response.
          expect(updatedLoan.tfm.exposurePeriodInMonths).toEqual(expected);
        });

        it('should add loan.facilityGuaranteeDates', async () => {
          const initialLoan = MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.loanTransactions.items[0];
          const dealSubmissionDate = MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.details.submissionDate;

          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const updatedLoan = body.dealSnapshot.loanTransactions.items[0];

          const expected = getGuaranteeDates(initialLoan, dealSubmissionDate);
          expect(updatedLoan.tfm.facilityGuaranteeDates).toEqual(expected);
        });

        it('should add loan.premiumSchedule', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const updatedLoan = body.dealSnapshot.loanTransactions.items[0];

          const expected = MOCK_PREMIUM_SCHEUDLE_RESPONSE;
          expect(updatedLoan.tfm.premiumSchedule).toEqual(expected);
        });
      });

      it('should send an email for each newly issued facility', async () => {
        const mockDeal = MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED;
        await api.put({ dealId: mockDeal._id }).to('/v1/deals/submit');

        const totalFacilities = mockDeal.facilities.length;

        expect(sendEmailApiSpy).toBeCalledTimes(totalFacilities);


        const expectedEmailVariables = (facility) => {
          const { facilityType, ukefFacilityID } = facility;

          return {
            exporterName: mockDeal.submissionDetails['supplier-name'],
            recipientName: mockDeal.details.maker.firstname,
            bankReferenceNumber: mockDeal.details.bankSupplyContractID,
            ukefDealID: mockDeal.details.ukefDealId,
            facilityType: capitalizeFirstLetter(facilityType),
            ukefFacilityID,
          };
        };

        const loan = mockDeal.loanTransactions.items[0];
        const bond = mockDeal.bondTransactions.items[0];

        const expectedCall = {
          templateId: CONSTANTS.EMAIL_TEMPLATE_IDS.ISSUED_FACILITY_RECEIVED,
          sendToEmailAddress: mockDeal.details.maker.email,
        };

        const expectedFirstCall = {
          ...expectedCall,
          emailVariables: expectedEmailVariables(bond),
        };

        const expectedSecondCall = {
          ...expectedCall,
          emailVariables: expectedEmailVariables(loan),
        };

        expect(sendEmailApiSpy.mock.calls[0]).toEqual([
          expectedFirstCall.templateId,
          expectedFirstCall.sendToEmailAddress,
          expectedFirstCall.emailVariables,
        ]);

        expect(sendEmailApiSpy.mock.calls[1]).toEqual([
          expectedSecondCall.templateId,
          expectedSecondCall.sendToEmailAddress,
          expectedSecondCall.emailVariables,
        ]);
      });

      it('should update ACBS for AIN`', async () => {
        const { status } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');
        expect(status).toEqual(200);

        expect(acbsController.issueAcbsFacilities).toHaveBeenCalled();
      });
    });

    describe('MIA deal - on second submission', () => {
      it('should update submissionType from MIA to MIN, add MINsubmissionDate and checkerMIN in the snapshot', async () => {
        // check submission type before submission
        expect(MOCK_MIA_SECOND_SUBMIT.details.submissionType).toEqual('Manual Inclusion Application');

        const mockPortalChecker = {
          bank: {
            id: '9',
            name: 'UKEF test bank (Delegated) (TFM)',
          },
          email: 'test@testing.com',
          firstname: 'Test',
          surname: 'User',
          roles: ['checker'],
          timezone: 'Europe/London',
          username: 'CHECKER-TFM',
        };

        const { status, body } = await api.put({
          dealId: MOCK_MIA_SECOND_SUBMIT._id,
          portalChecker: mockPortalChecker,
        }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        expect(body.dealSnapshot.details.submissionType).toEqual('Manual Inclusion Notice');
        expect(typeof body.dealSnapshot.details.manualInclusionNoticeSubmissionDate).toEqual('string');
        expect(body.dealSnapshot.details.checkerMIN).toEqual(mockPortalChecker);
        expect(dealController.submitACBSIfAllPartiesHaveUrn).toHaveBeenCalled();
      });

      it('should update bond status to `Acknowledged` if the facilityStage changes from `Unissued` to `Issued`', async () => {
        // check status before calling submit endpoint
        const initialBond = MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.bondTransactions.items[0];

        expect(initialBond.status).toEqual('Submitted');

        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedBond = body.dealSnapshot.bondTransactions.items[0];
        expect(updatedBond.status).toEqual('Acknowledged by UKEF');
      });

      it('should update loan status to `Acknowledged` if the facilityStage changes from `Conditional` to `Unconditional`', async () => {
        // check status before calling submit endpoint
        const initialLoan = MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.loanTransactions.items[0];
        expect(initialLoan.status).toEqual('Submitted');

        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedLoan = body.dealSnapshot.loanTransactions.items[0];
        expect(updatedLoan.status).toEqual('Acknowledged by UKEF');
      });

      it('should NOT update ACBS for MIA`', async () => {
        const { status } = await api.put({ dealId: MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');
        expect(status).toEqual(200);

        expect(acbsController.issueAcbsFacilities).not.toHaveBeenCalled();
      });

      it('should add bond.facilityGuaranteeDates', async () => {
        const initialBond = MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.bondTransactions.items[0];
        const dealSubmissionDate = MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.details.submissionDate;

        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedBond = body.dealSnapshot.bondTransactions.items[0];

        const expected = getGuaranteeDates(initialBond, dealSubmissionDate);
        expect(updatedBond.tfm.facilityGuaranteeDates).toEqual(expected);
      });

      it('should add bond.premiumSchedule', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedBond = body.dealSnapshot.bondTransactions.items[0];

        const expected = MOCK_PREMIUM_SCHEUDLE_RESPONSE;
        expect(updatedBond.tfm.premiumSchedule).toEqual(expected);
      });

      it('should add loan.facilityGuaranteeDates', async () => {
        const initialLoan = MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.loanTransactions.items[0];
        const dealSubmissionDate = MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.details.submissionDate;

        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedLoan = body.dealSnapshot.loanTransactions.items[0];

        const expected = getGuaranteeDates(initialLoan, dealSubmissionDate);
        expect(updatedLoan.tfm.facilityGuaranteeDates).toEqual(expected);
      });

      it('should add loan.premiumSchedule', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedLoan = body.dealSnapshot.loanTransactions.items[0];

        const expected = MOCK_PREMIUM_SCHEUDLE_RESPONSE;
        expect(updatedLoan.tfm.premiumSchedule).toEqual(expected);
      });

      it('should NOT send an email for each newly issued facility', async () => {
        const mockDeal = MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED;
        await api.put({ dealId: mockDeal._id }).to('/v1/deals/submit');

        expect(sendEmailApiSpy).toBeCalledTimes(0);
      });
    });

    describe('MIN deal - on second submission', () => {
      it('should add bond.facilityGuaranteeDates', async () => {
        const initialBond = MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.bondTransactions.items[0];
        const dealSubmissionDate = MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.details.submissionDate;

        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedBond = body.dealSnapshot.bondTransactions.items[0];

        const expected = getGuaranteeDates(initialBond, dealSubmissionDate);
        expect(updatedBond.tfm.facilityGuaranteeDates).toEqual(expected);
      });

      it('should add bond.premiumSchedule', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedBond = body.dealSnapshot.bondTransactions.items[0];

        const expected = MOCK_PREMIUM_SCHEUDLE_RESPONSE;
        expect(updatedBond.tfm.premiumSchedule).toEqual(expected);
      });

      it('should add loan.facilityGuaranteeDates', async () => {
        const initialLoan = MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.loanTransactions.items[0];
        const dealSubmissionDate = MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED.details.submissionDate;

        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedLoan = body.dealSnapshot.loanTransactions.items[0];

        const expected = getGuaranteeDates(initialLoan, dealSubmissionDate);
        expect(updatedLoan.tfm.facilityGuaranteeDates).toEqual(expected);
      });

      it('should add loan.premiumSchedule', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const updatedLoan = body.dealSnapshot.loanTransactions.items[0];

        const expected = MOCK_PREMIUM_SCHEUDLE_RESPONSE;
        expect(updatedLoan.tfm.premiumSchedule).toEqual(expected);
      });

      it('should update ACBS for MIN`', async () => {
        const { status } = await api.put({ dealId: MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');
        expect(status).toEqual(200);

        expect(acbsController.issueAcbsFacilities).toHaveBeenCalled();
      });

      it('should send an email for each newly issued facility', async () => {
        const mockDeal = MOCK_DEAL_MIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED;
        await api.put({ dealId: mockDeal._id }).to('/v1/deals/submit');

        const totalFacilities = mockDeal.facilities.length;

        expect(sendEmailApiSpy).toBeCalledTimes(totalFacilities);

        const expectedEmailVariables = (facility) => {
          const { facilityType, ukefFacilityID } = facility;

          return {
            exporterName: mockDeal.submissionDetails['supplier-name'],
            recipientName: mockDeal.details.maker.firstname,
            bankReferenceNumber: mockDeal.details.bankSupplyContractID,
            ukefDealID: mockDeal.details.ukefDealId,
            facilityType: capitalizeFirstLetter(facilityType),
            ukefFacilityID,
          };
        };

        const loan = mockDeal.loanTransactions.items[0];
        const bond = mockDeal.bondTransactions.items[0];

        const expectedCall = {
          templateId: CONSTANTS.EMAIL_TEMPLATE_IDS.ISSUED_FACILITY_RECEIVED,
          sendToEmailAddress: mockDeal.details.maker.email,
        };

        const expectedFirstCall = {
          ...expectedCall,
          emailVariables: expectedEmailVariables(bond),
        };

        const expectedSecondCall = {
          ...expectedCall,
          emailVariables: expectedEmailVariables(loan),
        };

        expect(sendEmailApiSpy.mock.calls[0]).toEqual([
          expectedFirstCall.templateId,
          expectedFirstCall.sendToEmailAddress,
          expectedFirstCall.emailVariables,
        ]);

        expect(sendEmailApiSpy.mock.calls[1]).toEqual([
          expectedSecondCall.templateId,
          expectedSecondCall.sendToEmailAddress,
          expectedSecondCall.emailVariables,
        ]);
      });
    });
  });
});
