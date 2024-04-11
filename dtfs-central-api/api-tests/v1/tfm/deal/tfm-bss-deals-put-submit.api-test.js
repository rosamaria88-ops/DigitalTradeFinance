const { generatePortalAuditDetails } = require('@ukef/dtfs2-common/src/helpers/change-stream/generate-audit-details');
const wipeDB = require('../../../wipeDB');
const app = require('../../../../src/createApp');
const api = require('../../../api')(app);
const CONSTANTS = require('../../../../src/constants');
const DEFAULTS = require('../../../../src/v1/defaults');
const { MOCK_PORTAL_USER } = require('../../../mocks/test-users/mock-portal-user');

const newDeal = {
  dealType: CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS,
  bankInternalRefName: 'Test',
  additionalRefName: 'Test',
  details: {
    submissionCount: 1,
  },
};

const newFacility = {
  type: CONSTANTS.FACILITIES.FACILITY_TYPE.BOND,
};

describe('/v1/tfm/deals/submit - BSS/EWCS deal', () => {
  beforeEach(async () => {
    await wipeDB.wipe([
      CONSTANTS.DB_COLLECTIONS.DEALS,
      CONSTANTS.DB_COLLECTIONS.FACILITIES,
      CONSTANTS.DB_COLLECTIONS.TFM_DEALS,
      CONSTANTS.DB_COLLECTIONS.TFM_FACILITIES,
    ]);
  });

  it('returns dealSnapshot with tfm object', async () => {
    const { body: createDealBody } = await api
      .post({
        deal: newDeal,
        user: MOCK_PORTAL_USER,
      })
      .to('/v1/portal/deals');

    const dealId = createDealBody._id;

    const { status, body } = await api
      .put({
        dealType: CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS,
        dealId,
        auditDetails: generatePortalAuditDetails(MOCK_PORTAL_USER._id),
      })
      .to('/v1/tfm/deals/submit');

    expect(status).toEqual(200);

    const { body: dealAfterCreation } = await api.get(`/v1/portal/deals/${dealId}`);

    const expected = {
      _id: createDealBody._id,
      dealSnapshot: {
        ...dealAfterCreation.deal,
        facilities: [],
      },
      tfm: DEFAULTS.DEAL_TFM,
      auditRecord: {
        lastUpdatedAt: expect.any(String),
        lastUpdatedByPortalUserId: MOCK_PORTAL_USER._id,
        lastUpdatedByTfmUserId: null,
        noUserLoggedIn: null,
        lastUpdatedByIsSystem: null,
      },
    };

    expect(body).toEqual(expected);
  });

  it('creates facility snapshots and tfm object', async () => {
    // create deal
    const { body: createDealBody } = await api
      .post({
        deal: newDeal,
        user: MOCK_PORTAL_USER,
      })
      .to('/v1/portal/deals');

    const dealId = createDealBody._id;

    // create facilities
    const newFacility1 = { ...newFacility, dealId };
    const newFacility2 = { ...newFacility, dealId };

    const { body: facility1Body } = await api
      .post({
        facility: newFacility1,
        user: MOCK_PORTAL_USER,
      })
      .to('/v1/portal/facilities');

    const { body: facility2Body } = await api
      .post({
        facility: newFacility2,
        user: MOCK_PORTAL_USER,
      })
      .to('/v1/portal/facilities');

    const facility1Id = facility1Body._id;
    const facility2Id = facility2Body._id;

    // submit deal
    const { status } = await api
      .put({
        dealType: CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS,
        dealId,
        auditDetails: generatePortalAuditDetails(MOCK_PORTAL_USER._id),
      })
      .to('/v1/tfm/deals/submit');

    expect(status).toEqual(200);

    // get the facilities in tfm
    const facility1 = await api.get(`/v1/tfm/facilities/${facility1Id}`);

    expect(facility1.status).toEqual(200);
    expect(facility1.body).toEqual({
      _id: facility1Id,
      facilitySnapshot: {
        _id: facility1Id,
        ...newFacility1,
        createdDate: expect.any(Number),
        updatedAt: expect.any(Number),
      },
      tfm: DEFAULTS.FACILITY_TFM,
      auditRecord: {
        lastUpdatedAt: expect.any(String),
        lastUpdatedByPortalUserId: MOCK_PORTAL_USER._id,
        lastUpdatedByTfmUserId: null,
        noUserLoggedIn: null,
        lastUpdatedByIsSystem: null,
      },
    });

    const facility2 = await api.get(`/v1/tfm/facilities/${facility2Id}`);

    expect(facility2.status).toEqual(200);
    expect(facility2.body).toEqual({
      _id: facility2Id,
      facilitySnapshot: {
        _id: facility2Id,
        ...newFacility2,
        createdDate: expect.any(Number),
        updatedAt: expect.any(Number),
      },
      tfm: DEFAULTS.FACILITY_TFM,
      auditRecord: {
        lastUpdatedAt: expect.any(String),
        lastUpdatedByPortalUserId: MOCK_PORTAL_USER._id,
        lastUpdatedByTfmUserId: null,
        noUserLoggedIn: null,
        lastUpdatedByIsSystem: null,
      },
    });
  });
});
