const wipeDB = require('../../wipeDB');
const aDeal = require('./deal-builder');

const app = require('../../../src/createApp');
const {
  get, post, put, remove,
} = require('../../api')(app);

const { expectAddedFields, expectAllAddedFields } = require('./expectAddedFields');

const getToken = require('../../getToken')(app);

describe('/v1/deals', () => {
  const newDeal = aDeal({supplyContractName: 'Original Value'});
  const updatedDeal = aDeal({supplyContractName: 'Updated Value'});

  let aTokenWithNoRoles;
  let aTokenWithMakerRole;

  beforeEach(async () => {
    await wipeDB();

    aTokenWithNoRoles = await getToken({
      username: '1',
      password: '2',
      roles: [],
    });
    aTokenWithMakerRole = await getToken({
      username: '3',
      password: '4',
      roles: ['maker'],
    });
  });

  describe('GET /v1/deals', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const { status } = await get('/v1/deals');

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token', async () => {
      const { status } = await get('/v1/deals', aTokenWithNoRoles);

      expect(status).toEqual(200);
    });

    it('returns a list of deals ordered by "updated"', async () => {
      const deals = [
        aDeal({ supplyContractName: '0' }),
        aDeal({ supplyContractName: '1' }),
        aDeal({ supplyContractName: '2' }),
      ];

      await post(deals[1], aTokenWithMakerRole).to('/v1/deals');
      await post(deals[2], aTokenWithMakerRole).to('/v1/deals');
      await post(deals[0], aTokenWithMakerRole).to('/v1/deals');

      const { status, body } = await get('/v1/deals', aTokenWithNoRoles);

      expect(status).toEqual(200);
      expect(body.deals).toEqual(expectAllAddedFields([
        deals[1],
        deals[2],
        deals[0]
      ]));
    });
  });

    describe('GET /v1/deals/:start/:pagesize', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const { status } = await get('/v1/deals/0/1');

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token', async () => {
      const { status } = await get('/v1/deals/0/1', aTokenWithNoRoles);

      expect(status).toEqual(200);
    });

    it('returns a list of deals, ordered by "updated", paginated by start/pagesize', async () => {
      const deals = [
        aDeal({ supplyContractName: '0' }),
        aDeal({ supplyContractName: '1' }),
        aDeal({ supplyContractName: '2' }),
        aDeal({ supplyContractName: '3' }),
        aDeal({ supplyContractName: '4' }),
        aDeal({ supplyContractName: '5' }),
      ];

      await post(deals[0], aTokenWithMakerRole).to('/v1/deals');
      await post(deals[1], aTokenWithMakerRole).to('/v1/deals');
      await post(deals[2], aTokenWithMakerRole).to('/v1/deals');
      await post(deals[3], aTokenWithMakerRole).to('/v1/deals');
      await post(deals[4], aTokenWithMakerRole).to('/v1/deals');
      await post(deals[5], aTokenWithMakerRole).to('/v1/deals');

      const { status, body } = await get('/v1/deals/2/2', aTokenWithNoRoles);

      expect(status).toEqual(200);
      expect(body.deals).toEqual(expectAllAddedFields([
        deals[2],
        deals[3],
      ]));
    });

  });

  describe('GET /v1/deals/:id', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const { status } = await get('/v1/deals/123456789012');

      expect(status).toEqual(401);
    });

    it('accepts requests that do present a valid Authorization token', async () => {
      const { status } = await get('/v1/deals/123456789012', aTokenWithNoRoles);

      expect(status).toEqual(200);
    });

    it('returns a deal', async () => {
      const postResult = await post(newDeal, aTokenWithMakerRole).to('/v1/deals');
      const newId = postResult.body._id;

      const { status, body } = await get(`/v1/deals/${newId}`, aTokenWithNoRoles);

      expect(status).toEqual(200);
      expect(body).toEqual(expectAddedFields(newDeal));
    });
  });

  describe('POST /v1/deals', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const { status } = await post(newDeal).to('/v1/deals');

      expect(status).toEqual(401);
    });

    it('rejects requests that present a valid Authorization token but do not have "maker" role', async () => {
      const { status } = await post(newDeal, aTokenWithNoRoles).to('/v1/deals');

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "maker" role', async () => {
      const { status } = await post(newDeal, aTokenWithMakerRole).to(
        '/v1/deals',
      );

      expect(status).toEqual(200);
    });
  });

  describe('PUT /v1/deals/:id', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const { status } = await put(updatedDeal).to('/v1/deals/123456789012');

      expect(status).toEqual(401);
    });

    it('rejects requests that present a valid Authorization token but do not have "maker" role', async () => {
      await post(newDeal, aTokenWithMakerRole).to('/v1/deals');
      const { status } = await put(updatedDeal, aTokenWithNoRoles).to(
        '/v1/deals/123456789012',
      );

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "maker" role', async () => {
      await post(newDeal, aTokenWithMakerRole).to('/v1/deals');
      const { status } = await put(updatedDeal, aTokenWithMakerRole).to(
        '/v1/deals/123456789012',
      );

      expect(status).toEqual(200);
    });

    it('updates the deal', async () => {
      const postResult = await post(newDeal, aTokenWithMakerRole).to('/v1/deals');
      const newId = postResult.body._id;

      await put(updatedDeal, aTokenWithMakerRole).to(`/v1/deals/${newId}`);

      const { status, body } = await get(
        `/v1/deals/${newId}`,
        aTokenWithMakerRole,
      );

      expect(status).toEqual(200);
      expect(body).toEqual(expectAddedFields(updatedDeal));
    });
  });

  describe('DELETE /v1/deals/:id', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const { status } = await remove('/v1/deals/123456789012');

      expect(status).toEqual(401);
    });

    it('rejects requests that present a valid Authorization token but do not have "maker" role', async () => {
      await post(newDeal, aTokenWithMakerRole).to('/v1/deals');
      const { status } = await remove('/v1/deals/123456789012', aTokenWithNoRoles);

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "maker" role', async () => {
      await post(newDeal, aTokenWithMakerRole).to('/v1/deals');
      const { status } = await remove('/v1/deals/123456789012', aTokenWithMakerRole);

      expect(status).toEqual(200);
    });

    it('deletes the deal', async () => {
      await post(newDeal, aTokenWithMakerRole).to('/v1/deals');
      await remove('/v1/deals/123456789012', aTokenWithMakerRole);

      const { status, body } = await get(
        '/v1/deals/123456789012',
        aTokenWithMakerRole,
      );

      expect(status).toEqual(200);
      expect(body).toEqual({});
    });
  });
});
