import { when } from 'jest-when';
import {
  CURRENCY,
  Currency,
  FEE_RECORD_STATUS,
  FeeRecordEntityMockBuilder,
  FeeRecordStatus,
  PaymentEntityMockBuilder,
  UtilisationReportEntity,
  UtilisationReportEntityMockBuilder,
} from '@ukef/dtfs2-common';
import { mapToFeeRecordPaymentGroups } from './map-to-fee-record-payment-groups';
import { FeeRecordPaymentEntityGroup } from '../../../../../types/fee-record-payment-entity-group';
import * as helpersModule from '../../../../../helpers';
import { TfmUsersRepo } from '../../../../../repositories/tfm-users-repo';

describe('mapToFeeRecordPaymentGroups', () => {
  const findTfmUserSpy = jest.spyOn(TfmUsersRepo, 'findOneUserById');
  const getFeeRecordPaymentEntityGroupStatusSpy = jest.spyOn(helpersModule, 'getFeeRecordPaymentEntityGroupStatus');
  const getFeeRecordPaymentEntityGroupReconciliationDataSpy = jest.spyOn(helpersModule, 'getFeeRecordPaymentEntityGroupReconciliationData');

  beforeEach(() => {
    findTfmUserSpy.mockRejectedValue('Some error');
    getFeeRecordPaymentEntityGroupStatusSpy.mockReturnValue(FEE_RECORD_STATUS.TO_DO);
    getFeeRecordPaymentEntityGroupReconciliationDataSpy.mockResolvedValue({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('throws an error when a group has multiple fee records but no payments', async () => {
    // Arrange
    const group: FeeRecordPaymentEntityGroup = {
      feeRecords: [
        FeeRecordEntityMockBuilder.forReport(utilisationReport()).withId(1).build(),
        FeeRecordEntityMockBuilder.forReport(utilisationReport()).withId(2).build(),
        FeeRecordEntityMockBuilder.forReport(utilisationReport()).withId(3).build(),
      ],
      payments: [],
    };

    // Act / Assert
    await expect(mapToFeeRecordPaymentGroups([group])).rejects.toThrow(
      new Error('Fee record payment entity group cannot have more than one fee record if there are no payments'),
    );
  });

  it('populates each of the groups with their respective group status', async () => {
    // Arrange
    const firstGroup: FeeRecordPaymentEntityGroup = {
      feeRecords: [FeeRecordEntityMockBuilder.forReport(utilisationReport()).withStatus(FEE_RECORD_STATUS.TO_DO).build()],
      payments: [],
    };
    const secondGroup: FeeRecordPaymentEntityGroup = {
      feeRecords: [FeeRecordEntityMockBuilder.forReport(utilisationReport()).withStatus(FEE_RECORD_STATUS.DOES_NOT_MATCH).build()],
      payments: [],
    };
    const thirdGroup: FeeRecordPaymentEntityGroup = {
      feeRecords: [FeeRecordEntityMockBuilder.forReport(utilisationReport()).withStatus(FEE_RECORD_STATUS.READY_TO_KEY).build()],
      payments: [],
    };
    const groups = [firstGroup, secondGroup, thirdGroup];

    when(getFeeRecordPaymentEntityGroupStatusSpy).calledWith(firstGroup).mockReturnValue(FEE_RECORD_STATUS.TO_DO);
    when(getFeeRecordPaymentEntityGroupStatusSpy).calledWith(secondGroup).mockReturnValue(FEE_RECORD_STATUS.DOES_NOT_MATCH);
    when(getFeeRecordPaymentEntityGroupStatusSpy).calledWith(thirdGroup).mockReturnValue(FEE_RECORD_STATUS.READY_TO_KEY);

    // Act
    const result = await mapToFeeRecordPaymentGroups(groups);

    // Assert
    expect(result).toHaveLength(3);
    expect(result[0].status).toEqual(FEE_RECORD_STATUS.TO_DO);
    expect(result[1].status).toEqual(FEE_RECORD_STATUS.DOES_NOT_MATCH);
    expect(result[2].status).toEqual(FEE_RECORD_STATUS.READY_TO_KEY);
  });

  it('populates each of the groups with their respective reconciliation data', async () => {
    // Arrange
    const firstGroup: FeeRecordPaymentEntityGroup = {
      feeRecords: [FeeRecordEntityMockBuilder.forReport(utilisationReport()).withStatus(FEE_RECORD_STATUS.TO_DO).build()],
      payments: [],
    };
    const secondGroup: FeeRecordPaymentEntityGroup = {
      feeRecords: [FeeRecordEntityMockBuilder.forReport(utilisationReport()).withStatus(FEE_RECORD_STATUS.DOES_NOT_MATCH).build()],
      payments: [],
    };
    const thirdGroup: FeeRecordPaymentEntityGroup = {
      feeRecords: [FeeRecordEntityMockBuilder.forReport(utilisationReport()).withStatus(FEE_RECORD_STATUS.READY_TO_KEY).build()],
      payments: [],
    };
    const groups = [firstGroup, secondGroup, thirdGroup];

    when(getFeeRecordPaymentEntityGroupReconciliationDataSpy).calledWith(firstGroup).mockResolvedValue({});
    when(getFeeRecordPaymentEntityGroupReconciliationDataSpy)
      .calledWith(secondGroup)
      .mockResolvedValue({ dateReconciled: new Date('2024') });
    when(getFeeRecordPaymentEntityGroupReconciliationDataSpy)
      .calledWith(thirdGroup)
      .mockResolvedValue({ dateReconciled: new Date('2023'), reconciledByUser: { firstName: 'John', lastName: 'Smith' } });

    // Act
    const result = await mapToFeeRecordPaymentGroups(groups);

    // Assert
    expect(result).toHaveLength(3);
    expect(result[0].dateReconciled).toBeUndefined();
    expect(result[0].reconciledByUser).toBeUndefined();
    expect(result[1].dateReconciled).toEqual(new Date('2024'));
    expect(result[1].reconciledByUser).toBeUndefined();
    expect(result[2].dateReconciled).toEqual(new Date('2023'));
    expect(result[2].reconciledByUser).toEqual({ firstName: 'John', lastName: 'Smith' });
  });

  describe('when a group has a single fee record with no payments', () => {
    const currency: Currency = 'GBP';
    const amount = 100;

    const createFeeRecordEntityPaymentGroupForSingleFeeRecord = (id: number, status: FeeRecordStatus): FeeRecordPaymentEntityGroup => ({
      feeRecords: [
        FeeRecordEntityMockBuilder.forReport(utilisationReport())
          .withId(id)
          .withStatus(status)
          .withFeesPaidToUkefForThePeriod(amount)
          .withFeesPaidToUkefForThePeriodCurrency(currency)
          .withPaymentCurrency(currency)
          .build(),
      ],
      payments: [],
    });

    beforeEach(() => {
      jest.mocked(getFeeRecordPaymentEntityGroupReconciliationDataSpy).mockResolvedValue({});
    });

    it('returns as many fee record payment groups as there are fee record payment entity groups', async () => {
      // Arrange
      const groups = [
        createFeeRecordEntityPaymentGroupForSingleFeeRecord(1, 'TO_DO'),
        createFeeRecordEntityPaymentGroupForSingleFeeRecord(2, 'TO_DO'),
        createFeeRecordEntityPaymentGroupForSingleFeeRecord(3, 'TO_DO'),
      ];

      // Act
      const result = await mapToFeeRecordPaymentGroups(groups);

      // Assert
      expect(result).toHaveLength(groups.length);
    });

    it('sets the totalReportedPayments to the same value as the fee record reported payments', async () => {
      // Arrange
      const groups = [createFeeRecordEntityPaymentGroupForSingleFeeRecord(1, 'TO_DO')];

      // Act
      const result = await mapToFeeRecordPaymentGroups(groups);

      // Assert
      expect(result[0].totalReportedPayments).toEqual({ currency, amount });
    });

    it('sets the paymentsReceived to null', async () => {
      // Arrange
      const groups = [createFeeRecordEntityPaymentGroupForSingleFeeRecord(1, 'TO_DO')];

      // Act
      const result = await mapToFeeRecordPaymentGroups(groups);

      // Assert
      expect(result[0].paymentsReceived).toBeNull();
    });

    it('sets the totalPaymentsReceived to null', async () => {
      // Arrange
      const groups = [createFeeRecordEntityPaymentGroupForSingleFeeRecord(1, 'TO_DO')];

      // Act
      const result = await mapToFeeRecordPaymentGroups(groups);

      // Assert
      expect(result[0].totalPaymentsReceived).toBeNull();
    });
  });

  describe('when a group has a multiple fee records and payments', () => {
    it('returns only one fee record payment group', async () => {
      // Arrange
      const group: FeeRecordPaymentEntityGroup = {
        feeRecords: [FeeRecordEntityMockBuilder.forReport(utilisationReport()).build(), FeeRecordEntityMockBuilder.forReport(utilisationReport()).build()],
        payments: [PaymentEntityMockBuilder.forCurrency('GBP').withAmount(200).build(), PaymentEntityMockBuilder.forCurrency('GBP').withAmount(300).build()],
      };

      // Act
      const result = await mapToFeeRecordPaymentGroups([group]);

      // Assert
      expect(result).toHaveLength(1);
    });

    it('returns the group with as many fee records as there are fee records in the supplied group', async () => {
      // Arrange
      const feeRecordOne = FeeRecordEntityMockBuilder.forReport(utilisationReport()).build();
      const feeRecordTwo = FeeRecordEntityMockBuilder.forReport(utilisationReport()).build();
      const group: FeeRecordPaymentEntityGroup = {
        feeRecords: [feeRecordOne, feeRecordTwo],
        payments: [PaymentEntityMockBuilder.forCurrency('GBP').build()],
      };

      // Act
      const result = await mapToFeeRecordPaymentGroups([group]);

      // Assert
      expect(result[0].feeRecords).toHaveLength(2);
    });

    it('sets the totalReportedPayments to the sum of the fee record reported payments', async () => {
      // Arrange
      const testValues = {
        feeRecordOne: {
          feesPaidToUkefForThePeriod: 100,
          paymentCurrency: CURRENCY.GBP,
          feesPaidToUkefForThePeriodCurrency: CURRENCY.GBP,
        },
        feeRecordTwo: {
          feesPaidToUkefForThePeriod: 400,
          paymentCurrency: CURRENCY.GBP,
          feesPaidToUkefForThePeriodCurrency: CURRENCY.JPY,
          paymentExchangeRate: 2,
        },
        // Fee record one has it's fees paid currency matching the payment currency so reported fee is just 100
        // Fee record two has it's fees paid in a different currency to payment currency so we should convert
        // So fee record two's reported fee = 400 / 2 = 200
        // So the total = 100 + 200 = 300
        expectedTotalReportedPaymentAmount: 300,
      };

      const feeRecordOne = FeeRecordEntityMockBuilder.forReport(utilisationReport())
        .withFeesPaidToUkefForThePeriod(testValues.feeRecordOne.feesPaidToUkefForThePeriod)
        .withFeesPaidToUkefForThePeriodCurrency(testValues.feeRecordOne.feesPaidToUkefForThePeriodCurrency)
        .withPaymentCurrency(testValues.feeRecordOne.paymentCurrency)
        .build();
      const feeRecordTwo = FeeRecordEntityMockBuilder.forReport(utilisationReport())
        .withFeesPaidToUkefForThePeriod(testValues.feeRecordTwo.feesPaidToUkefForThePeriod)
        .withFeesPaidToUkefForThePeriodCurrency(testValues.feeRecordTwo.feesPaidToUkefForThePeriodCurrency)
        .withPaymentCurrency(testValues.feeRecordTwo.paymentCurrency)
        .withPaymentExchangeRate(testValues.feeRecordTwo.paymentExchangeRate)
        .build();
      const group: FeeRecordPaymentEntityGroup = {
        feeRecords: [feeRecordOne, feeRecordTwo],
        payments: [PaymentEntityMockBuilder.forCurrency('GBP').withAmount(5000000).build()],
      };

      // Act
      const result = await mapToFeeRecordPaymentGroups([group]);

      // Assert
      expect(result.length).toEqual(1);
      expect(result[0].totalReportedPayments).toEqual({ currency: 'GBP', amount: testValues.expectedTotalReportedPaymentAmount });
    });

    it('returns the group with as many paymentsReceived as there are payments in the supplied group', async () => {
      // Arrange
      const group: FeeRecordPaymentEntityGroup = {
        feeRecords: [FeeRecordEntityMockBuilder.forReport(utilisationReport()).build(), FeeRecordEntityMockBuilder.forReport(utilisationReport()).build()],
        payments: [PaymentEntityMockBuilder.forCurrency('GBP').build(), PaymentEntityMockBuilder.forCurrency('GBP').build()],
      };

      // Act
      const result = await mapToFeeRecordPaymentGroups([group]);

      // Assert
      expect(result[0].paymentsReceived).toHaveLength(2);
    });

    it('sets the totalPaymentsReceived to the total of the payment amounts', async () => {
      // Arrange
      const group: FeeRecordPaymentEntityGroup = {
        feeRecords: [FeeRecordEntityMockBuilder.forReport(utilisationReport()).build(), FeeRecordEntityMockBuilder.forReport(utilisationReport()).build()],
        payments: [PaymentEntityMockBuilder.forCurrency('GBP').withAmount(200).build(), PaymentEntityMockBuilder.forCurrency('GBP').withAmount(300).build()],
      };

      // Act
      const result = await mapToFeeRecordPaymentGroups([group]);

      // Assert
      expect(result[0].totalPaymentsReceived).toEqual({ currency: 'GBP', amount: 500 });
    });
  });

  function utilisationReport(): UtilisationReportEntity {
    return UtilisationReportEntityMockBuilder.forStatus('RECONCILIATION_IN_PROGRESS').build();
  }
});
