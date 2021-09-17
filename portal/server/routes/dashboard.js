const express = require('express');
const {
  gefDeals, bssDeals, bssFacilities, gefFacilities,
} = require('../controllers/dashboard');

const validateToken = require('./middleware/validate-token');

const router = express.Router();

router.use('/dashboard/*', validateToken);

router.get('/', validateToken, (_, res) => res.redirect('/dashboard/0'));

router.get('/dashboard', async (req, res) => {
  req.session.dashboardFilters = null;
  res.redirect('/dashboard/0');
});

router.get('/dashboard/gef', async (req, res) => res.redirect('/dashboard/gef/0'));

router.get('/dashboard/gef/:page', gefDeals);
router.post('/dashboard/gef/:page', gefDeals);

router.get('/dashboard/facilities/gef', async (req, res) => res.redirect('/dashboard/facilities/gef/0'));

router.get('/dashboard/facilities/gef/:page', gefFacilities);
router.post('/dashboard/facilities/gef/:page', gefFacilities);

router.get('/dashboard/facilities', async (req, res) => res.redirect('/dashboard/facilities/0'));

router.get('/dashboard/facilities/:page', bssFacilities);
router.post('/dashboard/facilities/:page', bssFacilities);

// needs to be ordered last to avoid issues with taking priority over transaction routes
router.get('/dashboard/:page', bssDeals);
router.post('/dashboard/:page', bssDeals);

module.exports = router;
