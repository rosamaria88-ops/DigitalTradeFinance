const { MONGO_DB_COLLECTIONS } = require('@ukef/dtfs2-common');
const { generateMockPortalUserAuditDatabaseRecord, withDeleteManyTests } = require('@ukef/dtfs2-common/change-stream/test-helpers');
const { generatePortalAuditDetails, generateSystemAuditDatabaseRecord } = require('@ukef/dtfs2-common/change-stream');
const app = require('../../../src/createApp');
const { mongoDbClient } = require('../../../src/drivers/db-client');
const api = require('../../api')(app);
const { withValidateAuditDetailsTests } = require('../../helpers/with-validate-audit-details.api-tests');
const { MOCK_PORTAL_USER } = require('../../mocks/test-users/mock-portal-user');

describe('DELETE v1/portal/cron-jobs', () => {
  let logsToDeleteIds;

  beforeEach(async () => {
    const cronJobLogsCollection = await mongoDbClient.getCollection(MONGO_DB_COLLECTIONS.CRON_JOB_LOGS);
    const insertionResult = await cronJobLogsCollection.insertMany([
      { aField: 'aValue', auditRecord: generateSystemAuditDatabaseRecord() },
      { anotherField: 'anotherValue', auditRecord: generateSystemAuditDatabaseRecord() },
    ]);
    logsToDeleteIds = Object.values(insertionResult.insertedIds);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  withValidateAuditDetailsTests({
    makeRequest: (auditDetails) =>
      api
        .remove({
          auditDetails,
        })
        .to(`/v1/portal/cron-jobs`),
    validUserTypes: ['none', 'portal', 'system', 'tfm'],
  });

  withDeleteManyTests({
    makeRequest: () =>
      api
        .remove({
          auditDetails: generatePortalAuditDetails(MOCK_PORTAL_USER._id),
        })
        .to(`/v1/portal/cron-jobs`),
    collectionName: MONGO_DB_COLLECTIONS.CRON_JOB_LOGS,
    auditRecord: generateMockPortalUserAuditDatabaseRecord(MOCK_PORTAL_USER._id),
    getDeletedDocumentIds: () => logsToDeleteIds,
    expectedSuccessResponseBody: {},
  });

  it('returns 200 if there are no cron job logs to delete', async () => {
    const { status: firstStatus } = await api
      .remove({
        auditDetails: generatePortalAuditDetails(MOCK_PORTAL_USER._id),
      })
      .to(`/v1/portal/cron-jobs`);
    const { status: secondStatus } = await api
      .remove({
        auditDetails: generatePortalAuditDetails(MOCK_PORTAL_USER._id),
      })
      .to(`/v1/portal/cron-jobs`);

    expect(firstStatus).toBe(200);
    expect(secondStatus).toBe(200);
  });
});