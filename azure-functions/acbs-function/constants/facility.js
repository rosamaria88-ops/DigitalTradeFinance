const FACILITY_TYPE = {
  BOND: 'bond',
  LOAN: 'loan',
  CASH: 'CASH',
  CONTINGENT: 'CONTINGENT',
};

const FACILITY_TYPE_CODE = {
  BSS: '250',
  EWCS: '260',
  GEF: '280',
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
  MONTHLY: 'Monthly',
  QUARTERLY: 'Quarterly',
  SEMI_ANNUALLY: 'Semi-annually',
  ANNUALLY: 'Annually',
};

const COVENANT_TYPE = {
  UK_CONTRACT_VALUE: '43',
  CHARGEABLE_AMOUNT_GDP: '46',
  CHARGEABLE_AMOUNT_NON_GDP: '47',
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

const LENDER_TYPE = {
  TYPE1: '100',
  TYPE5: '500',
}

const BUNDLE_STATUS = {
  STATUS2: 2,
  STATUS3: 3,
}

const PORTFOLIO = {
  E1: 'E1',
}

const TRANSACTION_CODE = {
  TYPEA: 'A',
}

const TRANSACTION_TYPE = {
  TYPE2340: '2340',
}

const LIMIT_TYPE = {
  TYPE0: '00',
}

const CREDIT_RATING = {
  CODE14: '14', 
}

const RISK = {
  COUNTRY = {
    UNITED_KINGDOM: 'GBR',
  },
  STATUS = {
    TYPE03: '03',
  }
}

const API_USER = {
  APIUKEF: 'APIUKEF',
}

module.exports = {
  FACILITY_TYPE,
  FACILITY_TYPE_CODE,
  FACILITIES_STAGE,
  FEE_FREQUENCY,
  COVENANT_TYPE,
  GUARANTEE_TYPE,
  STAGE_CODE,
  FORECAST_PERCENTAGE,
  LENDER_TYPE,
  BUNDLE_STATUS,
  PORTFOLIO,
  TRANSACTION_CODE,
  TRANSACTION_TYPE,
  LIMIT_TYPE,
  CREDIT_RATING,
  RISK,
  API_USER,
};
