const FACILITY_TYPE = {
  BOND: 'bond',
  LOAN: 'loan',
  CASH: 'CASH',
  CONTINGENT: 'CONTINGENT',
};

const FACILITY_PRODUCT_GROUP = {
  LOAN: 'EW',
  BOND: 'BS',
};

const FACILITY_PRODUCT_CODE = {
  BOND: 'BSS',
  LOAN: 'EWCS',
  GEF: 'GEF',
};

const FACILITY_PRODUCT_NAME = {
  BOND: 'Bond Support Scheme',
  LOAN: 'Export Working Capital Scheme',
  CASH: 'Cash',
  CONTINGENT: 'Contingent',
  GEF: 'General export facility',
};

const FACILITY_FEE_TYPE_PORTAL = {
  IN_ADVANCE: 'In advance',
  IN_ARREARS: 'In arrear',
  AT_MATURITY: 'At maturity',
};

// NOTE: subject to change
const FACILITY_FEE_TYPE_GEF = {
  IN_ARREARS_QUARTLY: 'IN_ARREARS_QUARTLY',
  IN_ADVANCE_QUARTERLY: 'IN_ADVANCE_QUARTERLY',
};

// NOTE: subject to change
const FACILITY_FEE_TYPE = {
  IN_ADVANCE: 'In advance',
  IN_ARREARS: 'In arrear',
};

const FACILITY_FEE_FREQUENCY_PORTAL = {
  MONTHLY: 'Monthly',
  QUARTERLY: 'Quarterly',
  SEMI_ANNUALLY: 'Semi-annually',
  ANNUALLY: 'Annually',
};

const FACILITY_PREMIUM_FREQUENCY_ID = {
  UNDEFINED: 0,
  MONTHLY: 1,
  QUARTERLY: 2,
  SEMI_ANNUALLY: 3,
  ANNUALLY: 4,
};

const FACILITY_PREMIUM_TYPE_ID = {
  IN_ADVANCE: 1,
  IN_ARREARS: 2,
  AT_MATURITY: 3,
};

const FACILITY_STAGE_PORTAL = {
  UNISSUED: 'Unissued',
  ISSUED: 'Issued',
  CONDITIONAL: 'Conditional',
  UNCONDITIONAL: 'Unconditional',
};

const FACILITY_STAGE = {
  COMMITMENT: 'Commitment',
  ISSUED: 'Issued',
};

const FACILITY_RISK_PROFILE = {
  FLAT: 'Flat',
};

const FACILITY_STATUS_PORTAL = {
  ACKNOWLEDGED: 'Acknowledged by UKEF',
};

const FACILITY_PROVIDED_ON_GEF = {
  TERM: {
    ID: 'TERM',
    TEXT: 'Term basis',
  },
  RESOLVING: {
    ID: 'RESOLVING',
    TEXT: 'Revolving or renewing basis',
  },
  COMMITTED: {
    ID: 'COMMITTED',
    TEXT: 'Committed basis',
  },
  UNCOMMITTED: {
    ID: 'UNCOMMITTED',
    TEXT: 'Uncommitted basis',
  },
  ON_DEMAND: {
    ID: 'ON_DEMAND',
    TEXT: 'On demand or overdraft basis',
  },
  FACTORING: {
    ID: 'FACTORING',
    TEXT: 'Factoring facility on a with-recourse basis',
  },
  OTHER: {
    ID: 'OTHER',
    TEXT: 'Other',
  },
};

module.exports = {
  FACILITY_TYPE,
  FACILITY_PRODUCT_GROUP,
  FACILITY_PRODUCT_CODE,
  FACILITY_PRODUCT_NAME,
  FACILITY_STAGE_PORTAL,
  FACILITY_STAGE,
  FACILITY_RISK_PROFILE,
  FACILITY_STATUS_PORTAL,
  FACILITY_PREMIUM_FREQUENCY_ID,
  FACILITY_PREMIUM_TYPE_ID,
  FACILITY_FEE_TYPE_PORTAL,
  FACILITY_FEE_FREQUENCY_PORTAL,
  FACILITY_FEE_TYPE_GEF,
  FACILITY_FEE_TYPE,
  FACILITY_PROVIDED_ON_GEF,
};
