
const mapPremiumScheduleFalicity = (facility, facilityExposurePeriod) => {
  const map = {};
  let premiumFrequencyId = 0;
  let premiumTypeId = 0;
  let cumulativeAmount = null;
  if (facility.facilityType === 'bond') {
    switch (facility.feeFrequency.toLowerCase()) {
      case 'monthly':
        premiumFrequencyId = 1;
        break;
      case 'quarterly':
        premiumFrequencyId = 2;
        break;
      case 'annually':
        premiumFrequencyId = 4;
        break;
      default:
        throw new Error(`facility.feeFrequency "${facility.feeFrequency}" not valid.`);
    }

    switch (facility.feeType.toLowerCase()) {
      case 'in advance':
        premiumTypeId = 1;
        break;
      case 'in arrears':
        premiumTypeId = 2;
        break;
      case 'at maturity':
        premiumTypeId = 3;
        break;
      default:
        throw new Error(`facility.feeType "${facility.feeType}" not valid.`);
    }
  } else {
    switch (facility.premiumFrequency.toLowerCase()) {
      case 'monthly':
        premiumFrequencyId = 1;
        break;
      case 'quarterly':
        premiumFrequencyId = 2;
        break;
      case 'annually':
        premiumFrequencyId = 4;
        break;
      default:
        throw new Error(`facility.premiumFrequency "${facility.premiumFrequency}" not valid.`);
    }

    switch (facility.premiumType.toLowerCase()) {
      case 'in advance':
        premiumTypeId = 1;
        break;
      case 'in arrears':
        premiumTypeId = 2;
        break;
      case 'at maturity':
        premiumTypeId = 3;
        break;
      default:
        throw new Error(`facility.premiumType "${facility.premiumType}" not valid.`);
    }
    cumulativeAmount = Number(facility.disbursementAmount);
  }

  map.guaranteeCommencementDate = facility.coverStartDate;
  map.guaranteeExpiryDate = facility.coverEndDate;

  map.facilityURN = Number(facility.ukefFacilityID);
  map.productGroup = facility.facilityType === 'bond' ? 'BS' : 'EW';
  map.premiumTypeId = premiumTypeId;
  map.premiumFrequencyId = premiumFrequencyId;
  map.guaranteeCommencementDate = `${facility['requestedCoverStartDate-year']}-${String(facility['requestedCoverStartDate-month']).padStart(2, '0')}-${String(facility['requestedCoverStartDate-day']).padStart(2, '0')}`;
  map.guaranteeExpiryDate = `${facility['coverEndDate-year']}-${String(facility['coverEndDate-month']).padStart(2, '0')}-${String(facility['coverEndDate-day']).padStart(2, '0')}`;
  map.guaranteeFeePercentage = Number(facility.guaranteeFeePayableByBank);
  map.guaranteePercentage = Number(facility.coveredPercentage);

  map.dayBasis = facility.dayCountBasis;
  map.exposurePeriod = facilityExposurePeriod.exposurePeriodInMonths;
  map.cumulativeAmount = cumulativeAmount;
  map.maximumLiability = facility.ukefExposure ? Number(facility.ukefExposure.split('.')[0].replace(/,/g, '')) : 0;
  return [map];
};
module.exports = mapPremiumScheduleFalicity;
