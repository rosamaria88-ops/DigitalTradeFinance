const api = require('../api');
const CONSTANTS = require('../../constants');
const now = require('../../now');
const {
  previousTaskIsComplete,
  isFirstTaskInFirstGroup,
  getGroup,
  getTask,
  canUpdateTask,
} = require('../helpers/tasks');
const sendTfmEmail = require('./send-tfm-email');

const updateHistory = ({
  taskId,
  groupId,
  statusFrom,
  statusTo,
  assignedUserId,
  updatedBy,
}) => ({
  taskId,
  groupId,
  statusFrom,
  statusTo,
  assignedUserId,
  updatedBy,
  timestamp: now(),
});

const getNewAssigneeFullName = async (assignedUserId) => {
  let fullName;

  if (assignedUserId === CONSTANTS.TASKS.UNASSIGNED) {
    fullName = CONSTANTS.TASKS.UNASSIGNED;
  } else {
    const user = await api.findUserById(assignedUserId);
    const { firstName, lastName } = user;

    fullName = `${firstName} ${lastName}`;
  }

  return fullName;
};

const updateTask = (allTaskGroups, groupId, taskIdToUpdate, taskUpdate) =>
  allTaskGroups.map((tGroup) => {
    let group = tGroup;

    group = {
      ...group,
      groupTasks: group.groupTasks.map((t) => {
        let task = t;

        if (task.id === taskIdToUpdate
          && task.groupId === groupId) {
          task = {
            ...task,
            ...taskUpdate,
          };
        }

        return task;
      }),
    };

    return group;
  });

const generateTaskUrl = (urlOrigin, dealId, task) => {
  const {
    id: taskId,
    groupId,
  } = task;

  return `${urlOrigin}/case/${dealId}/tasks/${groupId}/${taskId}`;
};

const sendUpdatedTaskEmail = async (task, deal, urlOrigin) => {
  let emailVariables = {};
  let templateId;
  let sendToEmailAddress;
  let team;

  const { dealSnapshot } = deal;
  const { submissionDetails, details } = dealSnapshot;

  const { 'supplier-name': exporterName } = submissionDetails;
  const { ukefDealId } = details;

  switch (task.title) {
    case CONSTANTS.TASKS.AIN_AND_MIA.GROUP_1.CREATE_OR_LINK_SALESFORCE:
      emailVariables = {
        exporterName,
        ukefDealId,
      };

      templateId = CONSTANTS.EMAIL_TEMPLATE_IDS.TASK_SALEFORCE_NEW_DEAL;
      team = await api.findOneTeam(task.team && task.team.id);
      sendToEmailAddress = team.email;

      break;

    case CONSTANTS.TASKS.MIA_GROUP_1_TASKS.FILE_ALL_DEAL_EMAILS:
      emailVariables = {
        taskTitle: CONSTANTS.TASKS.MIA_GROUP_1_TASKS.FILE_ALL_DEAL_EMAILS,
        taskUrl: generateTaskUrl(urlOrigin, deal.dealSnapshot._id, task),
        exporterName,
        ukefDealId,
      };

      templateId = CONSTANTS.EMAIL_TEMPLATE_IDS.TASK_READY_TO_START;
      team = await api.findOneTeam(task.team && task.team.id);
      sendToEmailAddress = team.email;

      break;

    case CONSTANTS.TASKS.MIA_GROUP_2_TASKS.COMPLETE_ADVERSE_HISTORY_CHECK:
      emailVariables = {
        taskTitle: CONSTANTS.TASKS.MIA_GROUP_2_TASKS.COMPLETE_ADVERSE_HISTORY_CHECK,
        taskUrl: generateTaskUrl(urlOrigin, deal.dealSnapshot._id, task),
        exporterName,
        ukefDealId,
      };

      templateId = CONSTANTS.EMAIL_TEMPLATE_IDS.TASK_READY_TO_START;
      team = await api.findOneTeam(task.team && task.team.id);
      sendToEmailAddress = team.email;

      break;

    case CONSTANTS.TASKS.MIA_GROUP_3_TASKS.CHECK_EXPOSURE:
      emailVariables = {
        taskTitle: CONSTANTS.TASKS.MIA_GROUP_3_TASKS.CHECK_EXPOSURE,
        taskUrl: generateTaskUrl(urlOrigin, deal.dealSnapshot._id, task),
        exporterName,
        ukefDealId,
      };

      templateId = CONSTANTS.EMAIL_TEMPLATE_IDS.TASK_READY_TO_START;
      team = await api.findOneTeam(task.team && task.team.id);
      sendToEmailAddress = team.email;

      break;
    default:
  }

  if (templateId) {
    return sendTfmEmail(
      templateId,
      sendToEmailAddress,
      emailVariables,
      deal,
    );
  }

  return null;
};

const updateTasksCanEdit = async (allTaskGroups, groupId, taskIdToUpdate, deal, urlOrigin) => {
  const sendUpdatedEmailRequests = [];

  const taskGroups = allTaskGroups.map((tGroup) => {
    let group = tGroup;

    group = {
      ...group,
      groupTasks: group.groupTasks.map((t) => {
        const task = t;

        if (task.status === CONSTANTS.TASKS.STATUS.COMPLETED) {
          task.canEdit = false;
        } else if (previousTaskIsComplete(allTaskGroups, group, task.id)) {
          task.canEdit = true;

          if (task.id === taskIdToUpdate
            && task.groupId === groupId) {
            if (task.status === CONSTANTS.TASKS.STATUS.COMPLETED) {
              task.canEdit = false;
            }
          } else {
            // Send task notification emails
            sendUpdatedEmailRequests.push(sendUpdatedTaskEmail(task, deal, urlOrigin));
          }
        }
        return task;
      }),
    };

    return group;
  });

  await Promise.all(sendUpdatedEmailRequests);
  return taskGroups;
};

