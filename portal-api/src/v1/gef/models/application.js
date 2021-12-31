const { DEAL_TYPE, STATUS } = require('../enums');

class Application {
  constructor(req, eligibilityTerms) {
    const editedBy = [];

    if (eligibilityTerms) {
      // New Application
      this.dealType = DEAL_TYPE;
      this.maker = req.maker ? req.maker : null;
      this.status = STATUS.DRAFT;
      this.bank = req.bank;

      this.exporter = req.exporter ? req.exporter : {
        status: STATUS.NOT_STARTED,
      };

      this.eligibility = {
        criteria: eligibilityTerms.map((term) => ({
          ...term,
          answer: null,
        })),
      };

      this.bankInternalRefName = req.bankInternalRefName ? String(req.bankInternalRefName) : null;
      this.mandatoryVersionId = req.mandatoryVersionId ? String(req.mandatoryVersionId) : null;
      this.createdAt = Date.now();
      this.updatedAt = null;
      this.submissionType = null;
      this.submissionCount = 0;
      this.submissionDate = null;
      this.supportingInformation = {};
      this.ukefDealId = null;
      this.checkerId = null;
      editedBy.push(this.maker._id);
      this.editedBy = editedBy;
      this.additionalRefName = req.additionalRefName ? String(req.additionalRefName) : null;
      this.facilitiesUpdated = null;
      this.portalActivities = [];
    } else {
      // Update
      this.updatedAt = Date.now();

      // Only set properties if they are part of the request otherwise they get cleared
      const updatable = [
        'exporter',
        'comments',
        'submissionType',
        'submissionCount',
        'submissionDate',
        'ukefDealId',
        'editorId',
        'checkerId',
        'supportingInformation',
        'bankInternalRefName',
        'additionalRefName',
        'eligibility',
        'facilitiesUpdated',
        'ukefDecisionAccepted',
        'portalActivities',
      ];

      if (req.exporter) {
        req.exporter.updatedAt = Date.now();
      }

      if (req.eligibility) {
        req.eligibility.updatedAt = Date.now();
      }

      Object.entries(req).forEach(([key, value]) => {
        if (updatable.includes(key)) {
          this[key] = value;
        }
      });
    }
  }
}

module.exports = {
  Application,
};
