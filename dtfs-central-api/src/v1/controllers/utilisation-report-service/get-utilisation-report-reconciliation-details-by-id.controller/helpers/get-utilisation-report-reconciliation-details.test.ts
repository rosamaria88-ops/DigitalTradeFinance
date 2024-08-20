import { when } from 'jest-when';
import { ReportPeriod, UTILISATION_REPORT_RECONCILIATION_STATUS, UtilisationReportEntityMockBuilder } from '@ukef/dtfs2-common';
import { getUtilisationReportReconciliationDetails } from './get-utilisation-report-reconciliation-details';
import { getBankNameById } from '../../../../../repositories/banks-repo';
import { NotFoundError } from '../../../../../errors';
import { UtilisationReportReconciliationDetails } from '../../../../../types/utilisation-reports';
import { getKeyingSheetForReportId } from './get-keying-sheet-for-report-id';

console.error = jest.fn();

jest.mock('../../../../../repositories/banks-repo');
jest.mock('./get-keying-sheet-for-report-id');

describe('get-utilisation-report-reconciliation-details-by-id.controller helpers', () => {
  describe('getUtilisationReportReconciliationDetails', () => {
    const reportId = 1;

    const bankId = '123';

    beforeEach(() => {
      jest.resetAllMocks();
      jest.mocked(getBankNameById).mockRejectedValue('Some error');
      jest.mocked(getKeyingSheetForReportId).mockRejectedValue('Some error');
    });

    it.each(Object.values(UTILISATION_REPORT_RECONCILIATION_STATUS))(
      "throws an error if the report status is '%s' and the 'dateUploaded' property is null",
      async (status) => {
        // Arrange
        const report = UtilisationReportEntityMockBuilder.forStatus(status).withId(reportId).withDateUploaded(null).build();

        // Act / Assert
        await expect(getUtilisationReportReconciliationDetails(report, undefined)).rejects.toThrow(
          new Error(`Report with id '${reportId}' has not been uploaded`),
        );
        expect(getBankNameById).not.toHaveBeenCalled();
      },
    );

    it('throws an error if a bank with the same id as the report bankId does not exist', async () => {
      // Arrange
      const uploadedReport = UtilisationReportEntityMockBuilder.forStatus('PENDING_RECONCILIATION').withId(reportId).withBankId(bankId).build();

      when(getBankNameById).calledWith(bankId).mockResolvedValue(undefined);

      // Act / Assert
      await expect(getUtilisationReportReconciliationDetails(uploadedReport, undefined)).rejects.toThrow(
        new NotFoundError(`Failed to find a bank with id '${bankId}'`),
      );
      expect(getBankNameById).toHaveBeenCalledWith(bankId);
    });

    it('maps the utilisation report to the report reconciliation details object', async () => {
      // Arrange
      const reportPeriod: ReportPeriod = {
        start: { month: 1, year: 2024 },
        end: { month: 1, year: 2024 },
      };
      const dateUploaded = new Date();
      const uploadedReport = UtilisationReportEntityMockBuilder.forStatus('PENDING_RECONCILIATION')
        .withId(reportId)
        .withBankId(bankId)
        .withReportPeriod(reportPeriod)
        .withDateUploaded(dateUploaded)
        .withFeeRecords([])
        .build();

      const bankName = 'Test bank';
      when(getBankNameById).calledWith(bankId).mockResolvedValue(bankName);
      when(getKeyingSheetForReportId).calledWith(reportId, []).mockResolvedValue([]);

      // Act
      const mappedReport = await getUtilisationReportReconciliationDetails(uploadedReport, undefined);

      // Assert
      expect(getBankNameById).toHaveBeenCalledWith(bankId);
      expect(mappedReport).toEqual<UtilisationReportReconciliationDetails>({
        reportId,
        bank: {
          id: bankId,
          name: bankName,
        },
        status: 'PENDING_RECONCILIATION',
        reportPeriod,
        dateUploaded,
        feeRecordPaymentGroups: [],
        keyingSheet: [],
      });
    });
  });
});
