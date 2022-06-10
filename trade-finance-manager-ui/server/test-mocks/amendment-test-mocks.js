const CONSTANTS = require('../constants');

const MOCK_DEAL = {
  _id: '61f6ac5b02ffda01b1e8efef',
  dealSnapshot: {
    _id: '61f6ac5b02ffda01b1e8efef',
    submissionType: CONSTANTS.DEAL.SUBMISSION_TYPE.MIA,
  },
  tfm: {
    leadUnderwriter: '12345678910',
  },
};
const MOCK_USER_UNDERWRITER_MANAGER = {
  _id: '12345678',
  username: 'UNDERWRITER_MANAGER_1',
  firstName: 'Joe',
  lastName: 'Bloggs',
  teams: ['UNDERWRITER_MANAGERS'],
};

const MOCK_USER_UNDERWRITER = {
  _id: '100200300',
  username: 'UNDERWRITER_1',
  firstName: 'Joe',
  lastName: 'Bloggs',
  teams: ['UNDERWRITERS'],
  email: 'test@test.com',
};

const MOCK_USER_PIM = {
  _id: '12345678',
  username: 'PIM',
  firstName: 'Joe',
  lastName: 'Bloggs',
  teams: ['PIM'],
  email: 'testPim@test.com',
};

const MOCK_TEAM_UNDERWRITER_MANAGERS = [
  MOCK_USER_UNDERWRITER_MANAGER,
];

const session = {
  user: MOCK_USER_UNDERWRITER_MANAGER,
};

const MOCK_AMENDMENT = {
  amendmentId: '12345',
  facilityId: '45678',
  dealId: '999',
  ukefFacilityId: '123',
  type: CONSTANTS.FACILITY.FACILITY_TYPE.CASH,
  status: CONSTANTS.AMENDMENTS.AMENDMENT_STATUS.IN_PROGRESS,
  submittedByPim: false,
};

const MOCK_AMENDMENT_UNDERWRITER_DECISION_NOT_SUBMITTED = {
  ...MOCK_AMENDMENT,
  ukefDecision: {
    reason: 'a reason for declining the amendment',
    conditions: 'a set of conditions for this amendment',
    comments: 'extra comments',
    submitted: false,
  },
};

const MOCK_AMENDMENT_UNDERWRITER_DECISION_SUBMITTED = {
  ...MOCK_AMENDMENT,
  ukefDecision: {
    reason: 'a reason for declining the amendment',
    conditions: 'a set of conditions for this amendment',
    comments: 'extra comments',
    submitted: true,
  },
};

const MOCK_AMENDMENT_LEAD_UNDERWRITER = {
  ...MOCK_AMENDMENT,
  leadUnderwriterId: '12345678',
};

const MOCK_AMENDMENT_BOTH_DECLINED = {
  ...MOCK_AMENDMENT,
  changeCoverEndDate: true,
  changeFacilityValue: true,
  ukefDecision: {
    coverEndDate: CONSTANTS.DECISIONS.UNDERWRITER_MANAGER_DECISIONS.DECLINED,
    value: CONSTANTS.DECISIONS.UNDERWRITER_MANAGER_DECISIONS.DECLINED,
  },
};

const MOCK_AMENDMENT_TWO_AMENDMENTS_ONE_DECLINED = {
  ...MOCK_AMENDMENT,
  changeCoverEndDate: true,
  changeFacilityValue: true,
  ukefDecision: {
    coverEndDate: CONSTANTS.DECISIONS.UNDERWRITER_MANAGER_DECISIONS.APPROVED_WITHOUT_CONDITIONS,
    value: CONSTANTS.DECISIONS.UNDERWRITER_MANAGER_DECISIONS.DECLINED,
    submitted: true,
  },
};

