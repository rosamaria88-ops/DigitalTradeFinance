const { validationErrorHandler } = require('../../utils/helpers');
const Facility = require('../../models/facility');
const validateFacilityGuarantee = require('./facility-guarantee');
const api = require('../../services/api');

const facilityGuarantee = async (req, res) => {
  const { params, query, session } = req;
  const { applicationId, facilityId } = params;
  const { status } = query;
  const { user, userToken } = session;

  try {
    const facility = await Facility.find(applicationId, facilityId, status, user, userToken);
    if (!facility) {
      // eslint-disable-next-line no-console
      console.log('Facility not found, or not authorised');
      return res.redirect('/');
    }
    console.log('==========the facility \n', facility);
    return res.render('partials/facility-guarantee.njk', {
      applicationId: facility.applicationId,
      facilityId: facility.facilityId,
      feeType: facility.feeType,
      inAdvanceFrequency: facility.feeType === 'in advance' ? facility.feeFrequency : '',
      inArrearsFrequency: facility.feeType === 'in arrears' ? facility.feeFrequency : '',
      dayCountBasis: facility.dayCountBasis,
      status,
    });
  } catch (err) {
    return res.render('partials/problem-with-service.njk');
  }
};

const updateFacilityGuarantee = async (req, res) => {
  const { params, body, query } = req;
  const { applicationId, facilityId } = params;
  const {
    feeType, inAdvanceFrequency, inArrearsFrequency, dayCountBasis,
  } = body;
  const { status } = query;
  const facilityGuaranteeErrors = [];

  async function update() {
    try {
      await api.updateFacility(facilityId, {
        feeType,
        feeFrequency: feeType === 'in advance' ? inAdvanceFrequency : inArrearsFrequency,
        dayCountBasis,
      });
      return res.redirect(`/gef/application-details/${applicationId}`);
    } catch (err) {
      return res.render('partials/problem-with-service.njk');
    }
  }

  facilityGuaranteeErrors.push(...validateFacilityGuarantee(body));
  if (facilityGuaranteeErrors.length > 0) {
    return res.render('partials/facility-guarantee.njk', {
      errors: validationErrorHandler(facilityGuaranteeErrors),
      feeType,
      inArrearsFrequency,
      inAdvanceFrequency,
      dayCountBasis,
      applicationId,
      facilityId,
      status,
    });
  }
  return update();
};

module.exports = {
  facilityGuarantee,
  updateFacilityGuarantee,
};
