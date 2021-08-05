const api = require('../api');
const CONSTANTS = require('../../constants');
const getFacilityExposurePeriod = require('./get-facility-exposure-period');
const getFacilityPremiumSchedule = require('./get-facility-premium-schedule');
const getGuaranteeDates = require('../helpers/get-guarantee-dates');
const { sendIssuedFacilitiesReceivedEmail } = require('./send-issued-facilities-received-email');
const wasPreviouslyUnissued = require('../helpers/was-previously-unissued');
const isIssued = require('../helpers/is-issued');

const updatedIssuedFacilities = async (deal) => {
  // Create deep clone
  const modifiedDeal = JSON.parse(JSON.stringify(deal));

  const {
    submissionDate: dealSubmissionDate,
  } = deal;

  const updatedFacilities = [];

  modifiedDeal.facilities = await Promise.all(modifiedDeal.facilities.map(async (f) => {
    const facility = f;

    const {
      _id: facilityId,
      hasBeenAcknowledged,
    } = facility;

    // we only need to update issued facilities if the facility has
    // - changed from unissued to issued
    // facility has not be acknowledged by TFM.
    const shouldUpdateFacility = (wasPreviouslyUnissued(facility) && isIssued(facility) && !hasBeenAcknowledged);

    if (shouldUpdateFacility) {
      // update portal facility status
      const facilityStatusUpdate = CONSTANTS.FACILITIES.FACILITY_STATUS_PORTAL.ACKNOWLEDGED;
      await api.updatePortalFacilityStatus(facilityId, facilityStatusUpdate);

      // add acknowledged flag to Portal facility
      const portalFacilityUpdate = {
        hasBeenAcknowledged: true,
      };

      const updatedPortalFacility = await api.updatePortalFacility(facilityId, portalFacilityUpdate);

      // update TFM facility
      const facilityExposurePeriod = await getFacilityExposurePeriod(facility);

      const facilityGuaranteeDates = getGuaranteeDates(facility, dealSubmissionDate);

      const facilityPremiumSchedule = await getFacilityPremiumSchedule(
        facility,
        facilityExposurePeriod,
        facilityGuaranteeDates,
      );

      const facilityUpdate = {
        ...portalFacilityUpdate,
        ...facilityExposurePeriod,
        facilityGuaranteeDates,
        premiumSchedule: facilityPremiumSchedule,
      };

      const updateFacilityResponse = await api.updateFacility(facilityId, facilityUpdate);

      // add the updated properties to the returned facility
      // to retain flat, generic facility mapping used in deal submission calls.
      facility.hasBeenAcknowledged = updatedPortalFacility.hasBeenAcknowledged;
      facility.status = facilityStatusUpdate;
      facility.tfm = updateFacilityResponse.tfm;

      updatedFacilities.push(facility);
    }

    return facility;
  }));

  await sendIssuedFacilitiesReceivedEmail(
    modifiedDeal,
    updatedFacilities,
  );

  return modifiedDeal;
};


exports.updatedIssuedFacilities = updatedIssuedFacilities;
