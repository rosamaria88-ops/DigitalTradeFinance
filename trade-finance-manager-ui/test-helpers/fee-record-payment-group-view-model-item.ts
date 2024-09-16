import { CURRENCY, FEE_RECORD_STATUS } from '@ukef/dtfs2-common';
import { FeeRecordPaymentGroupViewModelItem } from '../server/types/view-models';

export const aFeeRecordPaymentGroupViewModelItem = (): FeeRecordPaymentGroupViewModelItem => ({
  feeRecords: [
    {
      id: 1,
      facilityId: '12345678',
      exporter: 'Test exporter',
      reportedFees: 'GBP 100.00',
      reportedPayments: 'GBP 100.00',
    },
  ],
  totalReportedPayments: {
    formattedCurrencyAndAmount: 'GBP 100.00',
    dataSortValue: 0,
  },
  paymentsReceived: [],
  totalPaymentsReceived: {
    formattedCurrencyAndAmount: undefined,
    dataSortValue: 0,
  },
  status: FEE_RECORD_STATUS.TO_DO,
  displayStatus: 'TO DO',
  checkboxId: `feeRecordIds-1-reportedPaymentsCurrency-${CURRENCY.GBP}-status-${FEE_RECORD_STATUS.TO_DO}`,
  isChecked: false,
  checkboxAriaLabel: '',
});