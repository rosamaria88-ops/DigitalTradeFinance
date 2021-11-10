const SUBMISSION_TYPE = {
  AIN: 'Automatic Inclusion Notice',
  MIA: 'Manual Inclusion Application',
  MIN: 'Manual Inclusion Notice',
};

const SME_TYPE = {
  MICRO: 'Micro',
  SMALL: 'Small',
  MEDIUM: 'Medium',
  NON_SME: 'Non-SME',
  NOT_KNOWN: 'Not known',
};

const EXPIRATION_DATE = {
  NONE: null,
};

const PARTY = {
  GUARANTOR: '00000141',
};

const CURRENCY = {
  DEFAULT: 'GBP',
};

module.exports = {
  SME_TYPE,
  SUBMISSION_TYPE,
  EXPIRATION_DATE,
  PARTY,
  CURRENCY,
};
