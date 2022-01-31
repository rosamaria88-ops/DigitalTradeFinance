const CONSTANTS = require('../../constants');

const MOCK_MIA_TASKS_POPULATED = [
  {
    groupTitle: CONSTANTS.TASKS.GROUP_TITLES.SETUP_DEAL,
    id: 1,
    groupTasks: [
      {
        id: '1',
        groupId: 1,
        title: CONSTANTS.TASKS.AIN_AND_MIA.GROUP_1.MATCH_OR_CREATE_PARTIES,
        team: CONSTANTS.TEAMS.BUSINESS_SUPPORT,
        status: CONSTANTS.TASKS.STATUS.TO_DO,
        assignedTo: {
          userId: CONSTANTS.TASKS.UNASSIGNED,
          userFullName: CONSTANTS.TASKS.UNASSIGNED,
        },
      },
      {
        id: '2',
        groupId: 1,
        title: CONSTANTS.TASKS.AIN_AND_MIA.GROUP_1.CREATE_OR_LINK_SALESFORCE,
        team: CONSTANTS.TEAMS.BUSINESS_SUPPORT,
        status: CONSTANTS.TASKS.STATUS.CANNOT_START,
        assignedTo: {
          userId: CONSTANTS.TASKS.UNASSIGNED,
          userFullName: CONSTANTS.TASKS.UNASSIGNED,
        },
      },

      {
        id: '3',
        groupId: 1,
        title: CONSTANTS.TASKS.MIA_GROUP_1_TASKS.FILE_ALL_DEAL_EMAILS,
        team: CONSTANTS.TEAMS.UNDERWRITING_SUPPORT,
        status: CONSTANTS.TASKS.STATUS.CANNOT_START,
        assignedTo: {
          userId: CONSTANTS.TASKS.UNASSIGNED,
          userFullName: CONSTANTS.TASKS.UNASSIGNED,
        },
      },
    ],
  },
  {
    groupTitle: CONSTANTS.TASKS.GROUP_TITLES.ADVERSE_HISTORY,
    id: 2,
    groupTasks: [
      {
        id: '1',
        groupId: 2,
        title: CONSTANTS.TASKS.MIA_ADVERSE_HISTORY_GROUP_TASKS.COMPLETE_ADVERSE_HISTORY_CHECK,
        team: CONSTANTS.TEAMS.UNDERWRITERS,
        status: CONSTANTS.TASKS.STATUS.CANNOT_START,
        assignedTo: {
          userId: CONSTANTS.TASKS.UNASSIGNED,
          userFullName: CONSTANTS.TASKS.UNASSIGNED,
        },
      },
    ],
  },
  {
    groupTitle: CONSTANTS.TASKS.GROUP_TITLES.UNDERWRITING,
    id: 3,
    groupTasks: [
      {
        id: '1',
        groupId: 3,
        title: CONSTANTS.TASKS.MIA_GROUP_3_TASKS.CHECK_EXPOSURE,
        team: CONSTANTS.TEAMS.UNDERWRITERS,
        status: CONSTANTS.TASKS.STATUS.CANNOT_START,
        assignedTo: {
          userId: CONSTANTS.TASKS.UNASSIGNED,
          userFullName: CONSTANTS.TASKS.UNASSIGNED,
        },
      },
      {
        id: '2',
        groupId: 3,
        title: CONSTANTS.TASKS.MIA_GROUP_3_TASKS.GIVE_EXPORTER_A_CREDIT_RATING,
        team: CONSTANTS.TEAMS.UNDERWRITERS,
        status: CONSTANTS.TASKS.STATUS.CANNOT_START,
        assignedTo: {
          userId: CONSTANTS.TASKS.UNASSIGNED,
          userFullName: CONSTANTS.TASKS.UNASSIGNED,
        },
      },
      {
        id: '3',
        groupId: 3,
        title: CONSTANTS.TASKS.MIA_GROUP_3_TASKS.COMPLETE_CREDIT_ANALYSIS,
        team: CONSTANTS.TEAMS.UNDERWRITERS,
        status: CONSTANTS.TASKS.STATUS.CANNOT_START,
        assignedTo: {
          userId: CONSTANTS.TASKS.UNASSIGNED,
          userFullName: CONSTANTS.TASKS.UNASSIGNED,
        },
      },
    ],
  },
  {
    groupTitle: CONSTANTS.TASKS.GROUP_TITLES.APPROVALS,
    id: 4,
    groupTasks: [
      {
        id: '1',
        groupId: 4,
        title: CONSTANTS.TASKS.MIA_GROUP_4_TASKS.CHECK_THE_CREDIT_ANALYSIS,
        team: CONSTANTS.TEAMS.BUSINESS_SUPPORT,
        status: CONSTANTS.TASKS.STATUS.CANNOT_START,
        assignedTo: {
          userId: CONSTANTS.TASKS.UNASSIGNED,
          userFullName: CONSTANTS.TASKS.UNASSIGNED,
        },
      },
      {
        id: '2',
        groupId: 4,
        title: CONSTANTS.TASKS.MIA_GROUP_4_TASKS.COMPLETE_RISK_ANALYSIS,
        team: CONSTANTS.TEAMS.BUSINESS_SUPPORT,
        status: CONSTANTS.TASKS.STATUS.CANNOT_START,
        assignedTo: {
          userId: CONSTANTS.TASKS.UNASSIGNED,
          userFullName: CONSTANTS.TASKS.UNASSIGNED,
        },
      },
    ],
  },
];

module.exports = MOCK_MIA_TASKS_POPULATED;
