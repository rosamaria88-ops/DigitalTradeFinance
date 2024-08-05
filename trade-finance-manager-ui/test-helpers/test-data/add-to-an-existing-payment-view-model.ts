import { PRIMARY_NAVIGATION_KEYS } from '../../server/constants';
import { AddToAnExistingPaymentViewModel } from '../../server/types/view-models';
import { aTfmSessionUser } from './tfm-session-user';

export const anAddToAnExistingPaymentViewModel = (): AddToAnExistingPaymentViewModel => ({
  user: aTfmSessionUser(),
  activePrimaryNavigation: PRIMARY_NAVIGATION_KEYS.UTILISATION_REPORTS,
  reportId: '12',
  bank: { name: 'Test bank ' },
  formattedReportPeriod: 'Some reporting period',
  reportedFeeDetails: {
    totalReportedPayments: 'GBP 200',
    feeRecords: [
      {
        id: 123,
        facilityId: '12345',
        exporter: 'export',
        reportedFees: { formattedCurrencyAndAmount: 'GBP 200', dataSortValue: 1 },
        reportedPayments: { formattedCurrencyAndAmount: 'GBP 200', dataSortValue: 1 },
      },
    ],
  },
});