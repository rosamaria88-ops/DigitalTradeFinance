import { GetPaymentDetailsResponseBody } from '../server/api-response-types';
import { aFeeRecord } from './fee-record';
import { aPayment } from './payment';

export const aPaymentDetailsResponseBody = (): GetPaymentDetailsResponseBody => ({
  bank: {
    id: '123',
    name: 'Test bank',
  },
  reportPeriod: {
    start: { month: 1, year: 2024 },
    end: { month: 1, year: 2024 },
  },
  payment: aPayment(),
  feeRecords: [aFeeRecord()],
  totalReportedPayments: {
    currency: 'GBP',
    amount: 100,
  },
});