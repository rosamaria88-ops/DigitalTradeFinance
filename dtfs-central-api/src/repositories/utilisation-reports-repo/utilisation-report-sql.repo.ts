// TODO FN-1853 - rename this to `utilisation-report.repo.ts` when all repo
//  methods have been migrated from MongoDB to SQL
import { SqlDbDataSource } from '@ukef/dtfs2-common/sql-db-connection';
import { AzureFileInfoEntity, DbRequestSource, FeeRecordEntity, UtilisationReportEntity, ReportPeriod, AzureFileInfo } from '@ukef/dtfs2-common';
import { Not, Equal, FindOptionsWhere, LessThan } from 'typeorm';
import { UtilisationReportRawCsvData } from '../../types/utilisation-reports';
import { feeRecordCsvRowToSqlEntity } from '../../helpers';

type UpdateWithUploadDetailsParams = {
  azureFileInfo: AzureFileInfo;
  reportCsvData: UtilisationReportRawCsvData[];
  uploadedByUserId: string;
  requestSource: DbRequestSource;
};

export type GetUtilisationReportDetailsOptions = {
  reportPeriod?: ReportPeriod;
  excludeNotReceived?: boolean;
};

export const UtilisationReportRepo = SqlDbDataSource.getRepository(UtilisationReportEntity).extend({
  /**
   * Finds one report by bank id and report period
   * @param bankId - The bank id
   * @param reportPeriod - The report period
   * @returns The found report
   */
  async findOneByBankIdAndReportPeriod(bankId: string, reportPeriod: ReportPeriod, includeFeeRecords = false): Promise<UtilisationReportEntity | null> {
    return await this.findOne({
      where: { bankId, reportPeriod },
      relations: {
        feeRecords: includeFeeRecords,
      },
    });
  },

  /**
   * Finds all reports with bankId and matching options
   * @param bankId - The id of the bank to fetch reports for
   * @param options - The options determining which reports are retrieved for the given bank
   * @returns The found reports
   */
  async findAllByBankId(bankId: string, options?: GetUtilisationReportDetailsOptions): Promise<UtilisationReportEntity[]> {
    const findByOptionsWhere: FindOptionsWhere<UtilisationReportEntity> = { bankId };

    if (options?.reportPeriod) {
      findByOptionsWhere.reportPeriod = options.reportPeriod;
    }

    if (options?.excludeNotReceived) {
      findByOptionsWhere.status = Not('REPORT_NOT_RECEIVED');
    }

    return await this.findBy(findByOptionsWhere);
  },

  /**
   * Updates a report with upload details
   * @param report - The report to update
   * @param param1 - The upload data required to populate the report with
   * @returns The updated entity
   */
  async updateWithUploadDetails(
    report: UtilisationReportEntity,
    { azureFileInfo, reportCsvData, uploadedByUserId, requestSource }: UpdateWithUploadDetailsParams,
  ): Promise<UtilisationReportEntity> {
    const azureFileInfoEntity = AzureFileInfoEntity.create({
      ...azureFileInfo,
      requestSource,
    });

    const feeRecordEntities: FeeRecordEntity[] = reportCsvData.map((dataEntry) =>
      feeRecordCsvRowToSqlEntity({
        dataEntry,
        requestSource,
      }),
    );

    report.updateWithUploadDetails({
      azureFileInfo: azureFileInfoEntity,
      feeRecords: feeRecordEntities,
      uploadedByUserId,
      requestSource,
    });

    return await this.save(report);
  },

  /**
   * Finds open reports by bank id which have report periods which ended before
   * the supplied report period end
   * @param bankId - The bank id
   * @param reportPeriodEnd - The report period end
   * @returns The found report
   */
  async findOpenReportsForBankIdWithReportPeriodEndBefore(
    bankId: string,
    reportPeriodEnd: ReportPeriod['end'],
    includeFeeRecords = false,
  ): Promise<UtilisationReportEntity[]> {
    const bankIdAndStatusFindOptions: FindOptionsWhere<UtilisationReportEntity> = {
      bankId,
      status: Not('RECONCILIATION_COMPLETED'),
    };

    const previousYearFindOptions: FindOptionsWhere<UtilisationReportEntity> = {
      reportPeriod: {
        end: {
          year: LessThan(reportPeriodEnd.year),
        },
      },
    };

    const sameYearPreviousMonthsFindOptions: FindOptionsWhere<UtilisationReportEntity> = {
      reportPeriod: {
        end: {
          year: Equal(reportPeriodEnd.year),
          month: LessThan(reportPeriodEnd.month),
        },
      },
    };

    return await this.find({
      where: [
        { ...bankIdAndStatusFindOptions, ...previousYearFindOptions },
        { ...bankIdAndStatusFindOptions, ...sameYearPreviousMonthsFindOptions },
      ],
      relations: {
        feeRecords: includeFeeRecords,
      },
    });
  },
});
