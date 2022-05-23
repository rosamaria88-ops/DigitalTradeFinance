const UNDERWRITER_MANAGER_DECISIONS = {
  APPROVED_WITH_CONDITIONS: 'Approve with conditions',
  APPROVED_WITHOUT_CONDITIONS: 'Approve without conditions',
  DECLINED: 'Declined',
  NOT_ADDED: 'Not added',
  AUTOMATIC_APPROVAL: 'Automatic approval',
  AWAITING_DECISION: 'Awaiting decision',
};

const UNDERWRITER_MANAGER_DECISIONS_TAGS = {
  [UNDERWRITER_MANAGER_DECISIONS.APPROVED_WITH_CONDITIONS]: 'govuk-tag--green',
  [UNDERWRITER_MANAGER_DECISIONS.APPROVED_WITHOUT_CONDITIONS]: 'govuk-tag--green',
  [UNDERWRITER_MANAGER_DECISIONS.DECLINED]: 'govuk-tag--red',
  [UNDERWRITER_MANAGER_DECISIONS.NOT_ADDED]: 'govuk-tag--yellow',
  [UNDERWRITER_MANAGER_DECISIONS.AUTOMATIC_APPROVAL]: 'govuk-tag--green',
  [UNDERWRITER_MANAGER_DECISIONS.AWAITING_DECISION]: 'govuk-tag--yellow',
};

module.exports = { UNDERWRITER_MANAGER_DECISIONS, UNDERWRITER_MANAGER_DECISIONS_TAGS };
