const api = require('../api');
const convertFacilityCurrency = require('./convert-facility-currency');
const getFacilityExposurePeriod = require('./get-facility-exposure-period');
const DEFAULTS = require('../defaults');
const getGuaranteeDates = require('../helpers/get-guarantee-dates');
const getFacilityPremiumSchedule = require('./get-facility-premium-schedule');
const { calculateGefFacilityFeeRecord } = require('../helpers/calculate-gef-facility-fee-record');
const CONSTANTS = require('../../constants');

const updateFacilities = async (deal) => {
  // Create deep clone
  const modifiedDeal = JSON.parse(JSON.stringify(deal));

  const {
    dealType,
    submissionDate: dealSubmissionDate,
    submissionType,
  } = modifiedDeal;

  modifiedDeal.facilities = await Promise.all(modifiedDeal.facilities.map(async (f) => {
    const facility = f;

    const { _id: facilityId } = facility;

    const facilityGuaranteeDates = getGuaranteeDates(facility, dealSubmissionDate);

    const facilityCurrencyConversion = await convertFacilityCurrency(facility, dealSubmissionDate);
    const facilityExposurePeriod = await getFacilityExposurePeriod(facility);

    let facilityPremiumSchedule;
    if (dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
      facilityPremiumSchedule = await getFacilityPremiumSchedule(
        facility,
        facilityExposurePeriod,
        facilityGuaranteeDates,
      );
    }

    let feeRecord;

    const shouldCalculateFeeRecord = (dealType === CONSTANTS.DEALS.DEAL_TYPE.GEF
      && submissionType !== CONSTANTS.DEALS.SUBMISSION_TYPE.MIA);

    if (shouldCalculateFeeRecord) {
      feeRecord = calculateGefFacilityFeeRecord(facility);
    }

    const facilityUpdate = {
      ...facilityCurrencyConversion,
      ...facilityExposurePeriod,
      facilityGuaranteeDates,
      riskProfile: DEFAULTS.FACILITY_RISK_PROFILE,
      premiumSchedule: facilityPremiumSchedule,
      feeRecord,
    };

    const updateFacilityResponse = await api.updateFacility(facilityId, facilityUpdate);

    // add the updated tfm object to returned facility.
    // if we return updateFacilityResponse, we'll get facilitySnapshot
    // - therefore losing the flat, generic facility mapping used in deal submission calls.
    facility.tfm = updateFacilityResponse.tfm;

    return facility;
  }));

  return modifiedDeal;
};

exports.updateFacilities = updateFacilities;
