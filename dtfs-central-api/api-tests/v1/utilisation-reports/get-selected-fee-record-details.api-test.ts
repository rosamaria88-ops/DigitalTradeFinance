import { Response } from 'supertest';
import {
  Bank,
  FacilityUtilisationDataEntityMockBuilder,
  FeeRecordEntityMockBuilder,
  SelectedFeeRecordDetails,
  SelectedFeeRecordsDetails,
  UtilisationReportEntityMockBuilder,
} from '@ukef/dtfs2-common';
import { testApi } from '../../test-api';
import { SqlDbHelper } from '../../sql-db-helper';
import { wipe } from '../../wipeDB';
import { mongoDbClient } from '../../../src/drivers/db-client';
import { aBank, aReportPeriod } from '../../../test-helpers/test-data';

const getUrl = (reportId: number | string) => `/v1/utilisation-reports/${reportId}/selected-fee-records-details`;

interface CustomResponse extends Response {
  body: SelectedFeeRecordDetails;
}

console.error = jest.fn();

describe('GET /v1/utilisation-reports/:id/selected-fee-records-details', () => {
  const bankId = '123';
  const bank: Bank = { ...aBank(), id: bankId, name: 'Test bank' };

  const reportId = 1;

  const facilityUtilisationData = FacilityUtilisationDataEntityMockBuilder.forId('000123').build();

  const reportPeriod = aReportPeriod();
  const utilisationReport = UtilisationReportEntityMockBuilder.forStatus('RECONCILIATION_IN_PROGRESS')
    .withId(reportId)
    .withReportPeriod(reportPeriod)
    .withBankId(bankId)
    .build();
  const feeRecord = FeeRecordEntityMockBuilder.forReport(utilisationReport)
    .withId(45)
    .withFacilityUtilisationData(facilityUtilisationData)
    .withExporter('Test company')
    .withFeesPaidToUkefForThePeriod(100)
    .withFeesPaidToUkefForThePeriodCurrency('GBP')
    .withPaymentCurrency('GBP')
    .build();
  const anotherFeeRecord = FeeRecordEntityMockBuilder.forReport(utilisationReport)
    .withId(46)
    .withFacilityUtilisationData(facilityUtilisationData)
    .withExporter('Test company')
    .withFeesPaidToUkefForThePeriod(100)
    .withFeesPaidToUkefForThePeriodCurrency('GBP')
    .withPaymentCurrency('GBP')
    .build();
  utilisationReport.feeRecords = [feeRecord, anotherFeeRecord];

  beforeAll(async () => {
    await SqlDbHelper.initialize();
    await SqlDbHelper.deleteAll();

    await SqlDbHelper.saveNewEntry('FacilityUtilisationData', facilityUtilisationData);
    await SqlDbHelper.saveNewEntry('UtilisationReport', utilisationReport);

    await wipe(['banks']);

    const banksCollection = await mongoDbClient.getCollection('banks');
    await banksCollection.insertOne(bank);
  });

  afterAll(async () => {
    await SqlDbHelper.deleteAll();
    await wipe(['banks']);
  });

  describe('GET /v1/utilisation-reports/:id/selected-fee-records-details', () => {
    it('returns 400 when an invalid report ID is provided', async () => {
      // Arrange
      const invalidReportId = 'invalid-id';

      // Act
      const response: CustomResponse = await testApi.get(getUrl(invalidReportId), { feeRecordIds: [45] });

      // Assert
      expect(response.status).toEqual(400);
    });

    it('gets selected fee record details', async () => {
      // Act
      const response: CustomResponse = await testApi.get(getUrl(reportId), { feeRecordIds: [45] });

      // Assert
      expect(response.status).toEqual(200);
      expect(response.body).toEqual<SelectedFeeRecordsDetails>({
        reportPeriod,
        bank: {
          name: bank.name,
        },
        totalReportedPayments: { currency: 'GBP', amount: 100 },
        feeRecords: [
          {
            id: 45,
            facilityId: '000123',
            exporter: 'Test company',
            reportedFee: { currency: 'GBP', amount: 100 },
            reportedPayments: { currency: 'GBP', amount: 100 },
          },
        ],
        payments: [],
      });
    });
  });
});
