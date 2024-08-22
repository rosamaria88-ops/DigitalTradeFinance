import { Request, Response } from 'express';
import { asString, getFormattedReportPeriodWithLongMonth } from '@ukef/dtfs2-common';
import api from '../../../api';
import { asUserSession } from '../../../helpers/express-session';
import { PRIMARY_NAVIGATION_KEYS } from '../../../constants';
import {
  mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems,
  mapFeeRecordPaymentGroupsToPaymentDetailsViewModel,
  mapKeyingSheetToKeyingSheetViewModel,
} from '../helpers';
import { UtilisationReportReconciliationForReportViewModel } from '../../../types/view-models';
import { validateFacilityIdQuery } from './validate-facility-id-query';
import { getAndClearFieldsFromRedirectSessionData } from './get-and-clear-fields-from-redirect-session-data';
import { FeeRecordPaymentGroup } from '../../../api-response-types';

const feeRecordPaymentGroupsHaveAtLeastOnePaymentReceived = (feeRecordPaymentGroups: FeeRecordPaymentGroup[]): boolean =>
  feeRecordPaymentGroups.some(({ paymentsReceived }) => paymentsReceived !== null);

const renderUtilisationReportReconciliationForReport = (res: Response, viewModel: UtilisationReportReconciliationForReportViewModel) =>
  res.render('utilisation-reports/utilisation-report-reconciliation-for-report.njk', viewModel);

export const getUtilisationReportReconciliationByReportId = async (req: Request, res: Response) => {
  const { userToken, user } = asUserSession(req.session);
  const { reportId } = req.params;
  const { facilityIdQuery } = req.query;

  try {
    const facilityIdQueryAsString = facilityIdQuery ? asString(facilityIdQuery, 'facilityIdQuery') : undefined;
    const facilityIdQueryError = validateFacilityIdQuery(facilityIdQueryAsString, req.originalUrl);
    const { errorSummary: premiumPaymentFormError, isCheckboxChecked } = getAndClearFieldsFromRedirectSessionData(req);

    const { feeRecordPaymentGroups, reportPeriod, bank, keyingSheet } = await api.getUtilisationReportReconciliationDetailsById(
      reportId,
      facilityIdQueryAsString,
      userToken,
    );

    const formattedReportPeriod = getFormattedReportPeriodWithLongMonth(reportPeriod);

    const enablePaymentsReceivedSorting = feeRecordPaymentGroupsHaveAtLeastOnePaymentReceived(feeRecordPaymentGroups);

    const feeRecordPaymentGroupViewModel = mapFeeRecordPaymentGroupsToFeeRecordPaymentGroupViewModelItems(feeRecordPaymentGroups, isCheckboxChecked);

    const keyingSheetViewModel = mapKeyingSheetToKeyingSheetViewModel(keyingSheet);

    const paymentDetailsViewModel = mapFeeRecordPaymentGroupsToPaymentDetailsViewModel(feeRecordPaymentGroups);

    return renderUtilisationReportReconciliationForReport(res, {
      user,
      activePrimaryNavigation: PRIMARY_NAVIGATION_KEYS.UTILISATION_REPORTS,
      bank,
      formattedReportPeriod,
      reportId,
      enablePaymentsReceivedSorting,
      feeRecordPaymentGroups: feeRecordPaymentGroupViewModel,
      premiumPaymentFormError,
      facilityIdQueryError,
      facilityIdQuery: facilityIdQueryAsString,
      keyingSheet: keyingSheetViewModel,
      paymentDetails: paymentDetailsViewModel,
    });
  } catch (error) {
    console.error(`Failed to render utilisation report with id ${reportId}`, error);
    return res.render('_partials/problem-with-service.njk', { user });
  }
};
