const df = require('durable-functions');
const { getNowAsIsoString } = require('../../helpers/date');
const api = require('../../api');
const { isHttpErrorStatus } = require('../../helpers/http');
const { findMissingMandatory } = require('../../helpers/mandatoryFields');

const mandatoryFields = [
  'dealIdentifier',
  'currency',
  'dealValue',
  'guaranteeCommencementDate',
  'obligorPartyIdentifier',
  'obligorName',
  'obligorIndustryClassification',
];

/**
 * This function is used to create a deal record. It first checks if the payload is valid and contains all mandatory fields.
 * If the payload is valid, it sends a request to the API to create the deal record.
 * If the API request is successful, it returns an object containing the status, timestamps of when the request was sent and received, the data sent, and the data received from the API.
 * If the API request fails, it throws an error with details about the request and the error.
 * If the payload is not valid or does not contain all mandatory fields, it returns an object with the missing mandatory fields.
 * If any other error occurs, it logs the error and throws a new error.
 *
 * @param {Object} payload - The payload containing the deal details.
 * @returns {Object} - An object containing the status, timestamps of when the request was sent and received, the data sent, and the data received from the API.
 * @throws {Error} - Throws an error if the payload is invalid, if the API request fails, or if any other error occurs.
 */
const handler = async (payload) => {
  try {
    if (!payload) {
      throw new Error('Invalid deal master record payload');
    }

    const missingMandatory = findMissingMandatory(payload, mandatoryFields);

    if (missingMandatory.length) {
      return { missingMandatory };
    }

    const submittedToACBS = getNowAsIsoString();

    const { status, data } = await api.createDeal(payload);

    if (isHttpErrorStatus(status)) {
      throw new Error(
        JSON.stringify(
          {
            name: 'ACBS Deal create error',
            status,
            dealIdentifier: payload.dealIdentifier,
            submittedToACBS,
            receivedFromACBS: getNowAsIsoString(),
            dataReceived: data,
            dataSent: payload,
          },
          null,
          4,
        ),
      );
    }

    return {
      status,
      dataSent: payload,
      submittedToACBS,
      receivedFromACBS: getNowAsIsoString(),
      ...data,
    };
  } catch (error) {
    console.error('Unable to create deal master record %o', error);
    throw new Error(`Unable to create deal master record ${error}`);
  }
};

df.app.activity('create-deal', {
  handler,
});
