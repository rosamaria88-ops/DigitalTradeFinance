const DEAL_TYPE = 'GEF';

const SME_TYPE = {
  MICRO: 'MICRO',
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  NOT_SME: 'NOT_SME',
};

const FACILITY_TYPE = {
  CASH: 'CASH',
  CONTINGENT: 'CONTINGENT',
};

const PAYMENT_TYPE = {
  IN_ARREARS_MONTHLY: 'IN_ARREARS_MONTHLY',
  IN_ARREARS_QUARTLY: 'IN_ARREARS_QUARTLY',
  IN_ARREARS_SEMI_ANNUALLY: 'IN_ARREARS_SEMI_ANNUALLY',
  IN_ARREARS_ANNUALLY: 'IN_ARREARS_ANNUALLY',
  IN_ADVANCE_QUARTERLY: 'IN_ADVANCE_QUARTERLY',
  IN_ADVANCE_MONTHLY: 'IN_ADVANCE_MONTHLY',
  IN_ADVANCE_SEMI_ANNUALLY: 'IN_ADVANCE_SEMI_ANNUALLY',
  IN_ADVANCE_ANNUALLY: 'IN_ADVANCE_ANNUALLY',
  AT_MATURITY: 'AT_MATURITY',
};

const STATUS = {
  DRAFT: 'DRAFT',
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CHANGES_REQUIRED: 'CHANGES_REQUIRED',
  BANK_CHECK: 'BANK_CHECK',
  SUBMITTED_TO_UKEF: 'SUBMITTED_TO_UKEF',
  UKEF_ACKNOWLEDGED: 'UKEF_ACKNOWLEDGED',
  UKEF_IN_PROGRESS: 'UKEF_IN_PROGRESS',
  UKEF_APPROVED_WITHOUT_CONDITIONS: 'UKEF_APPROVED_WITHOUT_CONDITIONS',
  UKEF_APPROVED_WITH_CONDITIONS: 'UKEF_APPROVED_WITH_CONDITIONS',
  UKEF_REFUSED: 'Rejected by UKEF',
  ABANDONED: 'ABANDONED',
};

const ERROR = {
  ENUM_ERROR: 'ENUM_ERROR',
  MANDATORY_FIELD: 'MANDATORY_FIELD',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  OVERSEAS_COMPANY: 'OVERSEAS_COMPANY',
  FIELD_INVALID_CHARACTERS: 'FIELD_INVALID_CHARACTERS',
  FIELD_TOO_LONG: 'FIELD_TOO_LONG',
};

const FACILITY_PROVIDED_DETAILS = {
  TERM: 'TERM',
  RESOLVING: 'RESOLVING',
  COMMITTED: 'COMMITTED',
  UNCOMMITTED: 'UNCOMMITTED',
  ON_DEMAND: 'ON_DEMAND',
  FACTORING: 'FACTORING',
  OTHER: 'OTHER',
};

const CURRENCY = {
  GBP: 'GBP',
  EUR: 'EUR',
  USD: 'USD',
  YEN: 'JPY',
};

module.exports = {
  DEAL_TYPE,
  SME_TYPE,
  FACILITY_TYPE,
  PAYMENT_TYPE,
  STATUS,
  ERROR,
  FACILITY_PROVIDED_DETAILS,
  CURRENCY,
};
