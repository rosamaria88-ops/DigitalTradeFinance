import { Request, Response } from 'express';
import { CustomExpressRequest } from '../../../../types/custom-express-request';
import { getManyUtilisationReportDetailsByBankId } from '../../../../services/repositories/utilisation-reports-repo';
import { UtilisationReportReconciliationStatus } from '../../../../types/utilisation-reports';
import { parseReportPeriod } from '../../../../utils/report-period';

export type GetUtilisationReportsRequest = CustomExpressRequest<{
  params: {
    bankId: string;
  };
  query: {
    reportPeriod?: Request['query'];
    reportStatuses?: UtilisationReportReconciliationStatus[];
  };
}>;

/**
 * Gets utilisation reports from the database filtered by
 * bank id and optionally filtered by the report period and
 * status.
 * @param req - The request object
 * @param res - The response object
 */
export const getUtilisationReports = async (req: GetUtilisationReportsRequest, res: Response) => {
  try {
    const { bankId } = req.params;
    const { reportPeriod, reportStatuses } = req.query;

    const parsedReportPeriod = parseReportPeriod(reportPeriod);

    const utilisationReports = await getManyUtilisationReportDetailsByBankId(bankId, {
      reportPeriod: parsedReportPeriod,
      reportStatuses,
    });
    return res.status(200).send(utilisationReports);
  } catch (error) {
    console.error('Unable to get utilisation reports:', error);
    return res.status(500).send({ status: 500, message: 'Failed to get utilisation reports' });
  }
};
