const { NotifyClient } = require('notifications-node-client');
require('dotenv').config();

const notifyClient = new NotifyClient(process.env.GOV_NOTIFY_API_KEY);

const sendEmail = async (templateId, sendToEmailAddress, emailVariables) => {
  const personalisation = emailVariables;

  await notifyClient
    .sendEmail(templateId, sendToEmailAddress, { personalisation, reference: null })
    .then((response) => response)
    .catch((err) => {
      console.error('Portal API - Failed to send email', err?.response.data);
      return err?.response?.data;
    });
};

module.exports = sendEmail;
