import { isNonEmptyString } from '@ukef/dtfs2-common';
import { ErrorSummaryViewModel } from '../../../types/view-models';
import { REGEX } from '../../../constants';

/**
 * Selector for the premium payments facility ID filter input element
 */
export const FACILITY_ID_INPUT_ID = '#premium-payments-facility-id-filter';

/**
 * Validates the premium payments facility ID query parameter.
 * @param originalUrl - The original URL of the request.
 * @param facilityIdQuery - The facility ID query parameter value.
 * @returns An error summary view model if validation fails, undefined otherwise.
 */
export const validateFacilityIdQuery = (originalUrl: string, facilityIdQuery?: string): ErrorSummaryViewModel | undefined => {
  if (originalUrl.includes('?premiumPaymentsFacilityId')) {
    if (!isNonEmptyString(facilityIdQuery)) {
      return {
        text: 'Enter a facility ID',
        href: FACILITY_ID_INPUT_ID,
      };
    }
    if (!REGEX.INT.test(facilityIdQuery)) {
      return {
        text: 'Facility ID must be a number',
        href: FACILITY_ID_INPUT_ID,
      };
    }
    if (!REGEX.PARTIAL_FACILITY_ID.test(facilityIdQuery)) {
      return {
        text: 'Facility ID must be between 4 and 10 characters',
        href: FACILITY_ID_INPUT_ID,
      };
    }
  }

  return undefined;
};
