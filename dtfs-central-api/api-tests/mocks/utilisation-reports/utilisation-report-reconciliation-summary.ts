import { ObjectId } from 'mongodb';
import { UtilisationReportReconciliationSummary, UtilisationReportReconciliationSummaryItem } from '../../../src/types/utilisation-reports';
import { MOCK_BANKS } from '../banks';
import { UTILISATION_REPORT_RECONCILIATION_STATUS } from '../../../src/constants/utilisation-report-reconciliation-status';

const MOCK_UTILISATION_REPORT_RECONCILIATION_SUMMARY_ITEM: UtilisationReportReconciliationSummaryItem = {
  reportId: new ObjectId('6598162ce10f06e419170321'),
  bank: {
    id: MOCK_BANKS.BARCLAYS.id,
    name: MOCK_BANKS.BARCLAYS.name,
  },
  status: UTILISATION_REPORT_RECONCILIATION_STATUS.PENDING_RECONCILIATION,
  dateUploaded: new Date('2024-01-14T15:36:00Z'),
  totalFeesReported: 4,
  reportedFeesLeftToReconcile: 2,
};

export const MOCK_UTILISATION_REPORT_RECONCILIATION_SUMMARY: UtilisationReportReconciliationSummary = {
  submissionMonth: '2024-01',
  items: [MOCK_UTILISATION_REPORT_RECONCILIATION_SUMMARY_ITEM],
};