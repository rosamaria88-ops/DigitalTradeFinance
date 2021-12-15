const express = require('express');
const {
  facilities,
  createFacility,
} = require('../controllers/facilities');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.get('/application-details/:dealId/facilities', validateToken, (req, res) => facilities(req, res));
router.get('/application-details/:dealId/facilities/:facilityId', validateToken, (req, res) => facilities(req, res));
router.post('/application-details/:dealId/facilities', validateToken, (req, res) => createFacility(req, res));
router.post('/application-details/:dealId/facilities/:facilityId', validateToken, (req, res) => createFacility(req, res));

module.exports = router;
