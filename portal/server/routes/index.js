const express = require('express');
const startRoutes = require('./start');
const loginRoutes = require('./login');
const dashboardRoutes = require('./dashboard');
const contractRoutes = require('./contract');
const miscRoutes = require('./misc');
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const mgaRoutes = require('./mga');
const feedbackRoutes = require('./feedback');
const schemeTypeRoutes = require('./schemeType');

const router = express.Router();

router.use('/', startRoutes);
router.use('/', loginRoutes);
router.use('/', dashboardRoutes);
router.use('/', contractRoutes);
router.use('/', miscRoutes);
router.use('/', adminRoutes);
router.use('/', userRoutes);
router.use('/', mgaRoutes);
router.use('/', feedbackRoutes);
router.use('/', schemeTypeRoutes);

module.exports = router;
