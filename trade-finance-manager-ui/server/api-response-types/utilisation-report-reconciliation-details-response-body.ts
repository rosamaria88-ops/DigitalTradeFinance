import { IsoDateTimeStamp, ReportPeriod, UtilisationReportReconciliationStatus, FeeRecordStatus, CurrencyAndAmount } from '@ukef/dtfs2-common';

export type FeeRecordItem = {
  id: number;
  facilityId: string;
  exporter: string;
  reportedFees: CurrencyAndAmount;
  reportedPayments: CurrencyAndAmount;
};

export type Payment = CurrencyAndAmount & {
  id: number;
};

export type FeeRecordPaymentGroup = {
  feeRecords: FeeRecordItem[];
  totalReportedPayments: CurrencyAndAmount;
  paymentsReceived: Payment[] | null;
  totalPaymentsReceived: CurrencyAndAmount | null;
  status: FeeRecordStatus;
};

export type UtilisationReportReconciliationDetailsResponseBody = {
  reportId: number;
  bank: {
    id: string;
    name: string;
  };
  status: UtilisationReportReconciliationStatus;
  reportPeriod: ReportPeriod;
  dateUploaded: IsoDateTimeStamp;
  feeRecordPaymentGroups: FeeRecordPaymentGroup[];
};