const MOCK_AMENDMENT_TWO_AMENDMENTS_ONE_DECLINED_NOT_SUBMITTED = {
  ...MOCK_AMENDMENT_TWO_AMENDMENTS_ONE_DECLINED,
  ukefDecision: {
    coverEndDate: CONSTANTS.DECISIONS.UNDERWRITER_MANAGER_DECISIONS.APPROVED_WITHOUT_CONDITIONS,
    value: CONSTANTS.DECISIONS.UNDERWRITER_MANAGER_DECISIONS.DECLINED,
    submitted: false,
  },
};

const MOCK_AMENDMENT_COVERENDDATE = {
  ...MOCK_AMENDMENT,
  changeCoverEndDate: true,
  changeFacilityValue: false,
  ukefDecision: {
    coverEndDate: CONSTANTS.DECISIONS.UNDERWRITER_MANAGER_DECISIONS.DECLINED,
  },
};

const MOCK_AMENDMENT_FACILITYVALUE = {
  ...MOCK_AMENDMENT,
  changeCoverEndDate: false,
  changeFacilityValue: true,
  ukefDecision: {
    value: CONSTANTS.DECISIONS.UNDERWRITER_MANAGER_DECISIONS.DECLINED,
  },
};

const MOCK_AMENDMENT_BANK_DECISION = {
  ...MOCK_AMENDMENT_TWO_AMENDMENTS_ONE_DECLINED,
  bankDecision: {
    decision: CONSTANTS.AMENDMENTS.AMENDMENT_BANK_DECISION.PROCEED,
  },
};

const MOCK_AMENDMENT_BANK_DECISION_WITHDRAW = {
  ...MOCK_AMENDMENT_TWO_AMENDMENTS_ONE_DECLINED,
  bankDecision: {
    decision: CONSTANTS.AMENDMENTS.AMENDMENT_BANK_DECISION.WITHDRAW,
  },
};

const MOCK_AMENDMENT_BANK_DECISION_WITH_DATES = {
  ...MOCK_AMENDMENT_TWO_AMENDMENTS_ONE_DECLINED,
  bankDecision: {
    decision: CONSTANTS.AMENDMENTS.AMENDMENT_BANK_DECISION.PROCEED,
    receivedDate: 1654698568,
  },
};

const MOCK_AMENDMENT_BANK_DECISION_WITH_EFFECTIVE_DATES = {
  ...MOCK_AMENDMENT_TWO_AMENDMENTS_ONE_DECLINED,
  bankDecision: {
    decision: CONSTANTS.AMENDMENTS.AMENDMENT_BANK_DECISION.PROCEED,
    receivedDate: 1654698568,
    effectiveDate: 1654698568,
  },
};

module.exports = {
  MOCK_DEAL,
  MOCK_USER_UNDERWRITER_MANAGER,
  session,
  MOCK_AMENDMENT,
  MOCK_AMENDMENT_UNDERWRITER_DECISION_NOT_SUBMITTED,
  MOCK_AMENDMENT_UNDERWRITER_DECISION_SUBMITTED,
  MOCK_AMENDMENT_LEAD_UNDERWRITER,
  MOCK_TEAM_UNDERWRITER_MANAGERS,
  MOCK_USER_UNDERWRITER,
  MOCK_USER_PIM,
  MOCK_AMENDMENT_BOTH_DECLINED,
  MOCK_AMENDMENT_TWO_AMENDMENTS_ONE_DECLINED,
  MOCK_AMENDMENT_TWO_AMENDMENTS_ONE_DECLINED_NOT_SUBMITTED,
  MOCK_AMENDMENT_COVERENDDATE,
  MOCK_AMENDMENT_FACILITYVALUE,
  MOCK_AMENDMENT_BANK_DECISION,
  MOCK_AMENDMENT_BANK_DECISION_WITHDRAW,
  MOCK_AMENDMENT_BANK_DECISION_WITH_DATES,
  MOCK_AMENDMENT_BANK_DECISION_WITH_EFFECTIVE_DATES,
};
