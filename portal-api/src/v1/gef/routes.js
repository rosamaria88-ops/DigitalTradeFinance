const express = require('express');
const { MAKER, CHECKER, DATA_ADMIN, EDITOR, READ_ONLY, ADMIN } = require('../roles/roles');
const { validateUserHasAtLeastOneAllowedRole } = require('../roles/validate-user-has-at-least-one-allowed-role');

const fileUpload = require('../middleware/file-upload');

const application = require('./controllers/application.controller');
const cloneApplication = require('./controllers/clone-gef-deal.controller');
const facilities = require('./controllers/facilities.controller');
const mandatoryCriteriaVersioned = require('./controllers/mandatoryCriteriaVersioned.controller');
const eligibilityCriteria = require('./controllers/eligibilityCriteria.controller');
const externalApi = require('./controllers/externalApi.controller');
const files = require('./controllers/files.controller');

const router = express.Router();

// Application
router
  .route('/application')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, DATA_ADMIN, ADMIN] }), application.getAll)
  .post(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, DATA_ADMIN] }), application.create);

router.route('/application/clone').post(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER] }), cloneApplication.clone);

router
  .route('/application/:id')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, DATA_ADMIN, ADMIN] }), application.getById)
  .put(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, DATA_ADMIN] }), application.update) // checker can add a comment
  .delete(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, DATA_ADMIN] }), application.delete);

router.route('/application/supporting-information/:id').put(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, DATA_ADMIN] }), application.updateSupportingInformation);

router
  .route('/application/status/:id')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, DATA_ADMIN, ADMIN] }), application.getStatus)
  .put(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, DATA_ADMIN] }), application.changeStatus);

// Facilities
router
  .route('/facilities')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, DATA_ADMIN, ADMIN] }), facilities.getAllGET)
  .post(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, DATA_ADMIN] }), facilities.create)
  .delete(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, DATA_ADMIN] }), facilities.deleteByDealId);

router
  .route('/facilities/:id')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, DATA_ADMIN, ADMIN] }), facilities.getById)
  .put(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, DATA_ADMIN] }), facilities.updatePUT)
  .delete(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, DATA_ADMIN] }), facilities.delete);

// Eligibility Criteria
router
  .route('/eligibility-criteria')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, EDITOR, DATA_ADMIN, ADMIN] }), eligibilityCriteria.getAll)
  .post(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [EDITOR, DATA_ADMIN, ADMIN] }), eligibilityCriteria.create);

router.route('/eligibility-criteria/latest').get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, EDITOR, DATA_ADMIN, ADMIN] }), eligibilityCriteria.getLatest);

router
  .route('/eligibility-criteria/:version')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, EDITOR, DATA_ADMIN, ADMIN] }), eligibilityCriteria.getByVersion)
  .delete(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [EDITOR, DATA_ADMIN, ADMIN] }), eligibilityCriteria.delete);

// Mandatory Criteria
router
  .route('/mandatory-criteria-versioned')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, EDITOR, DATA_ADMIN, ADMIN] }), mandatoryCriteriaVersioned.findAll)
  .post(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [EDITOR, DATA_ADMIN, ADMIN] }), mandatoryCriteriaVersioned.create);

router
  .route('/mandatory-criteria-versioned/latest')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, EDITOR, DATA_ADMIN, ADMIN] }), mandatoryCriteriaVersioned.findLatest);

router
  .route('/mandatory-criteria-versioned/:id')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, EDITOR, DATA_ADMIN, ADMIN] }), mandatoryCriteriaVersioned.findOne)
  .put(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [EDITOR, DATA_ADMIN, ADMIN] }), mandatoryCriteriaVersioned.update)
  .delete(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [EDITOR, DATA_ADMIN, ADMIN] }), mandatoryCriteriaVersioned.delete);

// File Uploads
// TODO: this feels like it should be a service: https://ukef-dtfs.atlassian.net/browse/DTFS2-4842
router.route('/files').post(
  validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, DATA_ADMIN] }),
  (req, res, next) => {
    fileUpload(req, res, (error) => {
      if (!error) {
        return next();
      }
      console.error('Unable to upload file %s', error);
      return res.status(400).json({ status: 400, data: 'Failed to upload file' });
    });
  },
  files.create,
);

router
  .route('/files/:id')
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, EDITOR, DATA_ADMIN, ADMIN] }), files.getById)
  .delete(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, DATA_ADMIN] }), files.delete);

router.route('/files/:id/download').get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, CHECKER, READ_ONLY, EDITOR, DATA_ADMIN, ADMIN] }), files.downloadFile);

router
  .route('/company/:number') // Companies House
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, READ_ONLY, DATA_ADMIN, ADMIN] }), externalApi.getByRegistrationNumber);

router
  .route('/address/:postcode') // Ordnance Survey
  .get(validateUserHasAtLeastOneAllowedRole({ allowedRoles: [MAKER, READ_ONLY, DATA_ADMIN, ADMIN] }), externalApi.getAddressesByPostcode);

module.exports = router;
