/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 *
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 *  * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */
const moment = require('moment');
const api = require('../api');
const mdm = require('../apim-mdm');
const { isHttpErrorStatus } = require('../helpers/http');
const { findMissingMandatory } = require('../helpers/mandatoryFields');

const mandatoryFields = [
  'facilityIdentifier',
  'covenantIdentifier',
  'covenantType',
  'maximumLiability',
  'currency',
  'guaranteeCommencementDate',
  'guaranteeExpiryDate',
  'effectiveDate',
];

const createFacilityCovenant = async (context) => {
  const { acbsFacilityCovenantInput } = context.bindingData;
  const { dealIdentifier, facilityIdentifier, currency } = acbsFacilityCovenantInput;

  const covenantReq = await api.createFacilityCovenantId({
    numberTypeId: 8,
    createdBy: 'Portal v2/TFM',
    requestingSystem: 'Portal v2/TFM',
  });

  if (covenantReq.status === 201) {
    acbsFacilityCovenantInput.covenantIdentifier = covenantReq.data.id;
  }

  // Replace ISO currency with ACBS currency code
  const currencyReq = await mdm.getCurrency(currency);

  // Default currency code to GBP (O)
  acbsFacilityCovenantInput.currency = (currencyReq.status === 200 && currencyReq.data.length > 1) ? currencyReq.data[0].acbsCode : 'O';

  const missingMandatory = findMissingMandatory(acbsFacilityCovenantInput, mandatoryFields);

  if (missingMandatory.length) {
    return Promise.resolve({ missingMandatory });
  }

  const submittedToACBS = moment().format();
  const { status, data } = await api.createFacilityCovenant(facilityIdentifier, acbsFacilityCovenantInput);
  if (isHttpErrorStatus(status)) {
    throw new Error(JSON.stringify({
      name: 'ACBS Facility Covenant create error',
      dealIdentifier,
      submittedToACBS,
      receivedFromACBS: moment().format(),
      dataReceived: data,
      dataSent: acbsFacilityCovenantInput,
    }, null, 4));
  }

  return {
    status,
    dataSent: acbsFacilityCovenantInput,
    submittedToACBS,
    receivedFromACBS: moment().format(),
    ...data,
  };
};

module.exports = createFacilityCovenant;
