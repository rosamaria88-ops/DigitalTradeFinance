import { CURRENCY, ReportPeriod, UTILISATION_REPORT_RECONCILIATION_STATUS, UtilisationReportEntityMockBuilder } from '@ukef/dtfs2-common';
import { when } from 'jest-when';
import { NotFoundError } from '../../../../../errors';
import { getFeeRecordPaymentEntityGroups } from '../../../../../helpers';
import { getBankNameById } from '../../../../../repositories/banks-repo';
import { UtilisationReportReconciliationDetails, ValidatedPaymentDetailsFilters } from '../../../../../types/utilisation-reports';
import * as filterFeeRecordsModule from './filter-fee-record-payment-entity-groups';
import { getKeyingSheetForReportId } from './get-keying-sheet-for-report-id';
import * as getUtilisationReportReconciliationDetailsModule from './get-utilisation-report-reconciliation-details';
import { getPaymentDetails, getPremiumPayments, getUtilisationReportReconciliationDetails } from './get-utilisation-report-reconciliation-details';
import { mapToFeeRecordPaymentGroups } from './map-to-fee-record-payment-groups';

console.error = jest.fn();

jest.mock('../../../../../repositories/banks-repo');
jest.mock('../../../../../helpers');
jest.mock('./get-keying-sheet-for-report-id');
jest.mock('./map-to-fee-record-payment-groups');

