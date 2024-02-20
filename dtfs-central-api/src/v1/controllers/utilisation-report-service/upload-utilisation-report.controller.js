const { saveUtilisationData } = require('../../../repositories/utilisation-data-repo');
const { saveUtilisationReportDetails, getUtilisationReportDetailsByBankIdMonthAndYear } = require('../../../repositories/utilisation-reports-repo');
const {
  validateUtilisationReportData,
  validateReportPeriod,
  validateFileInfo,
  validateBankId,
} = require('../../validation/utilisation-report-service/utilisation-report-validator');
const db = require('../../../drivers/db-client');

const validatePayload = (reportData, reportPeriod, fileInfo, bankId) => {
  const validationErrors = validateUtilisationReportData(reportData);
  const reportPeriodValidationErrors = validateReportPeriod(reportPeriod);
  if (reportPeriodValidationErrors.length) validationErrors.push(...reportPeriodValidationErrors);
  const fileInfoValidationErrors = validateFileInfo(fileInfo);
  if (fileInfoValidationErrors.length) validationErrors.push(...fileInfoValidationErrors);
  const bankIdValidationError = validateBankId(bankId);
  if (bankIdValidationError) validationErrors.push(bankIdValidationError);
  return validationErrors;
};

const postUtilisationReportData = async (req, res) => {
  try {
    const { reportData, reportPeriod, user, fileInfo } = req.body;
    const { bank } = user;

    // If there are any data type errors in the report data, return 400
    const validationErrors = validatePayload(reportData, reportPeriod, fileInfo, bank.id);
    if (validationErrors.length > 0) {
      console.error('Failed to save utilisation report, validation errors: %O', validationErrors);
      return res.status(400).send(validationErrors);
    }

    const existingReport = await getUtilisationReportDetailsByBankIdMonthAndYear(bank.id, reportPeriod.start.month, reportPeriod.start.year);
    if (existingReport) {
      console.error('Utilisation report already exists for bank %s, month %d, year %d', bank.id, reportPeriod.start.month, reportPeriod.start.year);
      return res.status(409).send('Utilisation report already exists');
    }
    const client = await db.getClient();
    const session = client.startSession();
    let reportDetails;
    await session.withTransaction(async () => {
      reportDetails = await saveUtilisationReportDetails(reportPeriod, fileInfo, user);
      await saveUtilisationData(reportData, reportPeriod, bank, reportDetails?.reportId);
    });
    await session.endSession();
    return res.status(201).send({ dateUploaded: reportDetails.dateUploaded });
  } catch (error) {
    console.error('Failed to save utilisation report %O', error);
    return res.status(500).send('Failed to save utilisation report');
  }
};

module.exports = { postUtilisationReportData };
