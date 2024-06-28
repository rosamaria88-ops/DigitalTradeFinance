import { Currency, CurrencyAndAmount, FeeRecordStatus } from '@ukef/dtfs2-common';
import { mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems } from './reconciliation-for-report-helper';
import { FeeRecord, FeeRecordPaymentGroup, Payment } from '../../../api-response-types';
import { aFeeRecordPaymentGroup, aFeeRecord } from '../../../../test-helpers';

describe('reconciliation-for-report-helper', () => {
  describe('mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems', () => {
    const DEFAULT_IS_CHECKBOX_SELECTED = () => false;

    it('maps the group feeRecords id to the view model feeRecords id', () => {
      // Arrange
      const firstFeeRecordId = 10;
      const firstFeeRecord: FeeRecord = { ...aFeeRecord(), id: firstFeeRecordId };

      const secondFeeRecordId = 30;
      const secondFeeRecord: FeeRecord = { ...aFeeRecord(), id: secondFeeRecordId };

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          feeRecords: [firstFeeRecord, secondFeeRecord],
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].feeRecords).toHaveLength(2);
      expect(viewModel[0].feeRecords[0].id).toBe(firstFeeRecordId);
      expect(viewModel[0].feeRecords[1].id).toBe(secondFeeRecordId);
    });

    it('maps the group feeRecords facilityId to the view model feeRecords facilityId', () => {
      // Arrange
      const firstFeeRecordFacilityId = '12345678';
      const firstFeeRecord: FeeRecord = { ...aFeeRecord(), facilityId: firstFeeRecordFacilityId };

      const secondFeeRecordFacilityId = '87654321';
      const secondFeeRecord: FeeRecord = { ...aFeeRecord(), facilityId: secondFeeRecordFacilityId };

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          feeRecords: [firstFeeRecord, secondFeeRecord],
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].feeRecords).toHaveLength(2);
      expect(viewModel[0].feeRecords[0].facilityId).toBe(firstFeeRecordFacilityId);
      expect(viewModel[0].feeRecords[1].facilityId).toBe(secondFeeRecordFacilityId);
    });

    it('maps the group feeRecords exporter to the view model feeRecords exporter', () => {
      // Arrange
      const firstFeeRecordExporter = 'Test exporter 1';
      const firstFeeRecord: FeeRecord = { ...aFeeRecord(), exporter: firstFeeRecordExporter };

      const secondFeeRecordExporter = 'Test exporter 2';
      const secondFeeRecord: FeeRecord = { ...aFeeRecord(), exporter: secondFeeRecordExporter };

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          feeRecords: [firstFeeRecord, secondFeeRecord],
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].feeRecords).toHaveLength(2);
      expect(viewModel[0].feeRecords[0].exporter).toBe(firstFeeRecordExporter);
      expect(viewModel[0].feeRecords[1].exporter).toBe(secondFeeRecordExporter);
    });

    it('maps the group feeRecords reportedFees to the view model feeRecords reportedFees formatted currency and amount', () => {
      // Arrange
      const firstFeeRecordReportedFees: CurrencyAndAmount = { currency: 'GBP', amount: 100 };
      const firstFeeRecord: FeeRecord = { ...aFeeRecord(), reportedFees: firstFeeRecordReportedFees };
      const firstFeeRecordFormattedReportedFees = 'GBP 100.00';

      const secondFeeRecordReportedFees: CurrencyAndAmount = { currency: 'EUR', amount: 314.59 };
      const secondFeeRecord: FeeRecord = { ...aFeeRecord(), reportedFees: secondFeeRecordReportedFees };
      const secondFeeRecordFormattedReportedFees = 'EUR 314.59';

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          feeRecords: [firstFeeRecord, secondFeeRecord],
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].feeRecords).toHaveLength(2);
      expect(viewModel[0].feeRecords[0].reportedFees).toBe(firstFeeRecordFormattedReportedFees);
      expect(viewModel[0].feeRecords[1].reportedFees).toBe(secondFeeRecordFormattedReportedFees);
    });

    it('maps the group feeRecords reportedPayments to the view model feeRecords reportedPayments formatted currency and amount', () => {
      // Arrange
      const firstFeeRecordReportedPayments: CurrencyAndAmount = { currency: 'EUR', amount: 314.59 };
      const firstFeeRecord: FeeRecord = { ...aFeeRecord(), reportedPayments: firstFeeRecordReportedPayments };
      const firstFeeRecordFormattedReportedPayments = 'EUR 314.59';

      const secondFeeRecordReportedPayments: CurrencyAndAmount = { currency: 'GBP', amount: 100 };
      const secondFeeRecord: FeeRecord = { ...aFeeRecord(), reportedPayments: secondFeeRecordReportedPayments };
      const secondFeeRecordFormattedReportedPayments = 'GBP 100.00';

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          feeRecords: [firstFeeRecord, secondFeeRecord],
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].feeRecords).toHaveLength(2);
      expect(viewModel[0].feeRecords[0].reportedPayments).toBe(firstFeeRecordFormattedReportedPayments);
      expect(viewModel[0].feeRecords[1].reportedPayments).toBe(secondFeeRecordFormattedReportedPayments);
    });

    it('sorts the view model feeRecords reportedPayments by currency first and amount second in ascending order', () => {
      // Arrange
      const unsortedFeeRecords: FeeRecord[] = [
        { ...aFeeRecord(), reportedPayments: { currency: 'GBP', amount: 100 } }, // after sorting: 'GBP 100.00' at index 1
        { ...aFeeRecord(), reportedPayments: { currency: 'USD', amount: 200 } }, // after sorting: 'USD 200.00' at index 4
        { ...aFeeRecord(), reportedPayments: { currency: 'EUR', amount: 100 } }, // after sorting: 'EUR 100.00' at index 0
        { ...aFeeRecord(), reportedPayments: { currency: 'USD', amount: 100 } }, // after sorting: 'USD 100.00' at index 3
        { ...aFeeRecord(), reportedPayments: { currency: 'GBP', amount: 500 } }, // after sorting: 'GBP 500.00' at index 2
      ];

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          feeRecords: unsortedFeeRecords,
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel[0].feeRecords[0].reportedPayments).toBe('EUR 100.00');
      expect(viewModel[0].feeRecords[1].reportedPayments).toBe('GBP 100.00');
      expect(viewModel[0].feeRecords[2].reportedPayments).toBe('GBP 500.00');
      expect(viewModel[0].feeRecords[3].reportedPayments).toBe('USD 100.00');
      expect(viewModel[0].feeRecords[4].reportedPayments).toBe('USD 200.00');
    });

    it('maps the group totalReportedPayments to the view model totalReportedPayments formattedCurrencyAndAmount', () => {
      // Arrange
      const totalReportedPayments: CurrencyAndAmount = { currency: 'GBP', amount: 100 };
      const totalReportedPaymentsFormattedCurrencyAndAmount = 'GBP 100.00';

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          totalReportedPayments,
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].totalReportedPayments.formattedCurrencyAndAmount).toBe(totalReportedPaymentsFormattedCurrencyAndAmount);
    });

    it('sorts the group totalReportedPayments and sets to the view model totalReportedPayments dataSortValue', () => {
      // Arrange
      const firstTotalReportedPayments: CurrencyAndAmount = { currency: 'GBP', amount: 100 }; // dataSortValue = 2
      const secondTotalReportedPayments: CurrencyAndAmount = { currency: 'EUR', amount: 100 }; // dataSortValue = 1
      const thirdTotalReportedPayments: CurrencyAndAmount = { currency: 'GBP', amount: 200 }; // dataSortValue = 3
      const fourthTotalReportedPayments: CurrencyAndAmount = { currency: 'EUR', amount: 50 }; // dataSortValue = 0

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        { ...aFeeRecordPaymentGroup(), totalReportedPayments: firstTotalReportedPayments },
        { ...aFeeRecordPaymentGroup(), totalReportedPayments: secondTotalReportedPayments },
        { ...aFeeRecordPaymentGroup(), totalReportedPayments: thirdTotalReportedPayments },
        { ...aFeeRecordPaymentGroup(), totalReportedPayments: fourthTotalReportedPayments },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(4);
      expect(viewModel[0].totalReportedPayments.dataSortValue).toBe(2);
      expect(viewModel[1].totalReportedPayments.dataSortValue).toBe(1);
      expect(viewModel[2].totalReportedPayments.dataSortValue).toBe(3);
      expect(viewModel[3].totalReportedPayments.dataSortValue).toBe(0);
    });

    it('sets the view model paymentsReceived to undefined when the group paymentsReceived is null', () => {
      // Arrange
      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [{ ...aFeeRecordPaymentGroup(), paymentsReceived: null }];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].paymentsReceived).toBeUndefined();
    });

    it('maps the group paymentsReceived to the view model paymentsReceived formatted currency and amount', () => {
      // Arrange
      const paymentsReceived: Payment[] = [{ id: 1, currency: 'GBP', amount: 314.59 }];
      const paymentsReceivedFormattedCurrencyAndAmount = 'GBP 314.59';

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          paymentsReceived,
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel[0].paymentsReceived).toHaveLength(1);
      expect(viewModel[0].paymentsReceived![0].formattedCurrencyAndAmount).toBe(paymentsReceivedFormattedCurrencyAndAmount);
    });

    it('maps the group paymentsReceived id to the view model paymentsReceived id', () => {
      // Arrange
      const paymentsReceived: Payment[] = [{ id: 1, currency: 'GBP', amount: 100 }];

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          paymentsReceived,
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel[0].paymentsReceived).toHaveLength(1);
      expect(viewModel[0].paymentsReceived![0].id).toBe(1);
    });

    it('sets the view model totalPaymentsReceived formattedCurrencyAndAmount to undefined when the group totalPaymentsReceived is null', () => {
      // Arrange
      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          totalPaymentsReceived: null,
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].totalPaymentsReceived.formattedCurrencyAndAmount).toBeUndefined();
    });

    it('maps the group totalPaymentsReceived to the view model totalPaymentsReceived formattedCurrencyAndAmount', () => {
      // Arrange
      const totalPaymentsReceived: CurrencyAndAmount = { currency: 'GBP', amount: 100 };
      const totalPaymentsReceivedFormattedCurrencyAndAmount = 'GBP 100.00';

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        {
          ...aFeeRecordPaymentGroup(),
          totalPaymentsReceived,
        },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].totalPaymentsReceived.formattedCurrencyAndAmount).toBe(totalPaymentsReceivedFormattedCurrencyAndAmount);
    });

    it('sorts the group totalPaymentsReceived and sets to the view model totalPaymentsReceived dataSortValue', () => {
      // Arrange
      const firstTotalPaymentsReceived: CurrencyAndAmount = { currency: 'GBP', amount: 100 }; // dataSortValue = 2
      const secondTotalPaymentsReceived: CurrencyAndAmount = { currency: 'EUR', amount: 100 }; // dataSortValue = 1
      const thirdTotalPaymentsReceived: CurrencyAndAmount = { currency: 'GBP', amount: 200 }; // dataSortValue = 3
      const fourthTotalPaymentsReceived: CurrencyAndAmount = { currency: 'EUR', amount: 50 }; // dataSortValue = 0

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [
        { ...aFeeRecordPaymentGroup(), totalPaymentsReceived: firstTotalPaymentsReceived },
        { ...aFeeRecordPaymentGroup(), totalPaymentsReceived: secondTotalPaymentsReceived },
        { ...aFeeRecordPaymentGroup(), totalPaymentsReceived: thirdTotalPaymentsReceived },
        { ...aFeeRecordPaymentGroup(), totalPaymentsReceived: fourthTotalPaymentsReceived },
      ];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(4);
      expect(viewModel[0].totalPaymentsReceived.dataSortValue).toBe(2);
      expect(viewModel[1].totalPaymentsReceived.dataSortValue).toBe(1);
      expect(viewModel[2].totalPaymentsReceived.dataSortValue).toBe(3);
      expect(viewModel[3].totalPaymentsReceived.dataSortValue).toBe(0);
    });

    it('maps the group status to the view model status', () => {
      // Arrange
      const status: FeeRecordStatus = 'TO_DO';
      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [{ ...aFeeRecordPaymentGroup(), status }];

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel).toHaveLength(1);
      expect(viewModel[0].status).toBe(status);
    });

    it.each([
      { feeRecordStatus: 'TO_DO', feeRecordDisplayStatus: 'TO DO' },
      { feeRecordStatus: 'MATCH', feeRecordDisplayStatus: 'MATCH' },
      { feeRecordStatus: 'DOES_NOT_MATCH', feeRecordDisplayStatus: 'DOES NOT MATCH' },
      { feeRecordStatus: 'READY_TO_KEY', feeRecordDisplayStatus: 'READY TO KEY' },
      { feeRecordStatus: 'RECONCILED', feeRecordDisplayStatus: 'RECONCILED' },
    ] as const)(
      "maps the fee record status '$feeRecordStatus' to the view model display status '$feeRecordDisplayStatus'",
      ({ feeRecordStatus, feeRecordDisplayStatus }) => {
        // Arrange
        const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [{ ...aFeeRecordPaymentGroup(), status: feeRecordStatus }];

        // Act
        const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

        // Assert
        expect(viewModel[0].displayStatus).toBe(feeRecordDisplayStatus);
      },
    );

    it('sets the view model checkboxId using the supplied fee record items for the ids, currency and the group status for the status', () => {
      // Arrange
      const feeRecordIds = [1, 20];

      const firstFeeRecordReportedPaymentsCurrency: Currency = 'GBP';
      const firstFeeRecord: FeeRecord = {
        ...aFeeRecord(),
        id: feeRecordIds[0],
        reportedPayments: {
          currency: firstFeeRecordReportedPaymentsCurrency,
          amount: 100,
        },
      };

      const secondFeeRecord: FeeRecord = {
        ...aFeeRecord(),
        id: feeRecordIds[1],
        reportedPayments: {
          currency: 'EUR',
          amount: 100,
        },
      };

      const feeRecords = [firstFeeRecord, secondFeeRecord];

      const groupStatus: FeeRecordStatus = 'TO_DO';

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [{ ...aFeeRecordPaymentGroup(), feeRecords, status: groupStatus }];

      const checkboxId = `feeRecordIds-${feeRecordIds.join(',')}-reportedPaymentsCurrency-${firstFeeRecordReportedPaymentsCurrency}-status-${groupStatus}`;

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, DEFAULT_IS_CHECKBOX_SELECTED);

      // Assert
      expect(viewModel[0].checkboxId).toBe(checkboxId);
    });

    it('sets isChecked to true if the generated checkboxId is recognised by the supplied isCheckboxChecked function', () => {
      // Arrange
      const feeRecordId = 1;
      const feeRecordReportedPaymentsCurrency: Currency = 'GBP';
      const feeRecord: FeeRecord = {
        ...aFeeRecord(),
        id: feeRecordId,
        reportedPayments: {
          currency: feeRecordReportedPaymentsCurrency,
          amount: 100,
        },
      };

      const status: FeeRecordStatus = 'DOES_NOT_MATCH';

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [{ ...aFeeRecordPaymentGroup(), feeRecords: [feeRecord], status }];

      const checkedCheckboxId = `feeRecordIds-${feeRecordId}-reportedPaymentsCurrency-${feeRecordReportedPaymentsCurrency}-status-${status}`;

      const isCheckboxChecked = (checkboxId: string) => checkboxId === checkedCheckboxId;

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, isCheckboxChecked);

      // Assert
      expect(viewModel[0].isChecked).toBe(true);
    });

    it('sets isChecked to false if the generated checkboxId is not recognised by the supplied isCheckboxChecked function', () => {
      // Arrange
      const feeRecordId = 1;
      const nonMatchingFeeRecordId = 5;
      const feeRecordReportedPaymentsCurrency: Currency = 'GBP';
      const feeRecord: FeeRecord = {
        ...aFeeRecord(),
        id: feeRecordId,
        reportedPayments: {
          currency: feeRecordReportedPaymentsCurrency,
          amount: 100,
        },
      };

      const status: FeeRecordStatus = 'DOES_NOT_MATCH';

      const feeRecordPaymentGroups: FeeRecordPaymentGroup[] = [{ ...aFeeRecordPaymentGroup(), feeRecords: [feeRecord], status }];

      const checkedCheckboxId = `feeRecordIds-${nonMatchingFeeRecordId}-reportedPaymentsCurrency-${feeRecordReportedPaymentsCurrency}-status-${status}`;

      const isCheckboxChecked = (checkboxId: string) => checkboxId === checkedCheckboxId;

      // Act
      const viewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, isCheckboxChecked);

      // Assert
      expect(viewModel[0].isChecked).toBe(false);
    });
  });
});
