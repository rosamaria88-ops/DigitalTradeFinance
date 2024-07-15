import { DataSource } from 'typeorm';
import { getCurrentReportPeriodForBankSchedule } from '@ukef/dtfs2-common';
import { getAllBanksFromMongoDb, getPaymentReportOfficerOrFail } from '../helpers';
import { UtilisationReportSeeder } from './utilisation-report.seeder';

export const seedUtilisationReports = async (dataSource: DataSource): Promise<void> => {
  const banks = (await getAllBanksFromMongoDb()).filter((bank) => bank.isVisibleInTfmUtilisationReports);
  const bankIdsWithReportPeriod = banks.map(({ id, utilisationReportPeriodSchedule }) => ({
    bankId: id,
    reportPeriod: getCurrentReportPeriodForBankSchedule(utilisationReportPeriodSchedule),
  }));

  const paymentReportOfficer = await getPaymentReportOfficerOrFail('payment-officer1@ukexportfinance.gov.uk');
  const uploadedByUserId = paymentReportOfficer._id.toString();

  const [pendingReconciliationBankIdWithReportPeriod, reconciliationInProgressBankIdWithReportPeriod, ...notReceivedBankIdsWithReportPeriod] =
    bankIdsWithReportPeriod;

  await UtilisationReportSeeder.forBankIdAndReportPeriod(pendingReconciliationBankIdWithReportPeriod)
    .withUploadedByUserId(uploadedByUserId)
    .saveWithStatus('PENDING_RECONCILIATION', dataSource);

  await UtilisationReportSeeder.forBankIdAndReportPeriod(reconciliationInProgressBankIdWithReportPeriod)
    .withUploadedByUserId(uploadedByUserId)
    .saveWithStatus('RECONCILIATION_IN_PROGRESS', dataSource);

  await Promise.all(
    notReceivedBankIdsWithReportPeriod.map((bankIdWithReportPeriod) =>
      UtilisationReportSeeder.forBankIdAndReportPeriod(bankIdWithReportPeriod).saveWithStatus('REPORT_NOT_RECEIVED', dataSource),
    ),
  );
};
