const express = require('express');
const { getUtilisationReports } = require('../../controllers/utilisation-reports');
const { updateUtilisationReportStatus } = require('../../controllers/utilisation-reports/update-utilisation-report-status');
const { validateSqlId, validateUserTeam } = require('../../middleware');
const { PDC_TEAM_IDS } = require('../../constants');
const { getReportDownload } = require('../../controllers/utilisation-reports/report-download');

const router = express.Router();

router.get('/', validateUserTeam(Object.values(PDC_TEAM_IDS)), getUtilisationReports);

router.post('/', validateUserTeam([PDC_TEAM_IDS.PDC_RECONCILE]), updateUtilisationReportStatus);

router.get('/:id/download', validateUserTeam(Object.values(PDC_TEAM_IDS)), validateSqlId, getReportDownload);

module.exports = router;
