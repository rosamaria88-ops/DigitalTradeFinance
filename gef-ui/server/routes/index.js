const express = require('express');
const sessionUserToLocals = require('../middleware/sessionUserToLocals');
const mandatoryCriteriaRoutes = require('./mandatory-criteria');
const nameApplicationRoutes = require('./name-application');
const applicationDetailsRoutes = require('./application-details');
const applicationSubmissionRoutes = require('./application-submission');
const applicationAbandonRoutes = require('./application-abandon');
const submitToUkefRoutes = require('./submit-to-ukef');
const ineligibleGefRoutes = require('./ineligible-gef');
const eligibleAutomaticCoverRoutes = require('./eligible-automatic-cover');
const ineligibleAutomaticCoverRoutes = require('./ineligible-automatic-cover');
const automaticCoverRoutes = require('./automatic-cover');
const companiesHouseRoutes = require('./companies-house');
const exportersAddressRoutes = require('./exporters-address');
const selectExportersCorrespondenceAddressRoutes = require('./select-exporters-correspondence-address');
const enterExportersCorrespondenceAddressRoutes = require('./enter-exporters-correspondence-address');
const aboutExporterRoutes = require('./about-exporter');
const facilitiesRoutes = require('./facilities');
const aboutFacilityRoutes = require('./about-facility');
const providedFacilityRoutes = require('./provided-facility');
const facilityCurrencyRoutes = require('./facility-currency');
const facilityValueRoutes = require('./facility-value');
const facilityGuaranteeRoutes = require('./facility-guarantee');
const facilityConfirmDeletionRoutes = require('./facility-confirm-deletion');
const returnToMaker = require('./return-to-maker');
const securityDetails = require('./security-details');
const file = require('./downloadFile');
const reviewUkefDecision = require('./review-decision');
const coverStartDate = require('./cover-start-date');
const confirmCoverStartDate = require('./confirm-cover-start-date');
const portalActivities = require('./application-activities');
const cloneGefDeal = require('./clone-gef-deal');
const unissuedFacilities = require('./unissued-facilities');

const router = express.Router();

router.use('*', sessionUserToLocals);

router.use(mandatoryCriteriaRoutes);
router.use(nameApplicationRoutes);
router.use(ineligibleGefRoutes);
router.use(eligibleAutomaticCoverRoutes);
router.use(ineligibleAutomaticCoverRoutes);
router.use(applicationDetailsRoutes);
router.use(applicationSubmissionRoutes);
router.use(applicationAbandonRoutes);
router.use(submitToUkefRoutes);
router.use(automaticCoverRoutes);
router.use(companiesHouseRoutes);
router.use(exportersAddressRoutes);
router.use(selectExportersCorrespondenceAddressRoutes);
router.use(enterExportersCorrespondenceAddressRoutes);
router.use(aboutExporterRoutes);
router.use(facilitiesRoutes);
router.use(aboutFacilityRoutes);
router.use(providedFacilityRoutes);
router.use(facilityCurrencyRoutes);
router.use(facilityValueRoutes);
router.use(facilityGuaranteeRoutes);
router.use(facilityConfirmDeletionRoutes);
router.use(returnToMaker);
router.use(securityDetails);
router.use(file);
router.use(cloneGefDeal);
router.use(reviewUkefDecision);
router.use(confirmCoverStartDate);
router.use(coverStartDate);
router.use(portalActivities);
router.use(unissuedFacilities);

module.exports = router;
