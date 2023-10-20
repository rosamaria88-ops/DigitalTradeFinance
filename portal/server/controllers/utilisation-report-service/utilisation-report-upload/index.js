const { extractCsvData } = require('../../../utils/csv-utils');
const { validateCsvData } = require('./utilisation-report-validator');
const api = require('../../../api');

const getUtilisationReportUpload = async (req, res) => {
  try {
    return res.render('utilisation-report-service/utilisation-report-upload/utilisation-report-upload.njk', {
      user: req.session.user,
      primaryNav: 'utilisation_report_upload',
    });
  } catch (error) {
    return res.render('_partials/problem-with-service.njk', { user: req.session.user });
  }
};

const getUploadErrors = (req, res) => {
  let uploadValidationError;
  let uploadErrorSummary;
  if (res?.locals?.fileUploadError) {
    uploadErrorSummary = [
      {
        text: res?.locals?.fileUploadError?.text,
        href: '#utilisation-report-file-upload',
      },
    ];
    uploadValidationError = res?.locals?.fileUploadError;
  } else if (!req?.file) {
    uploadErrorSummary = [
      {
        text: 'Select a file',
        href: '#utilisation-report-file-upload',
      },
    ];
    uploadValidationError = { text: 'Select a file' };
  } else if (res?.locals?.virusScanFailed) {
    uploadErrorSummary = [
      {
        text: 'The selected file could not be uploaded - try again',
        href: '#utilisation-report-file-upload',
      },
    ];
    uploadValidationError = { text: 'The selected file could not be uploaded – try again' };
  }
  return { uploadErrorSummary, uploadValidationError };
};

const renderPageWithError = (req, res, errorSummary, validationError) => {
  if (req.query?.check_the_report) {
    return res.render('utilisation-report-service/utilisation-report-upload/check-the-report.njk', {
      fileUploadError: validationError,
      errorSummary,
      user: req.session.user,
      primaryNav: 'utilisation_report_upload',
    });
  }
  return res.render('utilisation-report-service/utilisation-report-upload/utilisation-report-upload.njk', {
    validationError,
    errorSummary,
    user: req.session.user,
    primaryNav: 'utilisation_report_upload',
  });
};

const postUtilisationReportUpload = async (req, res) => {
  try {
    const { uploadErrorSummary, uploadValidationError } = getUploadErrors(req, res);
    if (uploadValidationError || uploadErrorSummary) {
      return renderPageWithError(req, res, uploadErrorSummary, uploadValidationError);
    }

    // File is valid so we can start processing and validating its data
    const { csvJson, fileBuffer, error } = await extractCsvData(req.file); // do we here catch some errors and return generic something went wrong here?
    if (error) {
      const extractDataErrorSummary = [
        {
          text: 'The selected file could not be uploaded, try again and make sure it is not password protected',
          href: '#utilisation-report-file-upload',
        },
      ];
      const extractDataError = { text: 'The selected file could not be uploaded, try again and make sure it is not password protected' };
      return renderPageWithError(req, res, extractDataErrorSummary, extractDataError);
    }
    const csvValidationErrors = validateCsvData(csvJson);
    if (csvValidationErrors.length > 0) {
      const errorSummary = [
        {
          text: 'You must correct these errors before you can upload the report',
          href: '#validation-errors-table',
        },
      ];
      return res.render('utilisation-report-service/utilisation-report-upload/check-the-report.njk', {
        validationErrors: csvValidationErrors,
        errorSummary,
        filename: req.file.originalname,
        user: req.session.user,
        primaryNav: 'utilisation_report_upload',
      });
    }
    // TODO FN-970 Populate month, year
    req.session.utilisation_report = { fileBuffer, fileName: req.file.originalname, month: 'June', year: '2023', bankName: req.session.user.bank.name };
    return res.redirect('/utilisation-report-upload/confirm-and-send');
  } catch (error) {
    return res.render('_partials/problem-with-service.njk', { user: req.session.user });
  }
};

const getReportConfirmAndSend = async (req, res) => {
  try {
    return res.render('utilisation-report-service/utilisation-report-upload/confirm-and-send.njk', {
      user: req.session.user,
      primaryNav: 'utilisation_report_upload',
      fileName: req.session.utilisation_report.fileName,
    });
  } catch (error) {
    return res.render('_partials/problem-with-service.njk', { user: req.session.user });
  }
};

const postReportConfirmAndSend = async (req, res) => {
  const { userToken, utilisation_report: utilisationReport } = req.session;
  try {
    await api.uploadReportAndSendNotification(userToken, utilisationReport);
    return res.redirect('/utilisation-report-upload/confirmation');
  } catch (error) {
    return res.render('_partials/problem-with-service.njk', { user: req.session.user });
  }
};

const getReportConfirmation = async (req, res) => {
  const { month, year } = req.session.utilisation_report;
  try {
    // TODO FN-1103 get reportMonthYear and bankEmail from DB
    const reportMonthYear = `${month} ${year}`;
    const bankEmail = 'tradefinance@barclays.com';
    return res.render('utilisation-report-service/utilisation-report-upload/confirmation.njk', {
      user: req.session.user,
      primaryNav: 'utilisation_report_upload',
      reportMonthYear,
      bankEmail,
    });
  } catch (error) {
    console.error(error);
    return res.render('_partials/problem-with-service.njk', { user: req.session.user });
  }
};

module.exports = {
  getUtilisationReportUpload,
  postUtilisationReportUpload,
  getReportConfirmAndSend,
  postReportConfirmAndSend,
  getReportConfirmation,
};
