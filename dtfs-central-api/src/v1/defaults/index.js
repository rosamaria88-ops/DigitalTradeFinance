const DEFAULTS = {
  DEAL: {
    details: {
      status: 'Draft',
    },
    eligibility: {
      status: 'Not started',
      criteria: [],
    },
    submissionDetails: {
      status: 'Not started',
    },
    summary: {},
    comments: [],
    editedBy: [],
    facilities: [],
  },
  DEAL_TFM: {
    history: {
      tasks: [],
      emails: [],
    },
  },
};

module.exports = DEFAULTS;