const updateUserTasks = async (allTasks, userId) => {
  const tasksAssignedToUser = [];

  allTasks.map((taskGroup) =>
    taskGroup.groupTasks.map((task) => {
      if (task.assignedTo && task.assignedTo.userId === userId) {
        tasksAssignedToUser.push(task);
      }
      return task;
    }));

  const updatedUser = await api.updateUserTasks(userId, tasksAssignedToUser);
  return updatedUser.assignedTasks;
};

const updateOriginalAssigneeTasks = async (originalAssigneeUserId, updatedTaskId) => {
  const { assignedTasks: originalTaskAssigneeTasks } = await api.findUserById(originalAssigneeUserId);

  const modifiedOriginalTaskAssigneeTasks = originalTaskAssigneeTasks.filter((task) => task.id !== updatedTaskId);

  const updatedUser = await api.updateUserTasks(originalAssigneeUserId, modifiedOriginalTaskAssigneeTasks);

  return updatedUser.assignedTasks;
};

const isMIAdeal = (submissionType) =>
  submissionType === CONSTANTS.DEALS.SUBMISSION_TYPE.MIA;

const taskIsCompletedImmediately = (statusFrom, statusTo) => {
  if (statusFrom === CONSTANTS.TASKS.STATUS.TO_DO
    && statusTo === CONSTANTS.TASKS.STATUS.COMPLETED) {
    return true;
  }

  return false;
};

const shouldUpdateDealStage = (submissionType, taskId, groupId, statusFrom, statusTo) => {
  const miaDeal = isMIAdeal(submissionType);
  const firstTaskInFirstGroup = isFirstTaskInFirstGroup(taskId, groupId);
  const taskCompletedImmediately = taskIsCompletedImmediately(statusFrom, statusTo);

  if (miaDeal
    && firstTaskInFirstGroup
    && (statusTo === CONSTANTS.TASKS.STATUS.IN_PROGRESS || taskCompletedImmediately)) {
    return true;
  }

  return false;
};

const updateTfmTask = async (dealId, tfmTaskUpdate) => {
  const deal = await api.findOneDeal(dealId);
  const allTasks = deal.tfm.tasks;

  const {
    id: taskIdToUpdate,
    groupId,
    assignedTo,
    status: statusTo,
    updatedBy,
    urlOrigin,
  } = tfmTaskUpdate;

  const group = getGroup(allTasks, groupId);

  const originalTask = getTask(taskIdToUpdate, group.groupTasks);

  const statusFrom = originalTask.status;

  const originalTaskAssignedUserId = originalTask.assignedTo.userId;

  if (canUpdateTask(allTasks, group, taskIdToUpdate)) {
    const { userId: assignedUserId } = assignedTo;

    const newAssigneeFullName = await getNewAssigneeFullName(assignedUserId);

    const updatedTask = {
      id: taskIdToUpdate,
      groupId,
      status: statusTo,
      assignedTo: {
        userFullName: newAssigneeFullName,
        userId: assignedUserId,
      },
      lastEdited: now(),
    };

    const modifiedTasks = updateTask(allTasks, groupId, taskIdToUpdate, updatedTask);

    const modifiedTasksWithEditStatus = await updateTasksCanEdit(
      modifiedTasks,
      groupId,
      taskIdToUpdate,
      deal,
      urlOrigin,
    );

    const tfmHistoryUpdate = {
      tasks: [
        updateHistory({
          taskId: taskIdToUpdate,
          groupId,
          statusFrom,
          statusTo,
          assignedUserId,
          updatedBy,
        }),
      ],
    };

    const tfmDealUpdate = {
      tfm: {
        history: tfmHistoryUpdate,
        tasks: modifiedTasksWithEditStatus,
      },
    };

    const updateDealStage = shouldUpdateDealStage(
      deal.dealSnapshot.details.submissionType,
      taskIdToUpdate,
      groupId,
      statusFrom,
      statusTo,
    );

    if (updateDealStage) {
      tfmDealUpdate.tfm.stage = CONSTANTS.DEALS.DEAL_STAGE_TFM.IN_PROGRESS;
    }

    await api.updateDeal(dealId, tfmDealUpdate);

    if (originalTaskAssignedUserId !== CONSTANTS.TASKS.UNASSIGNED) {
      await updateOriginalAssigneeTasks(originalTaskAssignedUserId, taskIdToUpdate);
    }

    if (assignedUserId !== CONSTANTS.TASKS.UNASSIGNED) {
      await updateUserTasks(modifiedTasks, assignedUserId);
    }

    return updatedTask;
  }

  return originalTask;
};

module.exports = {
  getNewAssigneeFullName,
  updateTask,
  generateTaskUrl,
  sendUpdatedTaskEmail,
  updateTasksCanEdit,
  updateUserTasks,
  updateOriginalAssigneeTasks,
  isMIAdeal,
  taskIsCompletedImmediately,
  shouldUpdateDealStage,
  updateTfmTask,
};
