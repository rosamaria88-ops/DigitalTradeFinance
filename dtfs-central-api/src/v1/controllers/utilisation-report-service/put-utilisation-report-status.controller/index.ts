import { Response } from 'express';
import { HttpStatusCode } from 'axios';
import { EntityManager } from 'typeorm';
import { SqlDbDataSource } from '@ukef/dtfs2-common/sql-db-connection';
import { DbRequestSource } from '@ukef/dtfs2-common';
import { ReportWithStatus } from '../../../../types/utilisation-reports';
import { TfmSessionUser } from '../../../../types/tfm/tfm-session-user';
import { CustomExpressRequest } from '../../../../types/custom-express-request';
import { ApiError, InvalidPayloadError, TransactionFailedError } from '../../../../errors';
import { UtilisationReportStateMachine } from '../../../../services/state-machines/utilisation-report/utilisation-report.state-machine';

export type PutUtilisationReportStatusRequest = CustomExpressRequest<{
  reqBody: {
    user?: {
      _id?: TfmSessionUser['_id'];
    };
    reportsWithStatus?: ReportWithStatus[];
  };
}>;

/**
 * Asserts that the `reportWithStatus` contains the required fields
 * @param reportWithStatus - The report with status to set
 * @throws {InvalidPayloadError}
 */
const assertReportWithStatusIsPopulated = (reportWithStatus: ReportWithStatus) => {
  const { status, reportId } = reportWithStatus;
  if (!status || !reportId) {
    throw new InvalidPayloadError("Request body item 'reportsWithStatus' supplied does not match required format");
  }
};

/**
 * Execute the specific event handler depending on the status defined
 * in the `reportWithStatus` parameter
 * @param reportWithStatus - The report with status to set
 * @param transactionEntityManager - The entity manager for the transaction
 * @param requestSource - The request source
 */
const executeEventHandler = async (
  reportWithStatus: ReportWithStatus,
  transactionEntityManager: EntityManager,
  requestSource: DbRequestSource,
): Promise<void> => {
  const stateMachine = await UtilisationReportStateMachine.forReportId(reportWithStatus.reportId);

  if (reportWithStatus.status === 'RECONCILIATION_COMPLETED') {
    await stateMachine.handleEvent({
      type: 'MANUALLY_SET_COMPLETED',
      payload: {
        requestSource,
        transactionEntityManager,
      },
    });
    return;
  }
  await stateMachine.handleEvent({
    type: 'MANUALLY_SET_INCOMPLETE',
    payload: {
      requestSource,
      transactionEntityManager,
    },
  });
};

/**
 * Updates the reports statuses within a transaction
 * @param reportsWithStatus - The reports with status to set
 * @param requestSource - The request source
 * @throws {TransactionFailedError}
 */
const updateReportStatusesInTransaction = async (reportsWithStatus: ReportWithStatus[], requestSource: DbRequestSource): Promise<void> => {
  const queryRunner = SqlDbDataSource.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.startTransaction();
  try {
    const transactionEntityManager = queryRunner.manager;
    await Promise.all(reportsWithStatus.map((reportWithStatus) => executeEventHandler(reportWithStatus, transactionEntityManager, requestSource)));
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw new TransactionFailedError();
  } finally {
    await queryRunner.release();
  }
};

/**
 * Controller for setting multiple utilisation report statuses
 * @param req - The request object
 * @param res - The response object
 */
export const putUtilisationReportStatus = async (req: PutUtilisationReportStatusRequest, res: Response) => {
  try {
    const { reportsWithStatus, user } = req.body;

    if (!user || !user._id) {
      throw new InvalidPayloadError("Request body item 'user' supplied does not match required format");
    }

    const requestSource: DbRequestSource = {
      platform: 'TFM',
      userId: user._id.toString(),
    };

    if (!reportsWithStatus) {
      throw new InvalidPayloadError("Request body item 'reportsWithStatus' supplied does not match required format");
    }
    reportsWithStatus.forEach(assertReportWithStatusIsPopulated);

    await updateReportStatusesInTransaction(reportsWithStatus, requestSource);

    return res.sendStatus(HttpStatusCode.Ok);
  } catch (error) {
    console.error('Error updating utilisation report statuses:', error);
    if (error instanceof ApiError) {
      return res.status(error.status).send(`Failed to update utilisation report statuses: ${error.message}`);
    }
    return res.status(HttpStatusCode.InternalServerError).send(`Failed to update utilisation report statuses`);
  }
};
