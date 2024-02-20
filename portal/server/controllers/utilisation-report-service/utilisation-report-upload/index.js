const { format, startOfMonth, addMonths } = require('date-fns');
const { extractCsvData, removeCellAddressesFromArray } = require('../../../utils/csv-utils');
const { validateCsvData } = require('./utilisation-report-validator');
const { getUploadErrors } = require('./utilisation-report-upload-errors');
const { getReportDueDate, getDueReportDates } = require('./utilisation-report-status');
const api = require('../../../api');
const { getReportAndUserDetails } = require('./utilisation-report-details');
const { PRIMARY_NAV_KEY } = require('../../../constants');

const setSessionUtilisationReport = (req, nextDueReportDate) => {
  req.session.utilisationReport = {
    reportPeriod: {
      start: {
        month: nextDueReportDate.month,
        year: nextDueReportDate.year,
      },
      end: {
        month: nextDueReportDate.month,
        year: nextDueReportDate.year,
      },
    },
    formattedReportPeriod: nextDueReportDate.formattedReportPeriod,
  };
};

/**
 * @typedef {Object} ReportDetails
 * @property {string} uploadedByFullName - The uploaded by users full name with format '{firstname} {surname}'
 * @property {string} formattedDateAndTimeUploaded - The date uploaded formatted as 'd MMMM yyyy at h:mmaaa'
 * @property {string} lastUploadedReportPeriod - The report period of the report formatted as 'MMMM yyyy'
 * @property {string} nextReportPeriod - The upcoming report period (the current month) with format 'MMMM yyyy'
 * @property {string} nextReportPeriodSubmissionStart - The start of the month when the next report period report can be submitted with format 'd MMMM yyyy'
 */

/**
 * Gets details about the utilisation report which was most
 * recently uploaded to the bank with the bank ID provided
 * @param {string} userToken - Token to validate session
 * @param {string} bankId - ID of the bank
 * @returns {Promise<ReportDetails>}
 */
const getLastUploadedReportDetails = async (userToken, bankId) => {
  const lastUploadedReport = await api.getLastestReportByBank(userToken, bankId);
  const reportAndUserDetails = getReportAndUserDetails(lastUploadedReport);

  const nextReportDate = new Date();
  const nextReportPeriod = format(nextReportDate, 'MMMM yyyy');

  const nextReportPeriodSubmissionStartDate = addMonths(nextReportDate, 1);
  const nextReportPeriodSubmissionStart = format(startOfMonth(nextReportPeriodSubmissionStartDate), 'd MMMM yyyy');

  return { ...reportAndUserDetails, nextReportPeriod, nextReportPeriodSubmissionStart };
};

const getUtilisationReportUpload = async (req, res) => {
  const { user, userToken } = req.session;
  const bankId = user.bank.id;
  try {
    const dueReportDates = await getDueReportDates(userToken, bankId);
    if (dueReportDates.length > 0) {
      const nextDueReportDate = dueReportDates[0];
      setSessionUtilisationReport(req, nextDueReportDate);
      const reportPeriodDate = new Date(nextDueReportDate.year, nextDueReportDate.month - 1);
      const nextDueReportDueDate = await getReportDueDate(userToken, reportPeriodDate);
      return res.render('utilisation-report-service/utilisation-report-upload/utilisation-report-upload.njk', {
        user,
        primaryNav: PRIMARY_NAV_KEY.UTILISATION_REPORT_UPLOAD,
        dueReportDates,
        nextDueReportDueDate,
      });
    }

    const lastUploadedReportDetails = await getLastUploadedReportDetails(userToken, bankId);
    return res.render('utilisation-report-service/utilisation-report-upload/utilisation-report-upload.njk', {
      user,
      primaryNav: PRIMARY_NAV_KEY.UTILISATION_REPORT_UPLOAD,
      dueReportDates,
      ...lastUploadedReportDetails,
    });
  } catch (error) {
    console.error('Failed to render utilisation-report-upload:', error);
    return res.render('_partials/problem-with-service.njk', { user });
  }
};

