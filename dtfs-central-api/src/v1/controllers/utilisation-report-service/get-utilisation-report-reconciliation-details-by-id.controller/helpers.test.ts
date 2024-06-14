import {
  Currency,
  CurrencyAndAmount,
  FeeRecordEntity,
  FeeRecordEntityMockBuilder,
  FeeRecordStatus,
  PaymentEntity,
  PaymentEntityMockBuilder,
  ReportPeriod,
  UtilisationReportEntityMockBuilder,
} from '@ukef/dtfs2-common';
import { when } from 'jest-when';
import { mapUtilisationReportEntityToReconciliationDetails } from './helpers';
import { getBankNameById } from '../../../../repositories/banks-repo';
import { NotFoundError } from '../../../../errors';
import { FeeRecordItem, UtilisationReportReconciliationDetails } from '../../../../types/utilisation-reports';

jest.mock('../../../../repositories/banks-repo');

describe('get-utilisation-report-reconciliation-details-by-id.controller helpers', () => {
  describe('mapUtilisationReportEntityToReconciliationDetails', () => {
    const reportId = 1;

    const bankId = '123';

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("throws an error if the 'dateUploaded' property does not exist", async () => {
      // Arrange
      const notUploadedReport = UtilisationReportEntityMockBuilder.forStatus('REPORT_NOT_RECEIVED').withId(reportId).withDateUploaded(null).build();

      // Act / Assert
      await expect(mapUtilisationReportEntityToReconciliationDetails(notUploadedReport)).rejects.toThrow(
        new Error(`Report with id '${reportId}' has not been uploaded`),
      );
      expect(getBankNameById).not.toHaveBeenCalled();
    });

    it('throws an error if a bank with the same id as the report bankId does not exist', async () => {
      // Arrange
      const uploadedReport = UtilisationReportEntityMockBuilder.forStatus('PENDING_RECONCILIATION').withId(reportId).withBankId(bankId).build();

      jest.mocked(getBankNameById).mockResolvedValue(undefined);

      // Act / Assert
      await expect(mapUtilisationReportEntityToReconciliationDetails(uploadedReport)).rejects.toThrow(
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
      jest.mocked(getBankNameById).mockResolvedValue('Different bank');
      when(getBankNameById).calledWith(bankId).mockResolvedValue(bankName);

      // Act
      const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

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
      });
    });

    describe('when the report has multiple fee records with no attached payments', () => {
      const uploadedReport = UtilisationReportEntityMockBuilder.forStatus('PENDING_RECONCILIATION').build();

      const currency: Currency = 'GBP';
      const amount = 100;

      const createFeeRecord = (id: number, status: FeeRecordStatus, facilityId: string, exporter: string): FeeRecordEntity =>
        FeeRecordEntityMockBuilder.forReport(uploadedReport)
          .withId(id)
          .withStatus(status)
          .withFacilityId(facilityId)
          .withExporter(exporter)
          .withFeesPaidToUkefForThePeriod(amount)
          .withFeesPaidToUkefForThePeriodCurrency(currency)
          .withPaymentCurrency(currency)
          .build();

      const feeRecords = [
        createFeeRecord(1, 'TO_DO', '12345678', 'Test exporter 1'),
        createFeeRecord(2, 'MATCH', '87654321', 'Test exporter 2'),
        createFeeRecord(3, 'DOES_NOT_MATCH', '10203040', 'Test exporter 3'),
      ];
      uploadedReport.feeRecords = feeRecords;

      beforeEach(() => {
        jest.mocked(getBankNameById).mockResolvedValue('Test bank');
      });

      it('maps the utilisation report fee records to the on object with as many feeRecordPaymentGroups as there are fee records on the report', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        expect(mappedReport.feeRecordPaymentGroups).toHaveLength(feeRecords.length);
      });

      it('sets the feeRecordPaymentGroup status to the status of the fee record at the same index', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        mappedReport.feeRecordPaymentGroups.forEach((group, index) => {
          expect(group.status).toBe(feeRecords[index].status);
        });
      });

      it('sets the feeRecordPaymentGroup feeRecords to the mapped fee record at the same index', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        const feeRecordItems: FeeRecordItem[] = feeRecords.map((feeRecord) => ({
          id: feeRecord.id,
          facilityId: feeRecord.facilityId,
          exporter: feeRecord.exporter,
          reportedFees: { currency, amount },
          reportedPayments: { currency, amount },
        }));

        // Assert
        mappedReport.feeRecordPaymentGroups.forEach((group, index) => {
          expect(group.feeRecords).toEqual([feeRecordItems[index]]);
        });
      });

      it('sets the feeRecordPaymentGroup totalReportedPayments to the same value as the fee record reported payments', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        mappedReport.feeRecordPaymentGroups.forEach((group) => {
          expect(group.totalReportedPayments).toEqual({ currency, amount });
        });
      });

      it('sets the feeRecordPaymentGroup paymentsReceived to null', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        mappedReport.feeRecordPaymentGroups.forEach((group) => {
          expect(group.paymentsReceived).toBeNull();
        });
      });

      it('sets the feeRecordPaymentGroup totalPaymentsReceived to null', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        mappedReport.feeRecordPaymentGroups.forEach((group) => {
          expect(group.totalPaymentsReceived).toBeNull();
        });
      });
    });

    describe('when the report has multiple fee records with the same attached payments', () => {
      const uploadedReport = UtilisationReportEntityMockBuilder.forStatus('PENDING_RECONCILIATION').build();

      const paymentCurrency: Currency = 'GBP';
      const paymentAmount = 100;

      const payments = [
        PaymentEntityMockBuilder.forCurrency(paymentCurrency).withId(1).withAmount(paymentAmount).build(),
        PaymentEntityMockBuilder.forCurrency(paymentCurrency).withId(2).withAmount(paymentAmount).build(),
      ];
      const totalPaymentsReceivedAmount = paymentAmount * payments.length;

      const feeRecordStatus: FeeRecordStatus = 'DOES_NOT_MATCH';

      const createFeeRecord = (id: number, facilityId: string, exporter: string): FeeRecordEntity =>
        FeeRecordEntityMockBuilder.forReport(uploadedReport)
          .withId(id)
          .withStatus(feeRecordStatus)
          .withFacilityId(facilityId)
          .withExporter(exporter)
          .withFeesPaidToUkefForThePeriod(paymentAmount)
          .withFeesPaidToUkefForThePeriodCurrency(paymentCurrency)
          .withPaymentCurrency(paymentCurrency)
          .withPayments(payments)
          .build();

      const feeRecords = [
        createFeeRecord(1, '12345678', 'Test exporter 1'),
        createFeeRecord(2, '87654321', 'Test exporter 2'),
        createFeeRecord(3, '10203040', 'Test exporter 3'),
      ];
      uploadedReport.feeRecords = feeRecords;
      const totalReportedPaymentsAmount = paymentAmount * feeRecords.length;

      beforeEach(() => {
        jest.mocked(getBankNameById).mockResolvedValue('Test bank');
      });

      it('maps the utilisation report to an object with only one fee record payment group', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        expect(mappedReport.feeRecordPaymentGroups).toHaveLength(1);
      });

      it('sets the feeRecordPaymentGroups item status to the status of the fee record', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        expect(mappedReport.feeRecordPaymentGroups[0].status).toBe(feeRecordStatus);
      });

      it('sets the feeRecordPaymentGroup feeRecords to the mapped fee record at the same index', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        const feeRecordItems: FeeRecordItem[] = feeRecords.map((feeRecord) => ({
          id: feeRecord.id,
          facilityId: feeRecord.facilityId,
          exporter: feeRecord.exporter,
          reportedFees: { currency: paymentCurrency, amount: paymentAmount },
          reportedPayments: { currency: paymentCurrency, amount: paymentAmount },
        }));

        // Assert
        expect(mappedReport.feeRecordPaymentGroups[0].feeRecords).toEqual(feeRecordItems);
      });

      it('sets the feeRecordPaymentGroup totalReportedPayments to the total of the fee record reported payments', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        expect(mappedReport.feeRecordPaymentGroups[0].totalReportedPayments).toEqual({ amount: totalReportedPaymentsAmount, currency: paymentCurrency });
      });

      it('sets the feeRecordPaymentGroup paymentsReceived to the mapped payments', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        expect(mappedReport.feeRecordPaymentGroups[0].paymentsReceived).toHaveLength(payments.length);
        mappedReport.feeRecordPaymentGroups[0].paymentsReceived!.forEach((paymentsReceivedItem, index) => {
          const expectedPaymentsReceived: CurrencyAndAmount = { currency: payments[index].currency, amount: payments[index].amount };
          expect(paymentsReceivedItem).toEqual(expectedPaymentsReceived);
        });
      });

      it('sets the feeRecordPaymentGroup totalPaymentsReceived to the total of the payment amounts', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        expect(mappedReport.feeRecordPaymentGroups[0].totalPaymentsReceived).toEqual({ currency: paymentCurrency, amount: totalPaymentsReceivedAmount });
      });
    });

    describe('when the report has multiple linked fee records and payments', () => {
      const uploadedReport = UtilisationReportEntityMockBuilder.forStatus('PENDING_RECONCILIATION').build();

      const paymentAmount = 100;

      const feeRecordIdGenerator = idGenerator();
      const paymentIdGenerator = idGenerator();

      const createFeeRecord = (currency: Currency, payments: PaymentEntity[]): FeeRecordEntity =>
        FeeRecordEntityMockBuilder.forReport(uploadedReport)
          .withId(feeRecordIdGenerator.next().value)
          .withStatus('DOES_NOT_MATCH')
          .withFacilityId('12345678')
          .withExporter('Test exporter')
          .withFeesPaidToUkefForThePeriod(paymentAmount)
          .withFeesPaidToUkefForThePeriodCurrency(currency)
          .withPaymentCurrency(currency)
          .withPayments(payments)
          .build();

      const createPayment = (currency: Currency): PaymentEntity =>
        PaymentEntityMockBuilder.forCurrency(currency).withId(paymentIdGenerator.next().value).withAmount(paymentAmount).build();

      // First group of linked fee records and payments
      const firstPaymentCurrency: Currency = 'EUR';
      const firstPayments = [createPayment(firstPaymentCurrency), createPayment(firstPaymentCurrency)];
      const firstFeeRecords = [
        createFeeRecord(firstPaymentCurrency, firstPayments),
        createFeeRecord(firstPaymentCurrency, firstPayments),
        createFeeRecord(firstPaymentCurrency, firstPayments),
      ];

      // Second group of linked fee records and payments
      const secondPaymentCurrency: Currency = 'GBP';
      const secondPayments = [createPayment(secondPaymentCurrency)];
      const secondFeeRecords = [
        createFeeRecord(secondPaymentCurrency, secondPayments),
        createFeeRecord(secondPaymentCurrency, secondPayments),
        createFeeRecord(secondPaymentCurrency, secondPayments),
        createFeeRecord(secondPaymentCurrency, secondPayments),
      ];

      uploadedReport.feeRecords = [...firstFeeRecords, ...secondFeeRecords];

      beforeEach(() => {
        jest.mocked(getBankNameById).mockResolvedValue('Test bank');
      });

      it('maps the utilisation report to an object containing two groups', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert
        expect(mappedReport.feeRecordPaymentGroups).toHaveLength(2);
      });

      it('maps the report to groups containing the linked fee records and payments', async () => {
        // Act
        const mappedReport = await mapUtilisationReportEntityToReconciliationDetails(uploadedReport);

        // Assert - First group
        const firstGroup = mappedReport.feeRecordPaymentGroups[0];

        expect(firstGroup.feeRecords).toHaveLength(firstFeeRecords.length);
        const feeRecordIdsInFirstGroup = firstGroup.feeRecords.map(({ id }) => id);
        firstFeeRecords.forEach(({ id }) => expect(feeRecordIdsInFirstGroup).toContain(id));

        expect(firstGroup.paymentsReceived).toHaveLength(firstPayments.length);
        firstGroup.paymentsReceived!.forEach(({ currency }) => expect(currency).toBe(firstPaymentCurrency));

        // Assert - Second group
        const secondGroup = mappedReport.feeRecordPaymentGroups[1];

        expect(secondGroup.feeRecords).toHaveLength(secondFeeRecords.length);
        const feeRecordIdsInSecondGroup = secondGroup.feeRecords.map(({ id }) => id);
        secondFeeRecords.forEach(({ id }) => expect(feeRecordIdsInSecondGroup).toContain(id));

        expect(secondGroup.paymentsReceived).toHaveLength(secondPayments.length);
        secondGroup.paymentsReceived!.forEach(({ currency }) => expect(currency).toBe(secondPaymentCurrency));
      });

      function* idGenerator(): Generator<number, number, unknown> {
        let id = 1;
        while (true) {
          yield id;
          id += 1;
        }
      }
    });
  });
});
