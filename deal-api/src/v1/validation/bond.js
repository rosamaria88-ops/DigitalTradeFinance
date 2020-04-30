const { orderNumber } = require('../../utils/error-list-order-number');

const isEmptyString = (str) => {
  if ((typeof value === 'string' || str instanceof String) && !str.length) {
    return true;
  }
  return false;
};

const hasValue = (str) => {
  if (str && !isEmptyString(str)) {
    return true;
  }
  return false;
};

exports.getBondErrors = (bond) => {
  const {
    bondType,
    bondStage,
    ukefGuaranteeInMonths,
    'coverEndDate-day': coverEndDateDay,
    'coverEndDate-month': coverEndDateMonth,
    'coverEndDate-year': coverEndDateYear,
    uniqueIdentificationNumber,
    bondValue,
    transactionCurrencySameAsSupplyContractCurrency,
    riskMarginFee,
    coveredPercentage,
    feeType,
    feeFrequency,
    dayCountBasis,
  } = bond;

  const errorList = {};

  // conditionalErrorList pattern is:
  /*
  const conditionalErrorList = {
    fieldName: {
      possibleFieldValue: {
        requiredFieldWhenThisValueIsSet: {
          text: 'X Field is required',
        },
        requiredFieldWhenThisValueIsSet: {
          text: 'Y Field is required',
        },
      },
      possibleFieldValue: {
        requiredFieldWhenThisValueIsSet: {
          text: 'Field is required',
        }
      },
    },
  }
  */

  const conditionalErrorList = {
    bondStage: {
      Unissued: {
        ukefGuaranteeInMonths: {
          text: 'Length of time that the UKEF\'s guarantee will be in place for is required',
        },
      },
      Issued: {
        coverEndDate: {
          text: 'Cover End Date is required',
        },
        uniqueIdentificationNumber: {
          text: 'Bond\'s unique identification number is required',
        },
      },
    },
    // todo: financial details

    // todo: fee details
  };

  /* ************************************
  // details
  ***************************************
  */

  if (!hasValue(bondType)) {
    errorList.bondType = {
      order: orderNumber(errorList),
      text: 'Bond type is required',
    };
  }

  if (!hasValue(bondStage)) {
    errorList.bondStage = {
      order: orderNumber(errorList),
      text: 'Bond stage is required',
    };
  }

  if (bondStage === 'Unissued') {
    if (!hasValue(ukefGuaranteeInMonths)) {
      errorList.ukefGuaranteeInMonths = {
        order: orderNumber(errorList),
        text: 'Length of time that the UKEF\'s guarantee will be in place for is required',
      };
    }
  }

  if (bondStage === 'Issued') {
    const hasNoDateValues = (!hasValue(coverEndDateDay) && !hasValue(coverEndDateMonth) && !hasValue(coverEndDateYear));

    // TODO: message should account for everthing that is missing
    // so if no month and no day, say 'month and day is required'
    if (hasNoDateValues) {
      errorList.coverEndDate = {
        order: orderNumber(errorList),
        text: 'Enter the Cover End Date',
      };
    } else if (!hasValue(coverEndDateDay) || !hasValue(coverEndDateMonth) || !hasValue(coverEndDateYear)) {
      errorList.coverEndDate = {
        order: orderNumber(errorList),
        text: 'Cover End Date must include day month and year (temp message)',
      };
    }

    if (!uniqueIdentificationNumber) {
      errorList.uniqueIdentificationNumber = {
        order: orderNumber(errorList),
        text: 'Bond\'s unique identification number is required',
      };
    }
  }


  /* ************************************
  // financial details
  ***************************************
  */

  if (!hasValue(bondValue)) {
    errorList.bondValue = {
      order: orderNumber(errorList),
      text: 'Bond value is required',
    };
  }

  if (!hasValue(transactionCurrencySameAsSupplyContractCurrency)) {
    errorList.transactionCurrencySameAsSupplyContractCurrency = {
      order: orderNumber(errorList),
      text: 'Is the currency for this Transaction the same as your Supply Contract currency? is required',
    };
  }

  if (!hasValue(riskMarginFee)) {
    errorList.riskMarginFee = {
      order: orderNumber(errorList),
      text: 'Risk Margin Fee is required',
    };
  }

  if (!hasValue(coveredPercentage)) {
    errorList.coveredPercentage = {
      order: orderNumber(errorList),
      text: 'Covered Percentage is required',
    };
  }

  // if currency NOT the same
  // currency
  // conversionRate
  // conversionRateDate


  /* ************************************
  // fee details
  ***************************************
  */
  if (!hasValue(feeType)) {
    errorList.feeType = {
      order: orderNumber(errorList),
      text: 'Fee type is required',
    };
  }

  if (!hasValue(feeFrequency)) {
    errorList.feeFrequency = {
      order: orderNumber(errorList),
      text: 'Fee frequency is required',
    };
  }

  if (!hasValue(dayCountBasis)) {
    errorList.dayCountBasis = {
      order: orderNumber(errorList),
      text: 'Day count basis is required',
    };
  }

  const totalErrors = Object.keys(errorList).length;

  if (totalErrors === 0) {
    return false;
  }

  return {
    count: totalErrors,
    errorList,
    conditionalErrorList,
  };
};
