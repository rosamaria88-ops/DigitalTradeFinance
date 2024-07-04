import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { UtilisationReportReconciliationDetails } from '../../../../types/utilisation-reports';
import { CustomExpressRequest } from '../../../../types/custom-express-request';
import { ApiError } from '../../../../errors';
import { getUtilisationReportReconciliationDetails } from './helpers';
import { REGEX } from '../../../../constants';

export type GetUtilisationReportReconciliationDetailsByIdRequest = CustomExpressRequest<{
  params: {
    reportId: string;
  };
  query: {
    facilityIdQuery?: string;
  };
}>;

type ResponseBody = UtilisationReportReconciliationDetails | string;

export const getUtilisationReportReconciliationDetailsById = async (req: GetUtilisationReportReconciliationDetailsByIdRequest, res: Response<ResponseBody>) => {
  const { reportId } = req.params;
  const { facilityIdQuery } = req.query;

  try {
    const facilityIdFilter = facilityIdQuery && REGEX.UKEF_PARTIAL_FACILITY_ID_REGEX.test(facilityIdQuery) ? facilityIdQuery : undefined;
    const utilisationReportReconciliationDetails = await getUtilisationReportReconciliationDetails(Number(reportId), facilityIdFilter);
    return res.status(HttpStatusCode.Ok).send(utilisationReportReconciliationDetails);
  } catch (error) {
    const errorMessage = `Failed to get utilisation report reconciliation for report with id '${reportId}'`;
    console.error(errorMessage, error);
    if (error instanceof ApiError) {
      return res.status(error.status).send(`${errorMessage}: ${error.message}`);
    }
    return res.status(HttpStatusCode.InternalServerError).send(errorMessage);
  }
};
