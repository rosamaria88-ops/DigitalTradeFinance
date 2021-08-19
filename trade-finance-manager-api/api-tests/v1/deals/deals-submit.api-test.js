const moment = require('moment');
const app = require('../../../src/createApp');
const api = require('../../api')(app);
const externalApis = require('../../../src/v1/api');
const acbsController = require('../../../src/v1/controllers/acbs.controller');
const { mapDealProduct } = require('../../../src/v1/controllers/deal.add-product');

const DEFAULTS = require('../../../src/v1/defaults');
const CONSTANTS = require('../../../src/constants');

const MOCK_DEAL = require('../../../src/v1/__mocks__/mock-deal');
const MOCK_DEAL_NO_PARTY_DB = require('../../../src/v1/__mocks__/mock-deal-no-party-db');
const MOCK_DEAL_NO_COMPANIES_HOUSE = require('../../../src/v1/__mocks__/mock-deal-no-companies-house');
const MOCK_DEAL_MIN = require('../../../src/v1/__mocks__/mock-deal-MIN');
const MOCK_DEAL_MIA_SUBMITTED = require('../../../src/v1/__mocks__/mock-deal-MIA-submitted');
const MOCK_MIA_NOT_SUBMITTED = require('../../../src/v1/__mocks__/mock-deal-MIA-not-submitted');
const MOCK_CURRENCY_EXCHANGE_RATE = require('../../../src/v1/__mocks__/mock-currency-exchange-rate');
const MOCK_DEAL_AIN_SUBMITTED = require('../../../src/v1/__mocks__/mock-deal-AIN-submitted');
const MOCK_DEAL_AIN_SUBMITTED_NON_GBP_CONTRACT_VALUE = require('../../../src/v1/__mocks__/mock-deal-AIN-submitted-non-gbp-contract-value');
const MOCK_NOTIFY_EMAIL_RESPONSE = require('../../../src/v1/__mocks__/mock-notify-email-response');

const MOCK_GEF_DEAL = require('../../../src/v1/__mocks__/mock-gef-deal');
const MOCK_GEF_DEAL_MIA = require('../../../src/v1/__mocks__/mock-gef-deal-MIA');

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

const createSubmitBody = (mockDeal) => ({
  dealId: mockDeal._id,
  dealType: mockDeal.dealType,
});

