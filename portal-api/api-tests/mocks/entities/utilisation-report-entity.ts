import { UTILISATION_REPORT_RECONCILIATION_STATUS, UtilisationReportEntity } from "@ukef/dtfs2-common";
import { anAzureFileInfoEntity } from "./azure-file-info-entity";
import { aReportPeriodPartialEntity } from "./report-period-partial-entity";

export const anUploadedUtilisationReportEntity = (): UtilisationReportEntity => {
  const mock = new UtilisationReportEntity();
  mock.bankId = '123';
  mock.azureFileInfo = anAzureFileInfoEntity();
  mock.reportPeriod = aReportPeriodPartialEntity();
  mock.status = UTILISATION_REPORT_RECONCILIATION_STATUS.PENDING_RECONCILIATION;
  mock.data = [];
  mock.updatedByUserId = 'SYSTEM';
  return mock;
};

export const aNotReceivedUtilisationReportEntity = (): UtilisationReportEntity => {
  const mock = new UtilisationReportEntity();
  mock.bankId = '123';
  mock.azureFileInfo = undefined;
  mock.reportPeriod = aReportPeriodPartialEntity();
  mock.status = UTILISATION_REPORT_RECONCILIATION_STATUS.REPORT_NOT_RECEIVED;
  mock.data = [];
  mock.updatedByUserId = 'SYSTEM';
  return mock;
};

export const aNonUploadedMarkedReconciledUtilisationReportEntity = (): UtilisationReportEntity => {
  const mock = new UtilisationReportEntity();
  mock.bankId = '123';
  mock.azureFileInfo = undefined;
  mock.reportPeriod = aReportPeriodPartialEntity();
  mock.status = UTILISATION_REPORT_RECONCILIATION_STATUS.RECONCILIATION_COMPLETED;
  mock.data = [];
  mock.updatedByUserId = 'SYSTEM';
  return mock;
};