describe('get-utilisation-report-reconciliation-details-by-id.controller helpers', () => {
  const reportId = 1;

  const bankId = '123';

  describe('getUtilisationReportReconciliationDetails', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.mocked(getBankNameById).mockRejectedValue('Some error');
      jest.mocked(getKeyingSheetForReportId).mockRejectedValue('Some error');
      jest.mocked(getFeeRecordPaymentEntityGroups).mockImplementation(() => {
        throw new Error('Some error');
      });
      jest.mocked(mapToFeeRecordPaymentGroups).mockRejectedValue('Some error');

      when(getKeyingSheetForReportId).calledWith(reportId, []).mockResolvedValue([]);
      when(getFeeRecordPaymentEntityGroups).calledWith([]).mockReturnValue([]);
      when(mapToFeeRecordPaymentGroups).calledWith([]).mockResolvedValue([]);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it.each(Object.values(UTILISATION_REPORT_RECONCILIATION_STATUS))(
      "throws an error if the report status is '%s' and the 'dateUploaded' property is null",
      async (status) => {
        // Arrange
        const report = UtilisationReportEntityMockBuilder.forStatus(status).withId(reportId).withDateUploaded(null).build();
        const paymentDetailsFilters = {};
        const premiumPaymentsFilters = {};

        // Act / Assert
        await expect(getUtilisationReportReconciliationDetails(report, paymentDetailsFilters, premiumPaymentsFilters)).rejects.toThrow(
          new Error(`Report with id '${reportId}' has not been uploaded`),
        );
        expect(getBankNameById).not.toHaveBeenCalled();
      },
    );

    describe('when a bank with the same id as the report bankId does not exist', () => {
      it('should throw an error', async () => {
        // Arrange
        const uploadedReport = UtilisationReportEntityMockBuilder.forStatus('PENDING_RECONCILIATION').withId(reportId).withBankId(bankId).build();

        const paymentDetailsFilters = {};
        const premiumPaymentsFilters = {};

        when(getBankNameById).calledWith(bankId).mockResolvedValue(undefined);

        // Act / Assert

        await expect(getUtilisationReportReconciliationDetails(uploadedReport, paymentDetailsFilters, premiumPaymentsFilters)).rejects.toThrow(
          new NotFoundError(`Failed to find a bank with id '${bankId}'`),
        );

        expect(getBankNameById).toHaveBeenCalledWith(bankId);
      });
    });

    describe('when mapping the utilisation report', () => {
      it('should map to the report reconciliation details object', async () => {
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

        const paymentDetailsFilters = {};
        const premiumPaymentsFilters = {};

        const bankName = 'Test bank';
        when(getBankNameById).calledWith(bankId).mockResolvedValue(bankName);

        // Act
        const mappedReport = await getUtilisationReportReconciliationDetails(uploadedReport, paymentDetailsFilters, premiumPaymentsFilters);

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
          premiumPayments: [],
          paymentDetails: [],
          keyingSheet: [],
        });
      });
    });

    describe('when calling getPremiumPayments', () => {
      it('should call with expected filters', async () => {
        // Arrange
        const uploadedReport = UtilisationReportEntityMockBuilder.forStatus('PENDING_RECONCILIATION').withFeeRecords([]).build();

        const paymentDetailsFilters = {};
        const premiumPaymentsFilters = { facilityId: 'testFacilityId' };

        const bankName = 'Test bank';
        when(getBankNameById).calledWith(bankId).mockResolvedValue(bankName);

        const getPremiumPaymentsSpy = jest.spyOn(getUtilisationReportReconciliationDetailsModule, 'getPremiumPayments').mockResolvedValue([]);

        // Act
        await getUtilisationReportReconciliationDetails(uploadedReport, paymentDetailsFilters, premiumPaymentsFilters);

        // Assert
        expect(getPremiumPaymentsSpy).toHaveBeenCalledWith([], premiumPaymentsFilters);

        getPremiumPaymentsSpy.mockRestore();
      });
    });

    describe('when calling getPaymentDetails', () => {
      it('should call with expected filters', async () => {
        // Arrange
        const uploadedReport = UtilisationReportEntityMockBuilder.forStatus('PENDING_RECONCILIATION').withFeeRecords([]).build();

        const paymentDetailsFilters = { facilityId: 'testFacilityId', paymentCurrency: CURRENCY.GBP, paymentReference: 'testPaymentReference' };
        const premiumPaymentsFilters = {};

        const bankName = 'Test bank';
        when(getBankNameById).calledWith(bankId).mockResolvedValue(bankName);

        const getPaymentDetailsSpy = jest.spyOn(getUtilisationReportReconciliationDetailsModule, 'getPaymentDetails').mockResolvedValue([]);

        // Act
        await getUtilisationReportReconciliationDetails(uploadedReport, paymentDetailsFilters, premiumPaymentsFilters);

        // Assert
        expect(getPaymentDetailsSpy).toHaveBeenCalledWith([], paymentDetailsFilters);

        getPaymentDetailsSpy.mockRestore();
      });
    });
  });

  describe('getPremiumPayments', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    const filterFeeRecordSpy = jest.spyOn(filterFeeRecordsModule, 'filterFeeRecordPaymentEntityGroups');

    describe('when the facility id is a string', () => {
      it('should filter the fee record payment groups by the facility id', async () => {
        // Arrange
        filterFeeRecordSpy.mockReturnValue([]);

        const facilityId = 'some filter';
        const premiumPaymentsFilters = {
          facilityId,
        };

        // Act
        await getPremiumPayments([], premiumPaymentsFilters);

        // Assert
        expect(filterFeeRecordSpy).toHaveBeenCalledWith([], premiumPaymentsFilters);
      });
    });

    describe('when no premium payments filters are defined', () => {
      it('should not filter the fee record payment groups', async () => {
        // Arrange
        const premiumPaymentsFilters = {};

        // Act
        await getPremiumPayments([], premiumPaymentsFilters);

        // Assert
        expect(filterFeeRecordSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('getPaymentDetails', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    const filterFeeRecordSpy = jest.spyOn(filterFeeRecordsModule, 'filterFeeRecordPaymentEntityGroups');

    it.each([
      { filter: 'facilityId', description: 'facility ID' },
      { filter: 'paymentCurrency', description: 'payment currency' },
      { filter: 'paymentReference', description: 'payment reference' },
    ])('filters the fee record payment groups by the $description filter when it is the only filter defined', async ({ filter }) => {
      // Arrange
      filterFeeRecordSpy.mockReturnValue([]);

      const paymentDetailsFilters = {
        [filter]: 'some filter',
      };

      // Act
      await getPaymentDetails([], paymentDetailsFilters);

      // Assert
      expect(filterFeeRecordSpy).toHaveBeenCalledWith([], paymentDetailsFilters);
    });

    describe('when multiple payment details filters are defined', () => {
      it('should filter the fee record payment groups', async () => {
        // Arrange
        filterFeeRecordSpy.mockReturnValue([]);

        const paymentDetailsFilters: ValidatedPaymentDetailsFilters = {
          facilityId: '12345678',
          paymentCurrency: 'GBP',
          paymentReference: 'REF123',
        };

        // Act
        await getPaymentDetails([], paymentDetailsFilters);

        // Assert
        expect(filterFeeRecordSpy).toHaveBeenCalledWith([], paymentDetailsFilters);
      });
    });

    describe('when no payment details filters are defined', () => {
      it('should not filter the fee record payment groups', async () => {
        // Arrange
        const paymentDetailsFilters = {};

        // Act
        await getPaymentDetails([], paymentDetailsFilters);

        // Assert
        expect(filterFeeRecordSpy).not.toHaveBeenCalled();
      });
    });
  });
});
