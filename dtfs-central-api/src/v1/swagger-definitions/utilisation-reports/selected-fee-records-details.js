/**
 * @openapi
 * definitions:
 *   SelectedFeeRecordDetails:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       facilityId:
 *         type: string
 *       exporter:
 *         type: string
 *       reportedFee:
 *         $ref: '#/definitions/CurrencyAndAmount'
 *       reportedPayments:
 *         $ref: '#/definitions/CurrencyAndAmount'
 *   SelectedFeeRecordsDetails:
 *     type: object
 *     properties:
 *       totalReportedPayments:
 *         $ref: '#/definitions/CurrencyAndAmount'
 *       bank:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *       reportPeriod:
 *         $ref: '#/definitions/ReportPeriod'
 *       feeRecords:
 *         type: array
 *         items:
 *           $ref: '#/definitions/SelectedFeeRecordDetails'
 *       payments:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             dateReceived:
 *               type: string
 *             currency:
 *                 $ref: '#/definitions/Currency'
 *             amount:
 *                 type: number
 *             reference:
 *               type: string
 *               nullable: true
 */