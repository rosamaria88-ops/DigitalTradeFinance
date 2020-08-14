const canIssueFacility = (userRoles, deal, facility) => {
  const isMaker = userRoles.includes('maker');

  const {
    status,
    submissionType,
  } = deal.details;

  const allowedDealStatus = (status === 'Acknowledged by UKEF'
                            || status === 'Accepted by UKEF (with conditions)'
                            || status === 'Accepted by UKEF (without conditions)'
                            || status === 'Ready for Checker\'s approval'
                            || status === 'Further Maker\'s input required');

  const allowedDealSubmissionType = (submissionType === 'Automatic Inclusion Notice'
                                    || submissionType === 'Manual Inclusion Notice'
                                    || submissionType === 'Manual Inclusion Application');


  const allowedLoanFacilityStage = facility.facilityStage === 'Conditional';
  // TODO: rename bondStage to facilityStage
  const allowedBondFacilityStage = facility.bondStage === 'Unissued';

  const allowedFacilityStage = (allowedLoanFacilityStage
                                || allowedBondFacilityStage
                                || (facility.bondStage === 'Issued' && facility.previousFacilityStage === 'Unissued')
                                || (facility.facilityStage === 'Unconditional' && facility.previousFacilityStage === 'Conditional'));

  if (isMaker
    && allowedDealStatus
    && allowedDealSubmissionType
    && allowedFacilityStage
    && !facility.issueFacilityDetailsSubmitted) {
    return true;
  }

  return false;
};

export default canIssueFacility;
