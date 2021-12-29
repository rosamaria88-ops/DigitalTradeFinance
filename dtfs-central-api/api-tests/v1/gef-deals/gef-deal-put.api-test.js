const wipeDB = require('../../wipeDB');
const app = require('../../../src/createApp');
const api = require('../../api')(app);
const CONSTANTS = require('../../../src/constants');

describe('/v1/portal/gef/deals/:id', () => {
  beforeAll(async () => {
    await wipeDB.wipe(['deals']);
    await wipeDB.wipe(['gef-facilities']);
  });

  const newDeal = {
    dealType: CONSTANTS.DEALS.DEAL_TYPE.GEF,
    status: 'Draft',
  };

  const mockDeal = {
    dealType: CONSTANTS.DEALS.DEAL_TYPE.GEF,
    status: 'Draft',
    updatedAt: 1234.0,
  };

  const mockUser = {
    _id: '123456789',
    username: 'temp',
    roles: [],
    bank: {
      id: '956',
      name: 'Barclays Bank',
    },
  };

  // Update GEF deal
  describe('PUT /v1/portal/gef/deals/:id', () => {
    it('Returns 404 when the deal does not exist ', async () => {
      const invalidDealId = '123456789f0ffe00219319c1';
      const { status } = await api.put({}).to(`/v1/portal/gef/deals/${invalidDealId} `);

      expect(status).toEqual(404);
    });

    it('Return and update the GEF deal', async () => {
      const postResult = await api.post(newDeal).to('/v1/portal/gef/deals');
      const createdDeal = postResult.body;
      const updatedDeal = {
        ...newDeal,
        _id: createdDeal._id,
        additionalRefName: 'change this field',
        eligibility: {
          ...newDeal.eligibility,
          mockNewField: true,
        },
      };

      const { status, body } = await api.put({ dealUpdate: updatedDeal, user: mockUser }).to(`/v1/portal/gef/deals/${createdDeal._id}`);

      expect(status).toEqual(200);

      expect(body.eligibility.mockNewField).toEqual(true);
    });
  });
});
