const wipeDB = require('../../../wipeDB');
const aDeal = require('../../deal-builder');

const app = require('../../../../src/createApp');
const api = require('../../../api')(app);
const CONSTANTS = require('../../../../src/constants');

const mockUser = {
  _id: '123456789',
  username: 'temp',
  roles: [],
  bank: {
    id: '956',
    name: 'Barclays Bank',
  },
};

const newDeal = aDeal({
  details: {
    bankSupplyContractName: 'mock name',
    bankSupplyContractID: 'mock id',
  },
  editedBy: [],
  eligibility: {
    status: 'Not started',
    criteria: [{}],
  },
});

describe('/v1/tfm/deal/:id', () => {
  beforeEach(async () => {
    await wipeDB.wipe(['deals']);
    await wipeDB.wipe(['facilities']);
    await wipeDB.wipe(['tfm-deals']);
    await wipeDB.wipe(['tfm-facilities']);
  });

  describe('PUT /v1/tfm/deal/:id', () => {
    const dealUpdate = {
      tfm: {
        submissionDetails: {
          exporterPartyUrn: '12345',
        },
      },
    };

    it('404s if updating an unknown id', async () => {
      const { status } = await api.put({ dealUpdate }).to('/v1/tfm/deals/12345678');
      expect(status).toEqual(404);
    });

    it('updates the created deal with correct fields, retaining original dealSnapshot', async () => {
      const { body: portalDeal } = await api.post({ deal: newDeal, user: mockUser }).to('/v1/portal/deals');
      const dealId = portalDeal._id;

      await api.put({
        dealType: CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS,
        dealId,
      }).to('/v1/tfm/deals/submit');

      const { status } = await api.put({ dealUpdate }).to(`/v1/tfm/deals/${dealId}`);

      expect(status).toEqual(200);

      const { body } = await api.get(`/v1/tfm/deals/${dealId}`);

      const dealAfterUpdate = body.deal;

      expect(dealAfterUpdate.dealSnapshot).toMatchObject(newDeal);
      expect(dealAfterUpdate.tfm).toEqual({
        ...dealUpdate.tfm,
        lastUpdated: expect.any(Number),
      });
    });

    it('retains existing deal.tfm.history when adding new history', async () => {
      const { body: portalDeal } = await api.post({ deal: newDeal, user: mockUser }).to('/v1/portal/deals');
      const dealId = portalDeal._id;

      await api.put({
        dealType: CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS,
        dealId,
      }).to('/v1/tfm/deals/submit');

      const firstHistoryUpdate = {
        tfm: {
          history: {
            tasks: [
              { firstTaskHistory: true },
            ],
            emails: [
              { firstEmailHistory: true },
            ],
          },
        },
      };

      const { status: firstUpdateStatus } = await api.put({ dealUpdate: firstHistoryUpdate }).to(`/v1/tfm/deals/${dealId}`);

      expect(firstUpdateStatus).toEqual(200);

      const { body: dealFirstUpdateBody } = await api.get(`/v1/tfm/deals/${dealId}`);

      const dealAfterFirstUpdate = dealFirstUpdateBody.deal;

      expect(dealAfterFirstUpdate.tfm.history).toEqual(firstHistoryUpdate.tfm.history);

      const secondHistoryUpdate = {
        tfm: {
          history: {
            tasks: [
              { secondTaskHistory: true },
            ],
            emails: [
              { secondEmailHistory: true },
            ],
          },
        },
      };

      const { status: secondUpdateStatus } = await api.put({ dealUpdate: secondHistoryUpdate }).to(`/v1/tfm/deals/${dealId}`);

      expect(secondUpdateStatus).toEqual(200);

      const { body: dealSecondUpdateBody } = await api.get(`/v1/tfm/deals/${dealId}`);

      const dealAfterSecondUpdate = dealSecondUpdateBody.deal;

      const expectedHistory = {
        tasks: [
          ...firstHistoryUpdate.tfm.history.tasks,
          ...secondHistoryUpdate.tfm.history.tasks,
        ],
        emails: [
          ...firstHistoryUpdate.tfm.history.emails,
          ...secondHistoryUpdate.tfm.history.emails,
        ],
      };

      expect(dealAfterSecondUpdate.tfm.history).toEqual(expectedHistory);
    });

    it('updates deal.tfm.lastUpdated on each update', async () => {
      const { body: portalDeal } = await api.post({ deal: newDeal, user: mockUser }).to('/v1/portal/deals');
      const dealId = portalDeal._id;

      await api.put({
        dealType: CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS,
        dealId,
      }).to('/v1/tfm/deals/submit');

      const anUpdate = {
        tfm: { test: true },
      };

      // first update
      await api.put({ dealUpdate: anUpdate }).to(`/v1/tfm/deals/${dealId}`);

      const { body: firstUpdateBody } = await api.get(`/v1/tfm/deals/${dealId}`);

      expect(typeof firstUpdateBody.deal.tfm.lastUpdated).toEqual('number');

      const lastUpdatedOriginalValue = firstUpdateBody.deal.tfm.lastUpdated;

      // second update
      await api.put({ dealUpdate: anUpdate }).to(`/v1/tfm/deals/${dealId}`);

      const { body: secondUpdateBody } = await api.get(`/v1/tfm/deals/${dealId}`);

      expect(typeof secondUpdateBody.deal.tfm.lastUpdated).toEqual('number');
      expect(secondUpdateBody.deal.tfm.lastUpdated).not.toEqual(lastUpdatedOriginalValue);
    });
  });
});
