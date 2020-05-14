export const allRequiredFieldsArray = (fields) => {
  const { REQUIRED_FIELDS, CONDITIONALLY_REQUIRED_FIELDS } = fields;
  const allRequiredFields = [...REQUIRED_FIELDS];

  if (CONDITIONALLY_REQUIRED_FIELDS) {
    allRequiredFields.push(...CONDITIONALLY_REQUIRED_FIELDS);
  }

  return allRequiredFields;
};

export const getFieldErrors = (validationErrors, fields) => {
  const filteredErrorList = {};

  if (validationErrors && validationErrors.errorList) {
    Object.keys(validationErrors.errorList).forEach((error) => {
      if (fields.includes(error)) {
        filteredErrorList[error] = validationErrors.errorList[error];
      }
    });
  }

  return filteredErrorList;
};
