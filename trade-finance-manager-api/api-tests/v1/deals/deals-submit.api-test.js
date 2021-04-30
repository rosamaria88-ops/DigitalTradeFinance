const app = require('../../../src/createApp');
const api = require('../../api')(app);

const acbsController = require('../../../src/v1/controllers/acbs.controller');

// Added multiple versions of mock deal as submit-deal is mutating the mocks somewhere
const MOCK_DEAL = require('../../../src/v1/__mocks__/mock-deal');
const MOCK_DEAL_NO_PARTY_DB = require('../../../src/v1/__mocks__/mock-deal-no-party-db');
const MOCK_DEAL_NO_COMPANIES_HOUSE = require('../../../src/v1/__mocks__/mock-deal-no-companies-house');
const MOCK_DEAL_FACILITIES_USD_CURRENCY = require('../../../src/v1/__mocks__/mock-deal-facilities-USD-currency');
const MOCK_DEAL_MIN = require('../../../src/v1/__mocks__/mock-deal-MIN');
const MOCK_DEAL_MIA_SUBMITTED = require('../../../src/v1/__mocks__/mock-deal-MIA-submitted');
const MOCK_MIA_NOT_SUBMITTED = require('../../../src/v1/__mocks__/mock-deal-MIA-not-submitted');
const MOCK_CURRENCY_EXCHANGE_RATE = require('../../../src/v1/__mocks__/mock-currency-exchange-rate');
const MOCK_DEAL_AIN_SUBMITTED = require('../../../src/v1/__mocks__/mock-deal-AIN-submitted');
const MOCK_DEAL_AIN_SUBMITTED_NON_GBP_CONTRACT_VALUE = require('../../../src/v1/__mocks__/mock-deal-AIN-submitted-non-gbp-contract-value');
const MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED = require('../../../src/v1/__mocks__/mock-deal-AIN-second-submit-facilities-unissued-to-issued');
const MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED = require('../../../src/v1/__mocks__/mock-deal-MIA-second-submit-facilities-unissued-to-issued');
const DEFAULTS = require('../../../src/v1/defaults');
const CONSTANTS = require('../../../src/constants');

const calculateUkefExposure = require('../../../src/v1/helpers/calculateUkefExposure');

jest.mock('../../../src/v1/controllers/acbs.controller', () => ({
  issueAcbsFacilities: jest.fn(),
}));

