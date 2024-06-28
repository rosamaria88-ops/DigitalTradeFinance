const express = require('express');
const validation = require('../validation/route-validators/route-validators');
const handleExpressValidatorResult = require('../validation/route-validators/express-validator-result-handler');
const { validatePostPaymentPayload } = require('./middleware/payload-validation/validate-post-payment-payload');
const { validateDeletePaymentPayload } = require('./middleware/payload-validation/validate-delete-payment-payload');
const { getUtilisationReportById } = require('../controllers/utilisation-report-service/get-utilisation-report.controller');
const {
  postUploadUtilisationReport,
  postUploadUtilisationReportPayloadValidator,
} = require('../controllers/utilisation-report-service/post-upload-utilisation-report.controller');
const {
  getUtilisationReportsReconciliationSummary,
} = require('../controllers/utilisation-report-service/get-utilisation-reports-reconciliation-summary.controller');
const putUtilisationReportStatusController = require('../controllers/utilisation-report-service/put-utilisation-report-status.controller');
const {
  getUtilisationReportReconciliationDetailsById,
} = require('../controllers/utilisation-report-service/get-utilisation-report-reconciliation-details-by-id.controller');
const { getSelectedFeeRecordDetails } = require('../controllers/utilisation-report-service/get-selected-fee-records-details.controller');
const { postPayment } = require('../controllers/utilisation-report-service/post-payment.controller');
const { deletePayment } = require('../controllers/utilisation-report-service/delete-payment.controller');
const { postKeyingData } = require('../controllers/utilisation-report-service/post-keying-data.controller');
const { getFeeRecordsToKey } = require('../controllers/utilisation-report-service/get-fee-records-to-key.controller');
const { getPaymentDetailsById } = require('../controllers/utilisation-report-service/get-payment-details-by-id.controller');

const utilisationReportsRouter = express.Router();

/**
 * @openapi
 * /utilisation-reports:
 *   post:
 *     summary: Save utilisation report data
 *     tags: [Portal - Utilisation Report Service]
 *     description: Save utilisation report data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - type: object
 *                   properties:
 *                     dateUploaded:
 *                       example: 2023-10-27T08:07:40.028Z
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Invalid payload
 *       409:
 *         description: Server conflict
 */
utilisationReportsRouter.route('/').post(postUploadUtilisationReportPayloadValidator, postUploadUtilisationReport);

/**
 * @openapi
 * /utilisation-reports/:id:
 *   get:
 *     summary: Get utilisation report with the specified id ('id')
 *     tags: [Utilisation Report]
 *     description: Get utilisation report with the specified id ('id')
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the id for the required report
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/definitions/UtilisationReport'
 *                 - type: object
 *                   properties:
 *                     id:
 *                       example: 5
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
utilisationReportsRouter.route('/:id').get(validation.sqlIdValidation('id'), handleExpressValidatorResult, getUtilisationReportById);

/**
 * @openapi
 * /utilisation-reports/reconciliation-summary/:submissionMonth:
 *   get:
 *     summary: |
 *       Utilisation report reconciliation summary for the specified submission
 *       month. This includes status of reports for all banks in the current
 *       submission month, and details of any open reports from previous
 *       submission months
 *     tags: [Utilisation Report]
 *     description: |
 *       Get a summary of utilisation report reconciliation status for all banks
 *       in the specified report submission month, and open reports from
 *       previous submission months
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/UtilisationReportReportPeriodReconciliationSummary'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
utilisationReportsRouter
  .route('/reconciliation-summary/:submissionMonth')
  .get(validation.isoMonthValidation('submissionMonth'), handleExpressValidatorResult, getUtilisationReportsReconciliationSummary);

/**
 * @openapi
 * /utilisation-reports/set-status:
 *   put:
 *     summary: Put utilisation report status for multiple utilisation reports
 *     tags: [Utilisation Report]
 *     description: Set the status of many utilisation reports to completed or not completed.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportsWithStatus:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/UtilisationReportStatusWithReportId'
 *               user:
 *                 $ref: '#/definitions/TFMUser'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
utilisationReportsRouter.route('/set-status').put(putUtilisationReportStatusController.putUtilisationReportStatus);

/**
 * @openapi
 * /utilisation-reports/reconciliation-details/:reportId:
 *   get:
 *     summary: Get the reconciliation details for the utilisation report by the report id
 *     tags: [Utilisation Report]
 *     description: Gets the reconciliation details for the utilisation report by the report id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/UtilisationReportReconciliationDetails'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not Found (if either the report with matching id or bank with matching id cannot be found)
 *       500:
 *         description: Internal Server Error
 */
