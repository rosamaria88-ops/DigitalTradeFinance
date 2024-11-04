import {
  IsoDateTimeStamp,
  ReportPeriod,
  UtilisationReportStatus,
  FeeRecordStatus,
  CurrencyAndAmount,
  KeyingSheetRowStatus,
  Currency,
  KeyingSheetAdjustment,
  FeeRecordUtilisation,
} from '@ukef/dtfs2-common';
import { FeeRecord } from './fee-record';
import { Payment } from './payment';

export type PremiumPaymentsGroup = {
  feeRecords: FeeRecord[];
  totalReportedPayments: CurrencyAndAmount;
  paymentsReceived: Payment[] | null;
  totalPaymentsReceived: CurrencyAndAmount | null;
  status: FeeRecordStatus;
};

export type PaymentDetails = {
  feeRecords: FeeRecord[];
  payment: Payment;
  status: FeeRecordStatus;
  reconciledByUser?: {
    firstName: string;
    lastName: string;
  };
  dateReconciled?: IsoDateTimeStamp;
};

export type KeyingSheetRow = {
  feeRecordId: number;
  status: KeyingSheetRowStatus;
  facilityId: string;
  exporter: string;
  feePayments: {
    currency: Currency;
    amount: number;
    dateReceived: IsoDateTimeStamp | null;
  }[];
  baseCurrency: Currency;
  fixedFeeAdjustment: KeyingSheetAdjustment | null;
  principalBalanceAdjustment: KeyingSheetAdjustment | null;
};

export type KeyingSheet = KeyingSheetRow[];

export type UtilisationReportReconciliationDetailsResponseBody = {
  reportId: number;
  bank: {
    id: string;
    name: string;
  };
  status: UtilisationReportStatus;
  reportPeriod: ReportPeriod;
  dateUploaded: IsoDateTimeStamp;
  premiumPayments: PremiumPaymentsGroup[];
  paymentDetails: PaymentDetails[];
  keyingSheet: KeyingSheet;
  utilisationDetails: FeeRecordUtilisation[];
};
