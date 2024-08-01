const { param } = require('express-validator');
const { isValidIsoMonth, isValidIsoYear } = require('@ukef/dtfs2-common');

const bankIdValidation = param('bankId').isString().matches(/^\d+$/).withMessage('The bank id provided should be a string of numbers');

exports.bankIdValidation = [bankIdValidation];

/**
 * Validator for a path parameter which is a mongo id
 * @param {string} paramName
 * @returns {import('express-validator').ValidationChain}
 */
const mongoIdValidation = (paramName) => param(paramName).isMongoId().withMessage(`Invalid MongoDB '${paramName}' path param provided`);

exports.mongoIdValidation = mongoIdValidation;

/**
 * Validator for a path parameter which is an sql integer id
 * @param {string} paramName - The parameter name
 * @returns {import('express-validator').ValidationChain}
 */
const sqlIdValidation = (paramName) => param(paramName).isInt({ min: 0 }).withMessage(`Invalid '${paramName}' path param provided`);

exports.sqlIdValidation = sqlIdValidation;

/**
 * Validates that specified route or query parameters are strings in ISO month format 'yyyy-MM'
 * @param {string | string[]} fields - the field name(s) to validate
 * @return {import('express-validator').ValidationChain[]}
 */
exports.isoMonthValidation = (fields) => [
  param(fields)
    .custom(isValidIsoMonth)
    .withMessage((value, { path }) => `'${path}' parameter must be an ISO month string (format 'yyyy-MM')`),
];

/**
 * Validates that specified route or query parameters are strings in ISO year format 'yyyy'
 * @param {string} paramName - The parameter name
 * @returns {import('express-validator').ValidationChain}
 */
const yearValidation = (paramName) => param(paramName).custom(isValidIsoYear).withMessage(`Invalid '${paramName}' path param provided`);

exports.yearValidation = yearValidation;
