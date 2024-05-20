const { MONGO_DB_COLLECTIONS } = require('@ukef/dtfs2-common');
const { generatePortalAuditDetails } = require('@ukef/dtfs2-common/change-stream');
const wipeDB = require('../../../wipeDB');
const app = require('../../../../src/createApp');
const api = require('../../../api')(app);
const CONSTANTS = require('../../../../src/constants');
const { MOCK_PORTAL_USER } = require('../../../mocks/test-users/mock-portal-user');

const newDeal = {
  dealType: CONSTANTS.DEALS.DEAL_TYPE.GEF,
  status: 'Draft',
  exporter: { companyName: 'Mock Company name' },
  hasBeenIssued: true,
};

const newFacility = {
  type: CONSTANTS.FACILITIES.FACILITY_TYPE.CASH,
  dealId: 123,
  ukefFacilityId: '223344',
  value: '2000',
  coverEndDate: '2021-08-12T00:00:00.000Z',
  currency: { id: 'GBP' },
};
describe('/v1/tfm/facilities', () => {
  beforeAll(async () => {
    await wipeDB.wipe([MONGO_DB_COLLECTIONS.TFM_DEALS, MONGO_DB_COLLECTIONS.TFM_FACILITIES]);
  });
  describe('GET /v1/tfm/facilities', () => {
    it('returns the requested resource', async () => {
      // create deal
      const { body: createdDeal } = await api.post(newDeal).to('/v1/portal/gef/deals');

      const dealId = createdDeal._id;

      // create some facilities
      newFacility.dealId = dealId;
      await api.post(newFacility).to('/v1/portal/gef/facilities');

      // submit deal/facilities
      await api
        .put({
          dealType: CONSTANTS.DEALS.DEAL_TYPE.GEF,
          dealId,
          auditDetails: generatePortalAuditDetails(MOCK_PORTAL_USER._id),
        })
        .to('/v1/tfm/deals/submit');

      // get facilities after they've been created so we have all the data
      const { body: allFacilitiesAfterCreation } = await api.get('/v1/tfm/facilities?page=0&pagesize=20&sortBy[order]=ascending&sortBy[field]=ukefFacilityId');

      const expectedFacilityShape = {
        companyName: expect.any(String),
        tfmFacilities: {
          dealId: expect.any(String),
          ukefFacilityId: expect.any(String),
          facilityId: expect.any(String),
          type: expect.any(String),
          dealType: expect.any(String),
          value: expect.any(String),
          companyName: expect.any(String),
          currency: expect.any(String),
          coverEndDate: expect.any(String),
        },
        ukefFacilityId: expect.any(String),
      };

      expect(allFacilitiesAfterCreation.facilities[0]).toEqual(expectedFacilityShape);
    });
  });
});