utilisationReportsRouter
  .route('/reconciliation-details/:reportId')
  .get(validation.sqlIdValidation('reportId'), handleExpressValidatorResult, getUtilisationReportReconciliationDetailsById);

/**
 * @openapi
 * /utilisation-reports/:id/selected-fee-records-details:
 *   get:
 *     summary: Get the fee record details for the selected fee record ids
 *     tags: [Utilisation Report]
 *     description: Get the fee record details for the selected fee record ids
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the id for the report the fees belong to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feeRecordIds:
 *                 description: The ids of the selected fee records
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/SelectedFeeRecordsDetails'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not Found (if the report with matching id cannot be found)
 *       500:
 *         description: Internal Server Error
 */
utilisationReportsRouter
  .route('/:id/selected-fee-records-details')
  .get(validation.sqlIdValidation('id'), handleExpressValidatorResult, getSelectedFeeRecordDetails);

/**
 * @openapi
 * /utilisation-reports/:reportId/payment/:paymentId:
 *   delete:
 *     summary: Delete a payment
 *     tags: [Utilisation Report]
 *     description: Deletes a payment
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id for the report the payment belongs to
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id for the payment to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
utilisationReportsRouter
  .route('/:reportId/payments/:paymentId')
  .delete(
    validation.sqlIdValidation('reportId'),
    validation.sqlIdValidation('paymentId'),
    handleExpressValidatorResult,
    validateDeletePaymentPayload,
    deletePayment,
  );

/**
 * @openapi
 * /utilisation-reports/:reportId/payment:
 *   post:
 *     summary: Add a payment to the utilisation report
 *     tags: [Utilisation Report]
 *     description: Adds a new payment to the utilisation report with the supplied report id
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id for the report to add the payment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feeRecordIds:
 *                 description: The ids of the selected fee records
 *                 type: array
 *                 items:
 *                   type: number
 *               user:
 *                 $ref: '#/definitions/TFMUser'
 *               paymentCurrency:
 *                 $ref: '#/definitions/Currency'
 *               paymentAmount:
 *                 type: number
 *               datePaymentReceived:
 *                 type: string
 *                 description: the date the payment was received as an ISO date string
 *               paymentReference:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
utilisationReportsRouter
  .route('/:reportId/payment')
  .post(validation.sqlIdValidation('reportId'), handleExpressValidatorResult, validatePostPaymentPayload, postPayment);

/**
 * @openapi
 * /utilisation-reports/:reportId/keying-data:
 *   post:
 *     summary: Generate keying data for a utilisation report
 *     tags: [Utilisation Report]
 *     description: Generates keying data for the utilisation report with the supplied report id
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id for the report to generate keying data for
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
utilisationReportsRouter.route('/:reportId/keying-data').post(validation.sqlIdValidation('reportId'), handleExpressValidatorResult, postKeyingData);

/**
 * @openapi
 * /utilisation-reports/:reportId/fee-records-to-key:
 *   get:
 *     summary: Get the fee records to key for a utilisation report
 *     tags: [Utilisation Report]
 *     description: Gets the fee record to key for the utilisation report with the supplied id
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id for the report to get the fee records for
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/FeeRecordsToKeyResponseBody'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
utilisationReportsRouter.route('/:reportId/fee-records-to-key').get(validation.sqlIdValidation('reportId'), handleExpressValidatorResult, getFeeRecordsToKey);

/**
 * @openapi
 * /utilisation-reports/:reportId/payment/:paymentId:
 *   get:
 *     summary: Get the payment details
 *     tags: [Utilisation Report]
 *     description: Gets the payment details for the payment with the supplied id
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id for the report
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id for the payment
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/PaymentDetailsResponseBody'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
utilisationReportsRouter
  .route('/:reportId/payment/:paymentId')
  .get(validation.sqlIdValidation('reportId'), validation.sqlIdValidation('paymentId'), handleExpressValidatorResult, getPaymentDetailsById);

module.exports = utilisationReportsRouter;
