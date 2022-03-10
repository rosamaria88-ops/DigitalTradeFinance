const api = require('../api');
const now = require('../../now');

const sendTfmEmail = async (
  templateId,
  sendToEmailAddress,
  emailVariables,
  deal,
) => {
  const emailResponse = await api.sendEmail(
    templateId,
    sendToEmailAddress,
    emailVariables,
  );

  if (deal) {
  // update deal history
    const dealId = deal._id;
    const newHistoryObject = {
      recipient: sendToEmailAddress,
      templateId,
      timestamp: now(),
    };

    let emailHistory = [];
    if (deal.tfm?.history && deal.tfm.history.emails) {
      emailHistory = deal.tfm.history.emails;
    }

    const updatedHistory = {
      ...deal.tfm?.history,
      emails: [
        ...emailHistory,
        newHistoryObject,
      ],
    };

    const tfmDealUpdate = {
      tfm: {
        history: updatedHistory,
      },
    };

    await api.updateDeal(dealId, tfmDealUpdate);
  }

  return emailResponse;
};

module.exports = sendTfmEmail;
