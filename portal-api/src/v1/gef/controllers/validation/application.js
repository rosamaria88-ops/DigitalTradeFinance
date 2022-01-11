const CONSTANTS = require('../../../../constants');
const { ERROR } = require('../../enums');

const validateMandatoryField = (fieldName, fieldValue) => {
  const value = fieldValue ?? '';
  if (value.length <= 0) {
    return {
      errCode: ERROR.MANDATORY_FIELD,
      errRef: fieldName,
      errMsg: `${fieldName} is Mandatory`,
    };
  }

  return null;
};

const validateNameFieldValue = (fieldName, fieldValue) => {
  const value = fieldValue ?? '';
  if (value.length > 30) {
    return {
      errCode: ERROR.FIELD_TOO_LONG,
      errRef: fieldName,
      errMsg: `${fieldName} can only be up to 30 characters in length (${fieldValue})`,
    };
  }

  if (/[^A-Za-z0-9 .,:;'-]/.test(fieldValue)) {
    return {
      errCode: ERROR.FIELD_INVALID_CHARACTERS,
      errRef: fieldName,
      errMsg: `${fieldName} can only contain letters, numbers and punctuation (${fieldValue})`,
    };
  }

  return null;
};

const validateApplicationReferences = (body = {}) => {
  let validationErrors = [];

  if (Object.keys(body).includes('bankInternalRefName')) {
    validationErrors.push(validateMandatoryField('bankInternalRefName', body.bankInternalRefName));
    validationErrors.push(validateNameFieldValue('bankInternalRefName', body.bankInternalRefName));
  }
  if (body.additionalRefName) validationErrors.push(validateNameFieldValue('additionalRefName', body.additionalRefName));

  validationErrors = validationErrors.filter((el) => el !== null); // remove nulls
  return validationErrors.length === 0 ? null : validationErrors;
};

const validatorStatusCheckEnums = (doc) => {
  const enumErrors = [];

  // statuses received from TFM - shouldnt be updating to UKEF_ACKNOWLEDGED, APPROVED_WITH_CONDITIONS on its own
  switch (doc.status) {
    case CONSTANTS.DEAL.GEF_STATUS.NOT_STARTED:
    case CONSTANTS.DEAL.GEF_STATUS.IN_PROGRESS:
    case CONSTANTS.DEAL.GEF_STATUS.CHANGES_REQUIRED:
    case CONSTANTS.DEAL.GEF_STATUS.COMPLETED:
    case CONSTANTS.DEAL.GEF_STATUS.BANK_CHECK:
    case CONSTANTS.DEAL.GEF_STATUS.SUBMITTED_TO_UKEF:
    case CONSTANTS.DEAL.GEF_STATUS.ABANDONED:
    case CONSTANTS.DEAL.GEF_STATUS.UKEF_ACKNOWLEDGED:
    case CONSTANTS.DEAL.GEF_STATUS.UKEF_APPROVED_WITH_CONDITIONS:
    case null:
    case undefined:
      break;
    default:
      enumErrors.push({ errCode: 'ENUM_ERROR', errMsg: 'Unrecognised enum', errRef: 'status' });
      break;
  }
  return enumErrors.length === 0 ? null : enumErrors;
};

module.exports = {
  validateApplicationReferences,
  validatorStatusCheckEnums,
};
