const { generatePortalAuditDetails } = require('@ukef/dtfs2-common/change-stream');
const { MONGO_DB_COLLECTIONS } = require('@ukef/dtfs2-common');
const wipeDB = require('../../wipeDB');
const app = require('../../../src/createApp');
const api = require('../../api')(app);
const aDeal = require('../deal-builder');
const { MOCK_DEAL } = require('../mocks/mock-data');
const { MOCK_PORTAL_USER } = require('../../mocks/test-users/mock-portal-user');
const { createDeal } = require('../../helpers/create-deal');
const { createFacility } = require('../../helpers/create-facility');
const { withValidateAuditDetailsTests } = require('../../helpers/with-validate-audit-details.api-tests');

const mockFacility = {
  type: 'Bond',
  dealId: MOCK_DEAL.DEAL_ID,
};

const newDeal = aDeal({
  additionalRefName: 'mock name',
  bankInternalRefName: 'mock id',
  editedBy: [],
  dealType: 'GEF',
  eligibility: {
    status: 'Not started',
    criteria: [{}],
  },
});

describe('/v1/portal/facilities', () => {
  let dealId;

  beforeAll(async () => {
    await wipeDB.wipe([MONGO_DB_COLLECTIONS.DEALS, MONGO_DB_COLLECTIONS.FACILITIES]);
  });

  beforeEach(async () => {
    const { body: deal } = await createDeal({ api, deal: newDeal, user: MOCK_PORTAL_USER });

    dealId = deal._id;
    mockFacility.dealId = dealId;
  });

  describe('GET /v1/portal/facilities/', () => {
    it('returns multiple facilities', async () => {
      await createFacility({ api, facility: mockFacility, user: MOCK_PORTAL_USER });
      await createFacility({ api, facility: mockFacility, user: MOCK_PORTAL_USER });
      await createFacility({ api, facility: mockFacility, user: MOCK_PORTAL_USER });

      const { status, body } = await api.get('/v1/portal/facilities');

      expect(status).toEqual(200);
      expect(body.length).toEqual(3);
    });

    it('returns 200 with empty array when there are no facilities', async () => {
      await wipeDB.wipe([MONGO_DB_COLLECTIONS.FACILITIES]);
      const { status, body } = await api.get('/v1/portal/facilities');

      expect(status).toEqual(200);
      expect(body.length).toEqual(0);
    });
  });

  describe('POST /v1/portal/multiple-facilities', () => {
    const facilities = [mockFacility, mockFacility, mockFacility, mockFacility];

    withValidateAuditDetailsTests({
      makeRequest: (auditDetails) => {
        return api
          .post({
            facilities,
            user: MOCK_PORTAL_USER,
            dealId,
            auditDetails,
          })
          .to('/v1/portal/multiple-facilities');
      },
    });
    it('creates and returns multiple facilities with createdDate and updatedAt', async () => {
      await wipeDB.wipe([MONGO_DB_COLLECTIONS.FACILITIES]);

      const postBody = {
        facilities,
        user: MOCK_PORTAL_USER,
        dealId,
        auditDetails: generatePortalAuditDetails(MOCK_PORTAL_USER._id),
      };

      const { status, body } = await api.post(postBody).to('/v1/portal/multiple-facilities');

      expect(status).toEqual(200);
      expect(body.length).toEqual(4);

      const facilityId = body[0];
      const { body: facilityAfterCreation } = await api.get(`/v1/portal/facilities/${facilityId}`);

      expect(typeof facilityAfterCreation.createdDate).toEqual('number');
      expect(typeof facilityAfterCreation.updatedAt).toEqual('number');
    });

    it('returns 400 where user is missing', async () => {
      const postBody = {
        facilities,
        dealId,
      };

      const { status } = await api.post(postBody).to('/v1/portal/multiple-facilities');

      expect(status).toEqual(404);
    });

    it('returns 400 where deal is not found', async () => {
      const postBody = {
        facilities,
        dealId: '61e54dd5b578247e14575880',
        user: MOCK_PORTAL_USER,
        auditDetails: generatePortalAuditDetails(MOCK_PORTAL_USER._id),
      };

      const { status } = await api.post(postBody).to('/v1/portal/multiple-facilities');

      expect(status).toEqual(404);
    });
  });
});
