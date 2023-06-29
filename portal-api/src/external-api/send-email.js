const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const referenceProxyUrl = process.env.EXTERNAL_API_URL;

const sendEmail = async (
  templateId,
  sendToEmailAddress,
  emailVariables,
) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${referenceProxyUrl}/email`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        templateId,
        sendToEmailAddress,
        emailVariables,
      },
    });
    return data;
  } catch (err) {
    console.error(`Error sending email to ${sendToEmailAddress}: ${err}`);
    return false;
  }
};

module.exports = sendEmail;