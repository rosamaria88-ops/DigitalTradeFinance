const {
  isNumeric,
  roundNumber,
  formattedNumber,
  sanitizeCurrency,
} = require('../../utils/number');
const { hasValue } = require('../../utils/string');

const formatNumber = (numb) => formattedNumber(roundNumber(numb, 2));

const calculateFacilitiesInGbp = (facilityInDealCurrency, supplyContractConversionRateToGbp) => {
  if (supplyContractConversionRateToGbp && Number(supplyContractConversionRateToGbp) > 0) {
    return (facilityInDealCurrency / supplyContractConversionRateToGbp);
  }
  return facilityInDealCurrency;
};

const calculateDealInGbp = (
  bondsInDealCurrency,
  loansInDealCurrency,
  supplyContractConversionRateToGbp,
) => {
  let result = 0;

  if (bondsInDealCurrency > 0) {
    result = calculateFacilitiesInGbp(bondsInDealCurrency, supplyContractConversionRateToGbp);
  }

  if (loansInDealCurrency > 0) {
    result += calculateFacilitiesInGbp(loansInDealCurrency, supplyContractConversionRateToGbp);
  }

  return result;
};

const calculateFacilitiesTotalInDealCurrency = (facilities) => {
  let totalValueInDealCurrency = 0;
  let totalUkefExposureInDealCurrency = 0;

  if (facilities.length > 0) {
    facilities.forEach((facility) => {
      const {
        facilityValue,
        conversionRate,
        ukefExposure,
      } = facility;

      const sanitizedUkefExposure = sanitizeCurrency(ukefExposure).sanitizedValue;

      if (hasValue(conversionRate)) {
        totalValueInDealCurrency += (Number(facilityValue) / Number(conversionRate));
        totalUkefExposureInDealCurrency += (Number(sanitizedUkefExposure) / Number(conversionRate));
      } else {
        totalValueInDealCurrency += Number(facilityValue);
        totalUkefExposureInDealCurrency += Number(sanitizedUkefExposure);
      }
    });
  }

  return {
    totalValueInDealCurrency,
    totalUkefExposureInDealCurrency,
  };
};

const calculate = (
  bondsInDealCurrency,
  loansInDealCurrency,
  supplyContractConversionRateToGbp,
) => {
  const dealInDealCurrency = bondsInDealCurrency + loansInDealCurrency;

  const dealInGbp = calculateDealInGbp(
    bondsInDealCurrency,
    loansInDealCurrency,
    supplyContractConversionRateToGbp,
  );

  const bondsInGbp = calculateFacilitiesInGbp(bondsInDealCurrency, supplyContractConversionRateToGbp);
  const loansInGbp = calculateFacilitiesInGbp(loansInDealCurrency, supplyContractConversionRateToGbp);

  return {
    dealInDealCurrency: formatNumber(dealInDealCurrency),
    dealInGbp: formatNumber(dealInGbp),
    bondsInDealCurrency: formatNumber(bondsInDealCurrency),
    bondsInGbp: formatNumber(bondsInGbp),
    loansInDealCurrency: formatNumber(loansInDealCurrency),
    loansInGbp: formatNumber(loansInGbp),
  };
};

const canCalculate = (supplyContractCurrency, supplyContractConversionRateToGBP, bonds, loans) => {
  const hasCompletedBonds = bonds.filter((b) => b.status === 'Completed').length > 0;
  const hasCompletedLoans = loans.filter((l) => l.status === 'Completed').length > 0;

  const hasSupplyContractCurrencyId = (supplyContractCurrency
    && supplyContractCurrency.id
    && hasValue(supplyContractCurrency.id));

  const hasSupplyContractConversionRateToGBP = (hasValue(supplyContractConversionRateToGBP)
    && isNumeric(Number(supplyContractConversionRateToGBP)));

  const hasRelevantSupplyContractValues = (hasSupplyContractCurrencyId && supplyContractCurrency.id === 'GBP')
    || (hasSupplyContractCurrencyId && hasSupplyContractConversionRateToGBP);

  if ((hasRelevantSupplyContractValues && (hasCompletedBonds || hasCompletedLoans))) {
    return true;
  }

  return false;
};

const calculateDealSummary = (deal) => {
  const {
    submissionDetails,
    bondTransactions,
    loanTransactions,
  } = deal;

  const {
    supplyContractCurrency,
    supplyContractConversionRateToGBP,
  } = submissionDetails;

  const bonds = bondTransactions.items;
  const loans = loanTransactions.items;

  if (canCalculate(supplyContractCurrency, supplyContractConversionRateToGBP, bonds, loans)) {
    const {
      totalValueInDealCurrency: bondsTotalValueInDealCurrency,
      totalUkefExposureInDealCurrency: bondsTotalUkefExposureInDealCurrency,
    } = calculateFacilitiesTotalInDealCurrency(bonds);

    const {
      totalValueInDealCurrency: loansTotalValueInDealCurrency,
      totalUkefExposureInDealCurrency: loansTotalUkefExposureInDealCurrency,
    } = calculateFacilitiesTotalInDealCurrency(loans);

    return {
      totalValue: calculate(
        bondsTotalValueInDealCurrency,
        loansTotalValueInDealCurrency,
        Number(supplyContractConversionRateToGBP),
      ),
      totalUkefExposure: calculate(
        bondsTotalUkefExposureInDealCurrency,
        loansTotalUkefExposureInDealCurrency,
        Number(supplyContractConversionRateToGBP),
      ),
    };
  }
  return {};
};

module.exports = calculateDealSummary;
