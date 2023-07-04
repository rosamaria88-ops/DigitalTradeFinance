const FACILITY_TYPE = {
  BOND: 'Bond',
  LOAN: 'Loan',
  CASH: 'Cash',
  CONTINGENT: 'Contingent',
};

const FACILITY_TYPE_CODE = {
  BSS: '250',
  EWCS: '260',
  CASH: '280',
  CONTINGENT: '281',
};

const PRODUCT_TYPE_GROUP = {
  EWCS: 'EW',
  BSS: 'BS',
  GEF: 'GM',
};

const FACILITIES_STAGE = {
  LOAN: {
    CONDITIONAL: 'Conditional',
    UNCONDITIONAL: 'Unconditional',
  },
  BOND: {
    UNISSUED: 'Unissued',
    ISSUED: 'Issued',
  },
};

const FEE_FREQUENCY = {
  WEEKLY: 'Weekly',
  BI_WEEKLY: 'Bi-Weekly',
  MONTHLY: 'Monthly',
  BI_MONTHLY: 'Bi-Monthly',
  QUARTERLY: 'Quarterly',
  SEMI_ANNUALLY: 'Semi-annually',
  ANNUALLY: 'Annually',
  BI_ANNUALLY: 'Bi-annually',
};

const FEE_FREQUENCY_ACBS_CODE = {
  WEEKLY: 'A',
  BI_WEEKLY: 'B',
  MONTHLY: 'C',
  BI_MONTHLY: 'D',
  QUARTERLY: 'E',
  SEMI_ANNUALLY: 'F',
  ANNUALLY: 'G',
  BI_ANNUALLY: 'H',
};

const MASTER_FACILITY_FEE_FREQUENCY_ACBS_CODE = {
  SEMI_ANNUALLY: '1',
  QUARTERLY: '2',
  MONTHLY: '3',
  ANNUALLY: '4',
};

const FEE_FREQUENCY_NUMERICAL_VALUE = {
  MONTHLY: 1,
  QUARTERLY: 3,
  SEMI_ANNUALLY: 6,
  ANNUALLY: 12,
};

const FEE_TYPE = {
  IN_ADVANCE: 'In advance',
  IN_ARREARS: 'In arrears',
  AT_MATURITY: 'At maturity',
};

const FEE_TYPE_ACBS_CODE = {
  AT_MATURITY: 'G',
};

const COVENANT_TYPE = {
  UK_CONTRACT_VALUE: '43',
  CHARGEABLE_AMOUNT_GBP: '46',
  CHARGEABLE_AMOUNT_NON_GBP: '47',
};

const GUARANTEE_TYPE = {
  BOND_GIVER: '315',
  BOND_BENEFICIARY: '310',
  FACILITY_PROVIDER: '500',
  BUYER_FOR_EXPORTER_EWCS: '321',
};

const STAGE_CODE = {
  ISSUED: '07',
  UNISSUED: '06',
};

const FORECAST_PERCENTAGE = {
  ISSUED: 100,
  UNISSUED: 75,
};

const GUARANTEE_PERCENTAGE = {
  ISSUED: 100,
  UNISSUED: 75,
};

const LENDER_TYPE = {
  TYPE1: '100',
  TYPE5: '500',
};

const BUNDLE_STATUS = {
  STATUS2: 2,
  STATUS3: 3,
};

const TRANSACTION_TYPE = {
  TYPE2340: '2340',
};

const CREDIT_RATING = {
  AAA: '01',
  AA_PLUS: '02',
  AA: '03',
  AA_MINUS: '04',
  A_PLUS: '05',
  A: '06',
  A_MINUS: '07',
  BBB_PLUS: '08',
  BBB: '09',
  BBB_MINUS: '10',
  BB_PLUS: '11',
  BB: '12',
  BB_MINUS: '13',
  B_PLUS: '14',
  B: '15',
  B_MINUS: '16',
  CCC_PLUS: '17',
  CCC: '18',
  CCC_MINUS: '19',
  CC_PLUS: '20',
  CC: '21',
  CC_MINUS: '22',
  C_PLUS: '23',
  C: '24',
  C_MINUS: '25',
  D: '27',
  GOOD: '28',
  STANDARD: '29',
  ACCEPTABLE: '30',
  NOT_KNOWN: '98',
  NOT_APPLICABLE: '99',
};

const RISK = {
  COUNTRY: {
    UNITED_KINGDOM: 'GBR',
  },
  STATUS: {
    TYPE03: '03',
  },
};
const BANK_IDENTIFIER = {
  DEFAULT: '00000000',
};

const CURRENCY_EXCHANGE_RATE_OPERATION = {
  DIVIDE: 'D',
  MULTIPLY: 'M',
};

const ACBS_CURRENCY_CODE = {
  DEFAULT: 'O',
};

const DAY_COUNT_BASIS = {
  360: '5',
  365: '1',
};

const ACBS_INCOME_CLASS_CODE = {
  BSS: 'BPM',
  EWCS: 'EPM',
  GEF: 'FGT',
};

const NUMBER_GENERATOR_PAYLOAD = {
  COVENANT: {
    TYPE: 8,
    USER: 'Portal v2/TFM',
  },
};

const TRANSACTION_CODE = {
  TYPEA: 'A',
};

module.exports = {
  FACILITY_TYPE,
  FACILITY_TYPE_CODE,
  FACILITIES_STAGE,
  MASTER_FACILITY_FEE_FREQUENCY_ACBS_CODE,
  FEE_FREQUENCY,
  COVENANT_TYPE,
  GUARANTEE_TYPE,
  STAGE_CODE,
  FORECAST_PERCENTAGE,
  GUARANTEE_PERCENTAGE,
  LENDER_TYPE,
  BUNDLE_STATUS,
  TRANSACTION_TYPE,
  CREDIT_RATING,
  RISK,
  BANK_IDENTIFIER,
  CURRENCY_EXCHANGE_RATE_OPERATION,
  ACBS_CURRENCY_CODE,
  PRODUCT_TYPE_GROUP,
  DAY_COUNT_BASIS,
  FEE_FREQUENCY_ACBS_CODE,
  FEE_TYPE,
  FEE_TYPE_ACBS_CODE,
  FEE_FREQUENCY_NUMERICAL_VALUE,
  ACBS_INCOME_CLASS_CODE,
  NUMBER_GENERATOR_PAYLOAD,
  TRANSACTION_CODE,
};
