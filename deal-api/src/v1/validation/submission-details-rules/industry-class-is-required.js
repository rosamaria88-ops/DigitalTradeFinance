const { orderNumber } = require('../../../utils/error-list-order-number');
const { hasValue } = require('../../../utils/string');

module.exports = (submissionDetails, errorList) => {
  const newErrorList = { ...errorList };

  if (!hasValue(submissionDetails['industry-sector']) || !hasValue(submissionDetails['industry-sector'].class)) {
    newErrorList['industry-class'] = {
      order: orderNumber(newErrorList),
      text: 'Industry Class is required',
    };
  }

  return newErrorList;
};
