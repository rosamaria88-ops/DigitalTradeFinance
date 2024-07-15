import { ValuesOf } from '@ukef/dtfs2-common';

export const UTILISATION_REPORT_EVENT_TYPE = {
  DUE_REPORT_INITIALISED: 'DUE_REPORT_INITIALISED',
  GENERATE_KEYING_DATA: 'GENERATE_KEYING_DATA',
  MANUALLY_SET_COMPLETED: 'MANUALLY_SET_COMPLETED',
  MANUALLY_SET_INCOMPLETE: 'MANUALLY_SET_INCOMPLETE',
  ADD_A_PAYMENT: 'ADD_A_PAYMENT',
  DELETE_PAYMENT: 'DELETE_PAYMENT',
  REPORT_UPLOADED: 'REPORT_UPLOADED',
  EDIT_PAYMENT: 'EDIT_PAYMENT',
  REMOVE_FEES_FROM_PAYMENT_GROUP: 'REMOVE_FEES_FROM_PAYMENT_GROUP',
} as const;

export const UTILISATION_REPORT_EVENT_TYPES = Object.values(UTILISATION_REPORT_EVENT_TYPE);

export type UtilisationReportEventType = ValuesOf<typeof UTILISATION_REPORT_EVENT_TYPE>;