describe('/v1/deals', () => {
  beforeEach(() => {
    acbsController.issueAcbsFacilities.mockClear();
    externalApis.getFacilityExposurePeriod.mockClear();
    externalApis.getPremiumSchedule.mockClear();

    sendEmailApiSpy.mockClear();
    externalApis.sendEmail = sendEmailApiSpy;
  });

  describe('PUT /v1/deals/:dealId/submit', () => {
    it('404s submission for unknown id', async () => {
      const { status } = await api.put({ dealId: '12345678910' }).to('/v1/deals/submit');

      expect(status).toEqual(404);
    });

    it('returns the requested resource if no companies house no given', async () => {
      const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_NO_COMPANIES_HOUSE)).to('/v1/deals/submit');
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
      const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_NO_PARTY_DB)).to('/v1/deals/submit');
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
      const { status, body } = await api.put(createSubmitBody(MOCK_DEAL)).to('/v1/deals/submit');
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

    describe('currency NOT GBP', () => {
      it('should convert supplyContractValue to GBP', async () => {
        const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_AIN_SUBMITTED_NON_GBP_CONTRACT_VALUE)).to('/v1/deals/submit');

        expect(status).toEqual(200);

        const { supplyContractValue } = MOCK_DEAL_AIN_SUBMITTED_NON_GBP_CONTRACT_VALUE.submissionDetails;

        const strippedContractValue = Number(supplyContractValue.replace(/,/g, ''));

        const expected = strippedContractValue * MOCK_CURRENCY_EXCHANGE_RATE;

        expect(body.tfm.supplyContractValueInGBP).toEqual(expected);
      });
    });

    it('should generate BSS product (based on facility products)', async () => {
      const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_AIN_SUBMITTED)).to('/v1/deals/submit');

      expect(status).toEqual(200);

      const facilities = [
        ...MOCK_DEAL_AIN_SUBMITTED.bondTransactions.items,
        ...MOCK_DEAL_AIN_SUBMITTED.loanTransactions.items,
      ];

      const mockDeal = {
        ...MOCK_DEAL_AIN_SUBMITTED,
        facilities,
      };

      const expected = mapDealProduct(mockDeal);

      expect(body.tfm.product).toEqual(expected);
    });

    it('should generate GEF product (based on dealType)', async () => {
      const { status, body } = await api.put(createSubmitBody(MOCK_GEF_DEAL)).to('/v1/deals/submit');

      expect(status).toEqual(200);

      const expected = mapDealProduct(MOCK_GEF_DEAL);

      expect(body.tfm.product).toEqual(expected);
    });

    describe('exporterCreditRating (BSS deal)', () => {
      describe('when deal is AIN', () => {
        it('should add exporterCreditRating to the deal', async () => {
          const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_AIN_SUBMITTED)).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.exporterCreditRating).toEqual(DEFAULTS.CREDIT_RATING.AIN);
        });
      });

      describe('when deal is NOT AIN', () => {
        it('should NOT add exporterCreditRating to the deal', async () => {
          const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_MIA_SUBMITTED)).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.exporterCreditRating).toBeUndefined();
        });
      });
    });

    describe('exporterCreditRating (GEF deal)', () => {
      describe('when deal is AIN', () => {
        it('should add exporterCreditRating to the deal', async () => {
          const { status, body } = await api.put(createSubmitBody(MOCK_GEF_DEAL)).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.exporterCreditRating).toEqual(DEFAULTS.CREDIT_RATING.AIN);
        });
      });

      describe('when deal is NOT AIN', () => {
        it('should NOT add exporterCreditRating to the deal', async () => {
          const { status, body } = await api.put(createSubmitBody(MOCK_GEF_DEAL_MIA)).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.exporterCreditRating).toBeUndefined();
        });
      });
    });

    describe('lossGivenDefault and probabilityOfDefault (BSS deal)', () => {
      it('should add defaults to AIN deals', async () => {
        const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_AIN_SUBMITTED)).to('/v1/deals/submit');

        expect(status).toEqual(200);
        expect(body.tfm.lossGivenDefault).toEqual(DEFAULTS.LOSS_GIVEN_DEFAULT);
        expect(body.tfm.probabilityOfDefault).toEqual(DEFAULTS.PROBABILITY_OF_DEFAULT);
      });

      it('should add defaults to MIA deals', async () => {
        const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_MIA_SUBMITTED)).to('/v1/deals/submit');

        expect(status).toEqual(200);
        expect(body.tfm.lossGivenDefault).toEqual(DEFAULTS.LOSS_GIVEN_DEFAULT);
        expect(body.tfm.probabilityOfDefault).toEqual(DEFAULTS.PROBABILITY_OF_DEFAULT);
      });
    });

    describe('lossGivenDefault and probabilityOfDefault (GEF deal)', () => {
      it('should default lossGivenDefault and use probabilityOfDefault from deal for AIN deals', async () => {
        const { status, body } = await api.put(createSubmitBody(MOCK_GEF_DEAL)).to('/v1/deals/submit');

        expect(status).toEqual(200);
        expect(body.tfm.lossGivenDefault).toEqual(DEFAULTS.LOSS_GIVEN_DEFAULT);
        expect(body.tfm.probabilityOfDefault).toEqual(MOCK_GEF_DEAL.exporter.probabilityOfDefault);
      });

      it('should default lossGivenDefault and use probabilityOfDefault from deal for MIA deals', async () => {
        const { status, body } = await api.put(createSubmitBody(MOCK_GEF_DEAL_MIA)).to('/v1/deals/submit');

        expect(status).toEqual(200);
        expect(body.tfm.lossGivenDefault).toEqual(DEFAULTS.LOSS_GIVEN_DEFAULT);
        expect(body.tfm.probabilityOfDefault).toEqual(MOCK_GEF_DEAL.exporter.probabilityOfDefault);
      });
    });

    describe('TFM deal stage', () => {
      describe('when deal is AIN', () => {
        describe('when portal deal status is `Submitted`', () => {
          it('should add `Confirmed` tfm stage', async () => {
            const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_AIN_SUBMITTED)).to('/v1/deals/submit');

            expect(status).toEqual(200);

            expect(body.tfm.stage).toEqual(CONSTANTS.DEALS.DEAL_STAGE_TFM.CONFIRMED);
          });
        });

        describe('when deal status is NOT `Submitted`', () => {
          it('should NOT add tfm stage', async () => {
            const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_NO_COMPANIES_HOUSE)).to('/v1/deals/submit');

            expect(status).toEqual(200);
            expect(body.tfm.stage).toBeUndefined();
          });
        });
      });

      describe('when deal is MIA', () => {
        describe('when portal deal status is `Submitted`', () => {
          it('should add `Application` tfm stage', async () => {
            const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_MIA_SUBMITTED)).to('/v1/deals/submit');

            expect(status).toEqual(200);
            expect(body.tfm.stage).toEqual(CONSTANTS.DEALS.DEAL_STAGE_TFM.APPLICATION);
          });
        });

        describe('when deal status is NOT `Submitted` ', () => {
          it('should NOT add tfm stage', async () => {
            const { status, body } = await api.put(createSubmitBody(MOCK_MIA_NOT_SUBMITTED)).to('/v1/deals/submit');

            expect(status).toEqual(200);
            expect(body.tfm.stage).toBeUndefined();
          });
        });
      });

      describe('when deal is MIN', () => {
        it('should NOT add tfm stage', async () => {
          const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_MIN)).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.stage).toBeUndefined();
        });
      });
    });

    it('adds dateReceived to deal.tfm from deal submissionDate', async () => {
      const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_AIN_SUBMITTED)).to('/v1/deals/submit');

      expect(status).toEqual(200);

      const utc = moment(parseInt(MOCK_DEAL_AIN_SUBMITTED.details.submissionDate, 10));
      const localisedTimestamp = utc.tz('Europe/London');

      const expectedDateReceived = localisedTimestamp.format('DD-MM-YYYY');

      expect(body.tfm.dateReceived).toEqual(expectedDateReceived);
    });

    it('adds empty TFM history to deal', async () => {
      const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_AIN_SUBMITTED)).to('/v1/deals/submit');

      expect(status).toEqual(200);
      expect(body.tfm.history).toEqual({
        tasks: [],
        emails: [],
      });
    });

    describe('eStore', () => {
      describe('when deal is AIN', () => {
        it('adds estore object to the deal', async () => {
          const { status, body } = await api.put(createSubmitBody(MOCK_DEAL_AIN_SUBMITTED)).to('/v1/deals/submit');

          expect(status).toEqual(200);
          expect(body.tfm.estore).toBeDefined();
        });
      });
    });

    describe('when dealType is `GEF`', () => {
      it('should return 200', async () => {
        const { status } = await api.put(createSubmitBody(MOCK_GEF_DEAL)).to('/v1/deals/submit');

        expect(status).toEqual(200);
      });
    });
  });
});