const renderPageWithError = (req, res, errorSummary, validationError, dueReportDates) => {
  if (req.query?.check_the_report) {
    return res.render('utilisation-report-service/utilisation-report-upload/check-the-report.njk', {
      fileUploadError: validationError,
      errorSummary,
      user: req.session.user,
      primaryNav: PRIMARY_NAV_KEY.UTILISATION_REPORT_UPLOAD,
    });
  }
  return res.render('utilisation-report-service/utilisation-report-upload/utilisation-report-upload.njk', {
    validationError,
    errorSummary,
    user: req.session.user,
    primaryNav: PRIMARY_NAV_KEY.UTILISATION_REPORT_UPLOAD,
    dueReportDates,
  });
};

const postUtilisationReportUpload = async (req, res) => {
  const { user, userToken } = req.session;
  const bankId = user.bank.id;

  try {
    const uploadErrors = getUploadErrors(req, res);
    if (uploadErrors) {
      const { uploadErrorSummary, uploadValidationError } = uploadErrors;

      const dueReportDates = await getDueReportDates(userToken, bankId);
      return renderPageWithError(req, res, uploadErrorSummary, uploadValidationError, dueReportDates);
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
      const dueReportDates = await getDueReportDates(userToken, bankId);
      return renderPageWithError(req, res, extractDataErrorSummary, extractDataError, dueReportDates);
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
        user,
        primaryNav: PRIMARY_NAV_KEY.UTILISATION_REPORT_UPLOAD,
      });
    }

    req.session.utilisationReport = {
      ...req.session.utilisationReport,
      fileBuffer,
      filename: req.file.originalname,
      reportData: csvJson,
      bankName: req.session.user.bank.name,
      submittedBy: `${user.firstname} ${user.surname}`,
    };

    return res.redirect('/utilisation-report-upload/confirm-and-send');
  } catch (error) {
    console.error('Failed to upload utilisation report:', error);
    return res.render('_partials/problem-with-service.njk', { user });
  }
};

const getReportConfirmAndSend = async (req, res) => {
  try {
    if (!req.session.utilisationReport) {
      return res.redirect('/utilisation-report-upload');
    }

    return res.render('utilisation-report-service/utilisation-report-upload/confirm-and-send.njk', {
      user: req.session.user,
      primaryNav: PRIMARY_NAV_KEY.UTILISATION_REPORT_UPLOAD,
      filename: req.session.utilisationReport.filename,
    });
  } catch (error) {
    return res.render('_partials/problem-with-service.njk', { user: req.session.user });
  }
};

const postReportConfirmAndSend = async (req, res) => {
  try {
    const { user, userToken, utilisationReport } = req.session;
    const { fileBuffer, reportPeriod, reportData, formattedReportPeriod } = utilisationReport;

    const mappedReportData = removeCellAddressesFromArray(reportData);

    const response = await api.uploadUtilisationReportData(user, reportPeriod, mappedReportData, fileBuffer, formattedReportPeriod, userToken);

    if (response?.status === 200 || response?.status === 201) {
      const { paymentOfficerEmail } = response.data;
      req.session.utilisationReport = {
        ...req.session.utilisationReport,
        paymentOfficerEmail,
      };
      return res.redirect('/utilisation-report-upload/confirmation');
    }
    console.error('Error saving utilisation report: %O', response);
    return res.render('_partials/problem-with-service.njk', { user: req.session.user });
  } catch (error) {
    console.error('Error saving utilisation report: %O', error);
    return res.render('_partials/problem-with-service.njk', { user: req.session.user });
  }
};

const getReportConfirmation = async (req, res) => {
  try {
    if (!req.session.utilisationReport) {
      return res.redirect('/utilisation-report-upload');
    }
    const { formattedReportPeriod, paymentOfficerEmail } = req.session.utilisationReport;
    delete req.session.utilisationReport;
    return res.render('utilisation-report-service/utilisation-report-upload/confirmation.njk', {
      user: req.session.user,
      primaryNav: PRIMARY_NAV_KEY.UTILISATION_REPORT_UPLOAD,
      reportPeriod: formattedReportPeriod,
      paymentOfficerEmail,
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
