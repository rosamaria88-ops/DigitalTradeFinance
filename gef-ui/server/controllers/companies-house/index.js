import _isEmpty from 'lodash/isEmpty';
import * as api from '../../services/api';
import { validationErrorHandler } from '../../utils/helpers';

const companiesHouse = async (req, res) => {
  try {
    const { params } = req;
    const { applicationId } = params;
    const { exporterId } = await api.getApplication(applicationId);
    const { details } = await api.getExporter(exporterId);
    const { companiesHouseRegistrationNumber } = details;

    return res.render('partials/companies-house.njk', {
      regNumber: companiesHouseRegistrationNumber,
      applicationId,
    });
  } catch (err) {
    return res.render('partials/problem-with-service.njk');
  }
};

const validateCompaniesHouse = async (req, res) => {
  try {
    const { params, body } = req;
    const { regNumber } = body;
    const { applicationId } = params;
    const { exporterId } = await api.getApplication(applicationId);
    const { details } = await api.getExporter(exporterId);
    const { companiesHouseRegistrationNumber } = details;

    console.log(companiesHouseRegistrationNumber);

    if (_isEmpty(regNumber)) {
      const regNumberError = {
        errRef: 'regNumber',
        errMsg: 'Enter a Companies House registration number',
      };

      return res.render('partials/companies-house.njk', {
        errors: validationErrorHandler(regNumberError),
        regNumber,
        applicationId,
      });
    }
    console.log('regNumber', regNumber);
    console.log('exporterId', exporterId);

    const test = await api.getCompaniesHouseDetails(regNumber, exporterId);

    console.log('test', test);

    return res.redirect('exporters-address');
  } catch (err) {
    // Validation errors
    if (err.status === 422) {
      return res.render('partials/companies-house.njk', {
        errors: validationErrorHandler(err.data),
      });
    }

    return res.render('partials/problem-with-service.njk');
  }
};

export {
  companiesHouse,
  validateCompaniesHouse,
};
