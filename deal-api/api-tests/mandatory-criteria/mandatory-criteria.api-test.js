const wipeDB = require('../wipeDB');
const aMandatoryCriteria = require('./mandatory-criteria-builder');

const app = require('../../src/createApp');
const { get, post, put, remove } = require('../api')(app);
const { expectMongoId, expectMongoIds} = require('../expectMongoIds');

const getToken = require('../getToken')(app);

describe('/api/mandatory-criteria', () => {
  const newMandatoryCriteria = aMandatoryCriteria({ id: '2' });
  const updatedMandatoryCriteria = aMandatoryCriteria({
    id: '2',
    title: 'Updated mandatory criteria',
  });

  let aTokenWithNoRoles;
  let aTokenWithEditorRole;

  beforeEach(async () => {
    await wipeDB();

    aTokenWithNoRoles    = await getToken({username:'1',password:'2',roles:[]});
    aTokenWithEditorRole = await getToken({username:'3',password:'4',roles:['editor']});
  });

  describe('GET /api/mandatory-criteria', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await get('/api/mandatory-criteria');

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token', async () => {
      const {status} = await get('/api/mandatory-criteria', aTokenWithNoRoles);

      expect(status).toEqual(200);
    });

    it('returns a list of mandatory-criteria', async () => {
      const criteria = [
        aMandatoryCriteria({ id: '1' }),
        aMandatoryCriteria({ id: '2' }),
        aMandatoryCriteria({ id: '3' })];

      await post(criteria[0], aTokenWithEditorRole).to('/api/mandatory-criteria');
      await post(criteria[1], aTokenWithEditorRole).to('/api/mandatory-criteria');
      await post(criteria[2], aTokenWithEditorRole).to('/api/mandatory-criteria');

      const {status, body} = await get('/api/mandatory-criteria', aTokenWithNoRoles);

      expect(status).toEqual(200);
      expect(body.mandatoryCriteria).toEqual(expectMongoIds(criteria));
    });
  });

  describe('GET /api/mandatory-criteria/:id', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await get('/api/mandatory-criteria/2');

      expect(status).toEqual(401);
    });

    it('accepts requests that do present a valid Authorization token', async () => {
      const {status} = await get('/api/mandatory-criteria/2', aTokenWithNoRoles);

      expect(status).toEqual(200);
    });

    it('returns a mandatory-criteria', async () => {
      await post(newMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria');

      const {status, body} = await get('/api/mandatory-criteria/2', aTokenWithNoRoles);

      expect(status).toEqual(200);
      expect(body).toEqual(expectMongoId(newMandatoryCriteria));
    });

  });

  describe('POST /api/mandatory-criteria', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await post(newMandatoryCriteria).to('/api/mandatory-criteria');

      expect(status).toEqual(401);
    });

    it('rejects requests that present a valid Authorization token but do not have "editor" role', async () => {
      const {status} = await post(newMandatoryCriteria, aTokenWithNoRoles).to('/api/mandatory-criteria');

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "editor" role', async () => {
      const {status} = await post(newMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria');

      expect(status).toEqual(200);
    });

  });

  describe('PUT /api/mandatory-criteria/:id', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await put(updatedMandatoryCriteria).to('/api/mandatory-criteria/2');

      expect(status).toEqual(401);
    });

    it('rejects requests that present a valid Authorization token but do not have "editor" role', async () => {
      await post(newMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria');
      const {status} = await put(updatedMandatoryCriteria, aTokenWithNoRoles).to('/api/mandatory-criteria/2');

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "editor" role', async () => {
      await post(newMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria');
      const {status} = await put(updatedMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria/2');

      expect(status).toEqual(200);
    });

    it('updates the mandatory-criteria', async () => {
      await post(newMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria');
      await put(updatedMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria/2');

      const {status, body} = await get('/api/mandatory-criteria/2', aTokenWithEditorRole);

      expect(status).toEqual(200);
      expect(body).toEqual(expectMongoId(updatedMandatoryCriteria));
    });
  });

  describe('DELETE /api/mandatory-criteria/:id', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await remove('/api/mandatory-criteria/2');

      expect(status).toEqual(401);
    });

    it('rejects requests that present a valid Authorization token but do not have "editor" role', async () => {
      await post(newMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria');
      const {status} = await remove('/api/mandatory-criteria/2', aTokenWithNoRoles);

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "editor" role', async () => {
      await post(newMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria');
      const {status} = await remove('/api/mandatory-criteria/2', aTokenWithEditorRole);

      expect(status).toEqual(200);
    });

    it('deletes the mandatory-criteria', async () => {
      await post(newMandatoryCriteria, aTokenWithEditorRole).to('/api/mandatory-criteria');
      await remove('/api/mandatory-criteria/2', aTokenWithEditorRole);

      const {status, body} = await get('/api/mandatory-criteria/2', aTokenWithEditorRole);

      expect(status).toEqual(200);
      expect(body).toEqual({});
    });
  });
});
