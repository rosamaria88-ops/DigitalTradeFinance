import { IsoDateTimeStamp } from './date.d.ts';

export type UtilisationReportReconciliationStatus =
  | 'REPORT_NOT_RECEIVED'
  | 'PENDING_RECONCILIATION'
  | 'RECONCILIATION_IN_PROGRESS'
  | 'RECONCILIATION_COMPLETED';

export type UtilisationReportReconciliationSummaryItem = {
  reportId?: string;
  bank: {
    id: string;
    name: string;
  };
  status: UtilisationReportReconciliationStatus;
  dateUploaded?: IsoDateTimeStamp;
  totalFeesReported?: number;
  reportedFeesLeftToReconcile?: number;
};
