export const PORTAL_ACTIVITY_LABEL = {
  MIA_SUBMISSION: 'Manual inclusion application submitted to UKEF',
  MIN_SUBMISSION: 'Manual inclusion notice submitted to UKEF',
  AIN_SUBMISSION: 'Automatic inclusion notice submitted to UKEF',
  FACILITY_CHANGED_ISSUED: 'Bank facility stage changed',
  DEAL_CANCELLED: 'Deal cancelled',
  DEAL_CANCELLATION_PENDING: 'Pending cancellation',
} as const;

export const PORTAL_ACTIVITY_TYPE = {
  FACILITY_STAGE: 'FACILITY_STAGE',
  NOTICE: 'NOTICE',
} as const;
