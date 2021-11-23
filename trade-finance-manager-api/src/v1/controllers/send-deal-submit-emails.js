const api = require('../api');
const CONSTANTS = require('../../constants');
const { getFirstTask } = require('../helpers/tasks');
const { generateTaskEmailVariables } = require('../helpers/generate-task-email-variables');
const generateAinMinConfirmationEmailVars = require('../emails/AIN-MIN-confirmation/generate-email-variables');
const { gefFacilitiesList } = require('../emails/AIN-MIN-confirmation/gef-facilities-list');
const { generateFacilityLists } = require('../helpers/notify-template-formatters');
const { generateMiaConfirmationEmailVars } = require('../emails/MIA-confirmation/generate-email-variables');
const sendTfmEmail = require('./send-tfm-email');

// make sure the first task is `Match or Create Parties`
// if the first task changes in the future, we might not want to send an email.
const shouldSendFirstTaskEmail = (firstTask) =>
  (firstTask.title === CONSTANTS.TASKS.AIN_AND_MIA.GROUP_1.MATCH_OR_CREATE_PARTIES);

const sendFirstTaskEmail = async (deal) => {
  const {
    _id: dealId,
    ukefDealId,
    exporter,
    tfm,
  } = deal;

  const { tasks } = tfm;

  if (tasks) {
    const firstTask = getFirstTask(tasks);

    if (shouldSendFirstTaskEmail(firstTask)) {
      const urlOrigin = process.env.TFM_URI;
      const templateId = CONSTANTS.EMAIL_TEMPLATE_IDS.TASK_READY_TO_START;

      const { team } = firstTask;
      const { email: sendToEmailAddress } = await api.findOneTeam(team.id);

      const emailVariables = generateTaskEmailVariables(
        urlOrigin,
        firstTask,
        dealId,
        exporter.companyName,
        ukefDealId,
      );

      const emailResponse = await sendTfmEmail(
        templateId,
        sendToEmailAddress,
        emailVariables,
        deal,
      );
      return emailResponse;
    }
  }

  return null;
};

const sendMiaAcknowledgement = async (deal) => {
  const {
    dealType,
    submissionType,
    maker,
    facilities,
  } = deal;

  if (submissionType !== CONSTANTS.DEALS.SUBMISSION_TYPE.MIA) {
    return null;
  }

  const { email: sendToEmailAddress } = maker;

  let templateId;
  let emailVariables;
  let emailResponse;

  if (dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
    templateId = CONSTANTS.EMAIL_TEMPLATE_IDS.BSS_DEAL_MIA_RECEIVED;

    emailVariables = generateMiaConfirmationEmailVars(deal);

    emailResponse = await sendTfmEmail(
      templateId,
      sendToEmailAddress,
      emailVariables,
      deal,
    );

    return emailResponse;
  }

  if (dealType === CONSTANTS.DEALS.DEAL_TYPE.GEF) {
    templateId = CONSTANTS.EMAIL_TEMPLATE_IDS.GEF_DEAL_MIA_RECEIVED;

    emailVariables = generateMiaConfirmationEmailVars(deal);

    emailResponse = await sendTfmEmail(
      templateId,
      sendToEmailAddress,
      emailVariables,
      deal,
    );

    return emailResponse;
  }

  return null;
};

const generateBssDealAinMinConfirmationEmailVariables = (deal, facilityLists) => {
  const {
    ukefDealId,
    bankReferenceNumber,
    submissionType,
    maker,
    exporter,
  } = deal;

  const { firstname, surname } = maker;

  const emailVariables = {
    firstname,
    surname,
    exporterName: exporter.companyName,
    bankReferenceNumber,
    ukefDealId,
    isAin: submissionType === CONSTANTS.DEALS.SUBMISSION_TYPE.AIN ? 'yes' : 'no',
    isMin: submissionType === CONSTANTS.DEALS.SUBMISSION_TYPE.MIN ? 'yes' : 'no',
    issuedFacilitiesList: facilityLists.issued,
    showIssuedHeader: facilityLists.issued ? 'yes' : 'no',
    unissuedFacilitiesList: facilityLists.unissued,
    showUnissuedHeader: facilityLists.unissued ? 'yes' : 'no',
  };

  return emailVariables;
};

const sendAinMinAcknowledgement = async (deal) => {
  const {
    dealType,
    submissionType,
    maker,
    facilities,
  } = deal;

  if (submissionType !== CONSTANTS.DEALS.SUBMISSION_TYPE.MIN
    && submissionType !== CONSTANTS.DEALS.SUBMISSION_TYPE.AIN) {
    return null;
  }

  let facilityLists;
  let templateId;
  let emailVariables;
  let emailResponse;
  const { email: sendToEmailAddress } = maker;

  if (dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
    facilityLists = generateFacilityLists(dealType, facilities);

    templateId = CONSTANTS.EMAIL_TEMPLATE_IDS.BSS_DEAL_SUBMIT_CONFIRMATION;

    emailVariables = generateBssDealAinMinConfirmationEmailVariables(deal, facilityLists);

    emailResponse = await sendTfmEmail(
      templateId,
      sendToEmailAddress,
      emailVariables,
      deal,
    );
    return emailResponse;
  }

  if (dealType === CONSTANTS.DEALS.DEAL_TYPE.GEF) {
    facilityLists = gefFacilitiesList(facilities);

    templateId = CONSTANTS.EMAIL_TEMPLATE_IDS.GEF_DEAL_SUBMIT_CONFIRMATION;

    emailVariables = generateAinMinConfirmationEmailVars(deal, facilityLists);

    emailResponse = await sendTfmEmail(
      templateId,
      sendToEmailAddress,
      emailVariables,
      deal,
    );
    return emailResponse;
  }

  return null;
};

const sendDealSubmitEmails = async (deal) => {
  if (!deal) {
    return false;
  }

  const firstTaskEmail = await sendFirstTaskEmail(deal);
  const emailAcknowledgementMIA = await sendMiaAcknowledgement(deal);
  const emailAcknowledgementAinMin = await sendAinMinAcknowledgement(deal);

  return {
    firstTaskEmail,
    emailAcknowledgementMIA,
    emailAcknowledgementAinMin,
  };
};

module.exports = {
  shouldSendFirstTaskEmail,
  sendFirstTaskEmail,
  sendDealSubmitEmails,
  sendMiaAcknowledgement,
  generateBssDealAinMinConfirmationEmailVariables,
  sendAinMinAcknowledgement,
};