describe('/v1/deals', () => {
  beforeEach(() => {
    acbsController.issueAcbsFacilities.mockClear();
  });

  describe('PUT /v1/deals/:dealId/submit', () => {
    it('404s submission for unknown id', async () => {
      const { status } = await api.put({ dealId: '12345678910' }).to('/v1/deals/submit');

      expect(status).toEqual(404);
    });

    it('returns the requested resource if no companies house no given', async () => {
      const { status, body } = await api.put({ dealId: MOCK_DEAL_NO_COMPANIES_HOUSE._id }).to('/v1/deals/submit');
      // Remove bonds & loans as they are returned mutated so will not match
      const { bondTransactions, loanTransactions, ...mockDealWithoutFacilities } = MOCK_DEAL_NO_COMPANIES_HOUSE;

      const tfmDeal = {
        dealSnapshot: mockDealWithoutFacilities,
        tfm: {
          parties: {
            exporter: {
              partyUrn: '',
            },
          },
          tasks: DEFAULTS.TASKS.AIN,
        },
      };

      expect(status).toEqual(200);
      expect(body).toMatchObject(tfmDeal);
    });

    it('returns the requested resource without partyUrn if not matched', async () => {
      const { status, body } = await api.put({ dealId: MOCK_DEAL_NO_PARTY_DB._id }).to('/v1/deals/submit');
      // Remove bonds & loans as they are returned mutated so will not match
      const { bondTransactions, loanTransactions, ...mockDealWithoutFacilities } = MOCK_DEAL_NO_PARTY_DB;


      const tfmDeal = {
        dealSnapshot: mockDealWithoutFacilities,
        tfm: {
          parties: {
            exporter: {
              partyUrn: '',
            },
          },
          tasks: DEFAULTS.TASKS.AIN,
        },
      };

      expect(status).toEqual(200);
      expect(body).toMatchObject(tfmDeal);
    });

    it('returns the requested resource with partyUrn if matched', async () => {
      const { status, body } = await api.put({ dealId: MOCK_DEAL._id }).to('/v1/deals/submit');
      // Remove bonds & loans as they are returned mutated so will not match
      const { bondTransactions, loanTransactions, ...mockDealWithoutFacilities } = MOCK_DEAL;

      const tfmDeal = {
        dealSnapshot: mockDealWithoutFacilities,
        tfm: {
          parties: {
            exporter: {
              partyUrn: 'testPartyUrn',
            },
          },
          tasks: DEFAULTS.TASKS.AIN,
        },
      };

      expect(status).toEqual(200);
      expect(body).toMatchObject(tfmDeal);
    });

    describe('facilities', () => {
      it('adds facilityValueInGBP to all facilities that are NOT in GBP', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL_FACILITIES_USD_CURRENCY._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const bond = body.dealSnapshot.bondTransactions.items[0];
        expect(bond.tfm.facilityValueInGBP).toEqual(Number(bond.facilitySnapshot.facilityValue) * MOCK_CURRENCY_EXCHANGE_RATE);

        const loan = body.dealSnapshot.loanTransactions.items[0];
        expect(loan.tfm.facilityValueInGBP).toEqual(Number(loan.facilitySnapshot.facilityValue) * MOCK_CURRENCY_EXCHANGE_RATE);
      });

      describe('all bonds that are NOT in GBP', () => {
        it('adds ukefExposure and ukefExposureCalculationTimestamp', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_FACILITIES_USD_CURRENCY._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const bond = body.dealSnapshot.bondTransactions.items[0];
          const facilityValueInGBP = Number(bond.facilitySnapshot.facilityValue) * MOCK_CURRENCY_EXCHANGE_RATE;

          const calculatedUkefExposureObj = calculateUkefExposure(facilityValueInGBP, bond.facilitySnapshot.coveredPercentage);

          expect(bond.tfm.ukefExposure).toEqual(calculatedUkefExposureObj.ukefExposure);
          expect(typeof bond.tfm.ukefExposureCalculationTimestamp).toEqual('string');
        });
      });

      describe('all loans that are NOT in GBP', () => {
        it('adds ukefExposure and ukefExposureCalculationTimestamp', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_FACILITIES_USD_CURRENCY._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const loan = body.dealSnapshot.loanTransactions.items[0];
          const facilityValueInGBP = Number(loan.facilitySnapshot.facilityValue) * MOCK_CURRENCY_EXCHANGE_RATE;

          const calculatedUkefExposureObj = calculateUkefExposure(facilityValueInGBP, loan.facilitySnapshot.coveredPercentage);

          expect(loan.tfm.ukefExposure).toEqual(calculatedUkefExposureObj.ukefExposure);
          expect(typeof loan.tfm.ukefExposureCalculationTimestamp).toEqual('string');
        });
      });

      describe('all bonds that are in GBP', () => {
        it('adds original ukefExposure and ukefExposureCalculationTimestamp as deal submission date', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const bond = body.dealSnapshot.bondTransactions.items[0];

          expect(bond.tfm.ukefExposure).toEqual(Number(bond.tfm.ukefExposure));
          expect(bond.tfm.ukefExposureCalculationTimestamp).toEqual(MOCK_DEAL.details.submissionDate);
        });
      });

      describe('all loans that are in GBP', () => {
        it('adds original ukefExposure and ukefExposureCalculationTimestamp as deal submission date', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const loan = body.dealSnapshot.loanTransactions.items[0];

          expect(loan.tfm.ukefExposure).toEqual(Number(loan.tfm.ukefExposure));
          expect(loan.tfm.ukefExposureCalculationTimestamp).toEqual(MOCK_DEAL.details.submissionDate);
        });
      });

      it('defaults all facilities riskProfile to `Flat`', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const bond = body.dealSnapshot.loanTransactions.items[0];
        const loan = body.dealSnapshot.bondTransactions.items[0];

        expect(loan.tfm.riskProfile).toEqual('Flat');
        expect(bond.tfm.riskProfile).toEqual('Flat');
      });
    });

    describe('deal/case tasks', () => {
      describe('when deal is AIN', () => {
        it('adds default AIN tasks to the deal', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_NO_COMPANIES_HOUSE._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.tasks).toEqual(DEFAULTS.TASKS.AIN);
        });
      });

      describe('when deal is MIA', () => {
        it('adds default MIA tasks to the deal', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_MIA_SUBMITTED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.tasks).toEqual(DEFAULTS.TASKS.MIA);
        });
      });

      describe('when deal is MIN', () => {
        it('adds NOT add tasks to the deal', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_MIN._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.tasks).toBeUndefined();
        });
      });
    });

    describe('currency NOT GBP', () => {
      it('should convert supplyContractValue to GBP when currency is NOT GBP', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SUBMITTED_NON_GBP_CONTRACT_VALUE._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const { supplyContractValue } = MOCK_DEAL_AIN_SUBMITTED_NON_GBP_CONTRACT_VALUE.submissionDetails;

        const strippedContractValue = Number(supplyContractValue.replace(/,/g, ''));

        const expected = strippedContractValue * MOCK_CURRENCY_EXCHANGE_RATE;

        expect(body.tfm.supplyContractValueInGBP).toEqual(expected);
      });
    });

    describe('exporter credit rating', () => {
      describe('when deal is AIN', () => {
        it('should add exporterCreditRating to the deal', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SUBMITTED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.exporterCreditRating).toEqual(DEFAULTS.CREDIT_RATING.AIN);
        });
      });

      describe('when deal is NOT AIN', () => {
        it('should add exporterCreditRating to the deal', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_MIN._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.exporterCreditRating).toBeUndefined();
        });
      });
    });

    describe('lossGivenDefault and probabilityOfDefault', () => {
      it('should be added to AIN deals', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SUBMITTED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);
        expect(body.tfm.lossGivenDefault).toEqual(DEFAULTS.LOSS_GIVEN_DEFAULT);
        expect(body.tfm.probabilityOfDefault).toEqual(DEFAULTS.PROBABILITY_OF_DEFAULT);
      });

      it('should be added to MIA deals', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIA_SUBMITTED._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);
        expect(body.tfm.lossGivenDefault).toEqual(DEFAULTS.LOSS_GIVEN_DEFAULT);
        expect(body.tfm.probabilityOfDefault).toEqual(DEFAULTS.PROBABILITY_OF_DEFAULT);
      });

      it('should be added to MIN deals', async () => {
        const { status, body } = await api.put({ dealId: MOCK_DEAL_MIN._id }).to('/v1/deals/submit');

        expect(status).toEqual(200);
        expect(body.tfm.lossGivenDefault).toEqual(DEFAULTS.LOSS_GIVEN_DEFAULT);
        expect(body.tfm.probabilityOfDefault).toEqual(DEFAULTS.PROBABILITY_OF_DEFAULT);
      });
    });

    describe('TFM deal stage', () => {
      describe('when deal is AIN', () => {
        describe('when portal deal status is `Submitted`', () => {
          it('should add `Confirmed` tfm stage', async () => {
            const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SUBMITTED._id }).to('/v1/deals/submit');

            expect(status).toEqual(200);
            expect(body.tfm.stage).toEqual(CONSTANTS.DEALS.DEAL_STAGE_TFM.CONFIRMED);
          });
        });

        describe('when deal status is NOT `Submitted` ', () => {
          it('should NOT add tfm stage', async () => {
            const { status, body } = await api.put({ dealId: MOCK_DEAL_NO_COMPANIES_HOUSE._id }).to('/v1/deals/submit');

            expect(status).toEqual(200);
            expect(body.tfm.stage).toBeUndefined();
          });
        });
      });

      describe('when deal is MIA', () => {
        describe('when portal deal status is `Submitted`', () => {
          it('should add `Application` tfm stage', async () => {
            const { status, body } = await api.put({ dealId: MOCK_DEAL_MIA_SUBMITTED._id }).to('/v1/deals/submit');

            expect(status).toEqual(200);
            expect(body.tfm.stage).toEqual(CONSTANTS.DEALS.DEAL_STAGE_TFM.APPLICATION);
          });
        });

        describe('when deal status is NOT `Submitted` ', () => {
          it('should NOT add tfm stage', async () => {
            const { status, body } = await api.put({ dealId: MOCK_MIA_NOT_SUBMITTED._id }).to('/v1/deals/submit');

            expect(status).toEqual(200);
            expect(body.tfm.stage).toBeUndefined();
          });
        });
      });

      describe('when deal is MIN', () => {
        it('should NOT add tfm stage', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_MIN._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.stage).toBeUndefined();
        });
      });
    });

    it('adds empty TFM history to deal', async () => {
      const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SUBMITTED._id }).to('/v1/deals/submit');

      expect(status).toEqual(200);
      expect(body.tfm.history).toEqual({
        tasks: [],
      });
    });

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

        it('should update loan.exposurePeriodInMonths', async () => {)
          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);

          const updatedLoan = body.dealSnapshot.loanTransactions.items[0];

          const expected = 12; // value is declared in mock api response.
          expect(updatedLoan.tfm.exposurePeriodInMonths).toEqual(expected);
        });
      });

      it('should update ACBS`', async () => {
        const { status } = await api.put({ dealId: MOCK_DEAL_AIN_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');
        expect(status).toEqual(200);

        expect(acbsController.issueAcbsFacilities).toHaveBeenCalled();
      });
    });

    describe('MIA deal - on second submission', () => {
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

      it('should not update ACBS`', async () => {
        const { status } = await api.put({ dealId: MOCK_DEAL_MIA_SECOND_SUBMIT_FACILITIES_UNISSUED_TO_ISSUED._id }).to('/v1/deals/submit');
        expect(status).toEqual(200);

        expect(acbsController.issueAcbsFacilities).not.toHaveBeenCalled();
      });
    });

    describe('eStore', () => {
      describe('when deal is AIN', () => {
        it('adds default AIN tasks to the deal', async () => {
          const { status, body } = await api.put({ dealId: MOCK_DEAL_AIN_SUBMITTED._id }).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.estore).toBeDefined();
        });
      });
    });
  });
});
