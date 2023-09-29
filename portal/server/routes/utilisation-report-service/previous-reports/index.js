const express = require('express');
const { getPreviousReports } = require('../../../controllers/utilisation-report-service');
const { validateRole, validateToken } = require('../../middleware');
const { PAYMENT_OFFICER } = require('../../../constants/roles');

const router = express.Router();

router.get('/previous-reports', [validateToken, validateRole({ role: [PAYMENT_OFFICER] })], (req, res) => getPreviousReports(req, res));

module.exports = router;
