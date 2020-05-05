const FEE_TYPE = {
  ADVANCE: 'In advance',
  ARREAR: 'In arrear',
  MATURITY: 'At maturity',
};

const FEE_FREQUENCY = {
  MONTHLY: 'Monthly',
  QUARTERLY: 'Quarterly',
  SEMI_ANNUALLY: 'Semi-annually',
  ANNUALLY: 'Annually',
};

const DAY_COUNT_BASIS = {
  360: '360',
  300: '300',
};

const STAGE = {
  UNISSUED: 'Unissued',
  ISSUED: 'Issued',
};

const TYPE = {
  ADVANCE_PAYMENT_GUARANTEE: 'Advance payment guarantee',
  BID_BOND: 'Bid bond',
  MAINTENANCE_BOND: 'Maintenance bond',
  PERFORMANCE_BOND: 'Performance bond',
  PROGRESS_PAYMENT_BOND: 'Progress payment bond',
  RETENTION_BOND: 'Retention bond',
  STANDBY_LETTER_OF_CREDIT: 'Standby letter of credit',
  WARRANY_LETTER: 'Warranty letter',
};

module.exports = {
  FEE_TYPE,
  FEE_FREQUENCY,
  DAY_COUNT_BASIS,
  STAGE,
  TYPE,
};
