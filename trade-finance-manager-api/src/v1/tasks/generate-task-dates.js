const CONSTANTS = require('../../constants');

/**
* Generate timestamps:
* - updatedAt
* - dateStarted
* - dateCompleted
* */
const generateTaskDates = (statusFrom, statusTo) => {
  const dates = {
    updatedAt: Date.now(),
  };

  if (statusFrom === CONSTANTS.TASKS.STATUS.TO_DO) {
    dates.dateStarted = Date.now();
  }

  if (statusTo === CONSTANTS.TASKS.STATUS.COMPLETED) {
    dates.dateCompleted = Date.now();
  }

  return dates;
};

module.exports = generateTaskDates;
