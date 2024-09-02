import { Response } from 'express';
import { getFormattedReportPeriodWithLongMonth } from '@ukef/dtfs2-common';
import { AddToAnExistingPaymentViewModel } from '../../../types/view-models';
import api from '../../../api';
import { asUserSession } from '../../../helpers/express-session';
import {
  getFeeRecordIdsFromPremiumPaymentsCheckboxIds,
  getPremiumPaymentsCheckboxIdsFromObjectKeys,
} from '../../../helpers/premium-payments-table-checkbox-id-helper';
import { CustomExpressRequest } from '../../../types/custom-express-request';
import { PRIMARY_NAVIGATION_KEYS } from '../../../constants';
import {
  extractAddToAnExistingPaymentRadioPaymentIdsAndValidateIfPresent,
  mapToSelectedReportedFeesDetailsViewModel,
  PremiumPaymentsTableCheckboxSelectionsRequestBody,
} from '../helpers';
import { mapToPaymentGroupInputsViewModel } from '../helpers/available-payment-group-view-model-mapper';
import { getPaymentsHeading } from '../helpers/add-to-an-existing-payment-helper';
import { getLinkToPremiumPaymentsTab } from './get-link-to-premium-payments-tab';

type AddToAnExistingPaymentRequest = CustomExpressRequest<{
  reqBody: PremiumPaymentsTableCheckboxSelectionsRequestBody;
}>;

const renderAddToAnExistingPaymentPage = (res: Response, context: AddToAnExistingPaymentViewModel) =>
  res.render('utilisation-reports/add-to-an-existing-payment.njk', context);

export const addToAnExistingPayment = async (req: AddToAnExistingPaymentRequest, res: Response) => {
  try {
    const { user, userToken } = asUserSession(req.session);
    const { reportId } = req.params;
    const checkedCheckboxIds = getPremiumPaymentsCheckboxIdsFromObjectKeys(req.body);
    const feeRecordIds = getFeeRecordIdsFromPremiumPaymentsCheckboxIds(checkedCheckboxIds);

    const selectedFeeRecordDetails = await api.getSelectedFeeRecordsDetailsWithAvailablePaymentGroups(reportId, feeRecordIds, userToken);
    const { availablePaymentGroups } = selectedFeeRecordDetails;

    if (!availablePaymentGroups || availablePaymentGroups.length === 0) {
      throw new Error('No available payment groups attached to fee record details response.');
    }

    const { isAddingToAnExistingPayment, errors, paymentIds } = extractAddToAnExistingPaymentRadioPaymentIdsAndValidateIfPresent(req.body);
    const formHasErrors = errors.errorSummary.length !== 0;

    if (isAddingToAnExistingPayment && !formHasErrors) {
      await api.addFeesToAnExistingPayment(reportId, feeRecordIds, paymentIds, user, userToken);
      return res.redirect(`/utilisation-reports/${reportId}`);
    }

    const addToAnExistingPaymentViewModel: AddToAnExistingPaymentViewModel = {
      user,
      activePrimaryNavigation: PRIMARY_NAVIGATION_KEYS.UTILISATION_REPORTS,
      reportId,
      bank: selectedFeeRecordDetails.bank,
      formattedReportPeriod: getFormattedReportPeriodWithLongMonth(selectedFeeRecordDetails.reportPeriod),
      reportedFeeDetails: mapToSelectedReportedFeesDetailsViewModel(selectedFeeRecordDetails),
      selectedFeeRecordCheckboxIds: checkedCheckboxIds,
      paymentsHeading: getPaymentsHeading(availablePaymentGroups),
      paymentGroups: mapToPaymentGroupInputsViewModel(availablePaymentGroups),
      errors,
      backLinkHref: getLinkToPremiumPaymentsTab(reportId, feeRecordIds),
    };
    return renderAddToAnExistingPaymentPage(res, addToAnExistingPaymentViewModel);
  } catch (error) {
    console.error('Failed to add fees to an existing payment', error);
    return res.render('_partials/problem-with-service.njk', { user: req.session.user });
  }
};
