const mapGefDealDetails = require('./mapGefDealDetails');
const mapGefFacilities = require('../gef-facilities/mapGefFacilities');
const mapTotals = require('../deal/mapTotals');
const mapGefSubmissionDetails = require('./mapGefSubmissionDetails');

const mapGefDealSnapshot = (dealSnapshot, dealTfm) => ({
  _id: dealSnapshot._id,
  details: mapGefDealDetails(dealSnapshot),
  submissionDetails: mapGefSubmissionDetails(dealSnapshot),
  eligibilityCriteria: [],
  eligibility: {},
  dealFiles: {},
  facilities: mapGefFacilities(dealSnapshot, dealTfm),
  totals: mapTotals(dealSnapshot.facilities),
});

module.exports = mapGefDealSnapshot;
