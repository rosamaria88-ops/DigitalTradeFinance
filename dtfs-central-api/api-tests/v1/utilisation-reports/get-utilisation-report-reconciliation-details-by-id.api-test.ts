import { Response } from 'supertest';
import { Bank, IsoDateTimeStamp, PortalUser, UtilisationReportEntityMockBuilder } from '@ukef/dtfs2-common';
import app from '../../../src/createApp';
import apiModule from '../../api';
import { SqlDbHelper } from '../../sql-db-helper';
import { wipe } from '../../wipeDB';
import mongoDbClient from '../../../src/drivers/db-client';
import { UtilisationReportReconciliationDetails } from '../../../src/types/utilisation-reports';
import { aBank } from '../../../test-helpers/test-data/bank';
import { aPortalUser } from '../../../test-helpers/test-data/portal-user';

const api = apiModule(app);

const getUrl = (reportId: number | string) => `/v1/utilisation-reports/reconciliation-details/${reportId}`;

type UtilisationReportReconciliationDetailsResponseBody = Omit<
  UtilisationReportReconciliationDetails,
  'dateUploaded'
> & {
  dateUploaded: IsoDateTimeStamp;
};

interface CustomResponse extends Response {
  body: UtilisationReportReconciliationDetailsResponseBody;
}

describe('GET /v1/utilisation-reports/reconciliation-details/:reportId', () => {
  const portalUser: PortalUser = aPortalUser();
  const portalUserId = portalUser._id.toString();

  const bankId = '123';
  const nonExistingBankId = '321';
  const bank: Bank = { ...aBank(), id: bankId, name: 'Test bank' };

  const reportId = 1;

  const reconciliationInProgressReport = UtilisationReportEntityMockBuilder.forStatus('RECONCILIATION_IN_PROGRESS')
    .withId(reportId)
    .withBankId(bankId)
    .withUploadedByUserId(portalUserId)
    .build();

  beforeAll(async () => {
    await SqlDbHelper.initialize();
    await SqlDbHelper.deleteAllEntries('UtilisationReport');
    await SqlDbHelper.saveNewEntry('UtilisationReport', reconciliationInProgressReport);

    await wipe(['users', 'banks']);

    const usersCollection = await mongoDbClient.getCollection('users');
    await usersCollection.insertOne(portalUser);

    const banksCollection = await mongoDbClient.getCollection('banks');
    await banksCollection.insertOne(bank);
  });

  afterAll(async () => {
    await SqlDbHelper.deleteAllEntries('UtilisationReport');
    await wipe(['users', 'banks']);
  });

  describe('GET /v1/utilisation-reports/:id', () => {
    it('returns 400 when an invalid report ID is provided', async () => {
      // Arrange
      const invalidReportId = 'invalid-id';

      // Act
      const response: CustomResponse = await api.get(getUrl(invalidReportId));

      // Assert
      expect(response.status).toEqual(400);
    });

    it('returns a 404 when a report with the matching id does not exist', async () => {
      // Act
      const response: CustomResponse = await api.get(getUrl(99999));

      // Assert
      expect(response.status).toBe(404);
    });

    it('returns a 404 when a bank can not be found with the same id as the bankId in the report', async () => {
      // Arrange
      const reportIdWithNoMatchingBank = 2;
      const reportWithNoMatchingBank = UtilisationReportEntityMockBuilder.forStatus('RECONCILIATION_IN_PROGRESS')
        .withId(reportIdWithNoMatchingBank)
        .withBankId(nonExistingBankId)
        .withUploadedByUserId(portalUserId)
        .build();

      await SqlDbHelper.saveNewEntry('UtilisationReport', reportWithNoMatchingBank);

      // Act
      const response: CustomResponse = await api.get(getUrl(reportIdWithNoMatchingBank));

      // Assert
      expect(response.status).toBe(404);
    });

    it('gets a utilisation report', async () => {
      // Act
      const response: CustomResponse = await api.get(getUrl(reportId));

      // Assert
      expect(response.status).toEqual(200);
      expect(response.body).toEqual<UtilisationReportReconciliationDetailsResponseBody>({
        reportId,
        bank: {
          id: bank.id,
          name: bank.name,
        },
        status: 'RECONCILIATION_IN_PROGRESS',
        reportPeriod: reconciliationInProgressReport.reportPeriod,
        dateUploaded: reconciliationInProgressReport.dateUploaded!.toISOString(),
        feeRecords: [],
      });
    });
  });
});
