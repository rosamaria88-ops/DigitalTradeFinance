const wipeDB = require('../wipeDB');
const anIndustrySector = require('./industry-sector-builder');

const app = require('../../src/createApp');
const { get, post, put, remove } = require('../api')(app);
const { expectMongoId, expectMongoIds} = require('../expectMongoIds');

const getToken = require('../getToken')(app);

describe('/api/industry-sectors', () => {

  const mockClasses = [
    { code: 'b', name: 'b' },
    { code: 'c', name: 'c' },
    { code: 'a', name: 'a' },
  ];

  const aaaa = anIndustrySector({ code: '100', name: 'AAAA', classes: mockClasses });
  const pppp = anIndustrySector({ code: '200', name: 'PPPP', classes: mockClasses });
  const mmmm = anIndustrySector({ code: '300', name: 'MMMM', classes: mockClasses });

  const newIndustrySector     = anIndustrySector({ code: '101', name: 'AAAB', classes: mockClasses });
  const updatedIndustrySector = anIndustrySector({ code: '101', name: 'BBBA', classes: mockClasses });

  let aTokenWithNoRoles;
  let aTokenWithEditorRole;

  beforeEach(async () => {
    await wipeDB();

    aTokenWithNoRoles    = await getToken({username:'1',password:'2',roles:[]});
    aTokenWithEditorRole = await getToken({username:'3',password:'4',roles:['editor']});
  });

  describe('GET /api/industry-sectors', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await get('/api/industry-sectors');

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token', async () => {
      const {status} = await get('/api/industry-sectors', aTokenWithNoRoles);

      expect(status).toEqual(200);
    });

    it('returns a list of industry-sectors', async () => {
      await post(aaaa, aTokenWithEditorRole).to('/api/industry-sectors');
      await post(pppp, aTokenWithEditorRole).to('/api/industry-sectors');
      await post(mmmm, aTokenWithEditorRole).to('/api/industry-sectors');

      const {status, body} = await get('/api/industry-sectors', aTokenWithNoRoles);

      const expectedClasses = [
        { code: 'a', name: 'a' },
        { code: 'b', name: 'b' },
        { code: 'c', name: 'c' },
      ];

      const expectedResult = [
        { ...aaaa, classes: expectedClasses },
        { ...mmmm, classes: expectedClasses },
        { ...pppp, classes: expectedClasses },
      ];

      expect(status).toEqual(200);
      expect(body.industrySectors).toEqual(expectMongoIds(expectedResult));
    });
  });

  describe('GET /api/industry-sectors/:code', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await get('/api/industry-sectors/101');

      expect(status).toEqual(401);
    });

    it('accepts requests that do present a valid Authorization token', async () => {
      const {status} = await get('/api/industry-sectors/101', aTokenWithNoRoles);

      expect(status).toEqual(200);
    });

    it('returns an industry-sector', async () => {
      await post(newIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors');

      const {status, body} = await get('/api/industry-sectors/101', aTokenWithNoRoles);

      expect(status).toEqual(200);
      expect(body).toEqual(expectMongoId(newIndustrySector));
    });

  });

  describe('POST /api/industry-sectors', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await post(newIndustrySector).to('/api/industry-sectors');

      expect(status).toEqual(401);
    });

    it('rejects requests that present a valid Authorization token but do not have "editor" role', async () => {
      const {status} = await post(newIndustrySector, aTokenWithNoRoles).to('/api/industry-sectors');

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "editor" role', async () => {
      const {status} = await post(newIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors');

      expect(status).toEqual(200);
    });

  });

  describe('PUT /api/industry-sectors/:code', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await put(updatedIndustrySector).to('/api/industry-sectors/101');

      expect(status).toEqual(401);
    });

    it('rejects requests that present a valid Authorization token but do not have "editor" role', async () => {
      await post(newIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors');
      const {status} = await put(updatedIndustrySector, aTokenWithNoRoles).to('/api/industry-sectors/101');

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "editor" role', async () => {
      await post(newIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors');
      const {status} = await put(updatedIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors/101');

      expect(status).toEqual(200);
    });

    it('updates the industry-sector', async () => {
      await post(newIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors');
      await put(updatedIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors/101');

      const {status, body} = await get('/api/industry-sectors/101', aTokenWithEditorRole);

      expect(status).toEqual(200);
      expect(body).toEqual(expectMongoId(updatedIndustrySector));
    });
  });

  describe('DELETE /api/industry-sectors/:code', () => {
    it('rejects requests that do not present a valid Authorization token', async () => {
      const {status} = await remove('/api/industry-sectors/101');

      expect(status).toEqual(401);
    });

    it('rejects requests that present a valid Authorization token but do not have "editor" role', async () => {
      await post(newIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors');
      const {status} = await remove('/api/industry-sectors/101', aTokenWithNoRoles);

      expect(status).toEqual(401);
    });

    it('accepts requests that present a valid Authorization token with "editor" role', async () => {
      await post(newIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors');
      const {status} = await remove('/api/industry-sectors/101', aTokenWithEditorRole);

      expect(status).toEqual(200);
    });

    it('deletes the industry-sector', async () => {
      await post(newIndustrySector, aTokenWithEditorRole).to('/api/industry-sectors');
      await remove('/api/industry-sectors/101', aTokenWithEditorRole);

      const {status, body} = await get('/api/industry-sectors/101', aTokenWithEditorRole);

      expect(status).toEqual(200);
      expect(body).toEqual({});
    });
  });
});
