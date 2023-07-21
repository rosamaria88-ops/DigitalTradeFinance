const api = require('../../services/api');
const { validationErrorHandler } = require('../../utils/helpers');
const { isValidCompaniesHouseNumber } = require('../../utils/validateIds');

const companiesHouse = async (req, res) => {
  const { params, query } = req;
  const { dealId } = params;
  const { status } = query;

  try {
    const { exporter } = await api.getApplication(dealId);
    const { companiesHouseRegistrationNumber } = exporter;

    return res.render('partials/companies-house.njk', {
      regNumber: companiesHouseRegistrationNumber,
      dealId,
      status,
    });
  } catch (error) {
    console.error(error);
    return res.render('partials/problem-with-service.njk');
  }
};

const validateCompaniesHouse = async (req, res) => {
  const {
    params,
    body,
    query,
    session,
  } = req;
  const { regNumber } = body;
  const { dealId } = params;
  const { status } = query;
  const { user } = session;
  const { _id: editorId } = user;
  const companiesHouseErrors = [];
  let companiesHouseDetails;

  if (!regNumber) {
    companiesHouseErrors.push({
      errRef: 'regNumber',
      errMsg: 'Enter a Companies House registration number',
    });
  }

  if (regNumber && !isValidCompaniesHouseNumber(regNumber)) {
    companiesHouseErrors.push({
      errRef: 'regNumber',
      errMsg: 'Enter a valid Companies House registration number',
    });
  }

  try {
    const { exporter } = await api.getApplication(dealId);

    if (companiesHouseErrors.length === 0) {
      companiesHouseDetails = await api.getCompaniesHouseDetails(regNumber);
    }

    if (companiesHouseDetails?.status === 422 || companiesHouseDetails?.status === 400) {
      companiesHouseDetails.data.forEach((error) => {
        companiesHouseErrors.push(error);
      });
    }

    if (companiesHouseErrors.length > 0) {
      return res.render('partials/companies-house.njk', {
        errors: validationErrorHandler(companiesHouseErrors),
        regNumber,
        dealId,
        status,
      });
    }

    // no errors so we can safely update the application.
    /**
     * added smeType, probabilityOfDefault, isFinanceIncreasing as blank strings
     * enables to be added to database so shows on application-details page if not exited without saving
     */
    const applicationExporterUpdate = {
      exporter: {
        ...exporter,
        ...companiesHouseDetails,
        correspondenceAddress: null,
        smeType: '',
        probabilityOfDefault: '',
        isFinanceIncreasing: null,
      },
      editorId,
    };

    await api.updateApplication(dealId, applicationExporterUpdate);

    if (status === 'change') {
      return res.redirect(`/gef/application-details/${dealId}`);
    }

    return res.redirect('exporters-address');
  } catch (error) {
    console.error(error);
    return res.render('partials/problem-with-service.njk');
  }
};

module.exports = {
  companiesHouse,
  validateCompaniesHouse,
};
