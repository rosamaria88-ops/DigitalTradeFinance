const { ObjectID } = require('bson');

function checkType(type) {
  if (type) {
    switch (type.toUpperCase()) {
      case 'CASH':
      case 'CONTINGENT':
        return type.toUpperCase();
      default:
        return null;
    }
  } else {
    return null;
  }
}

function checkPaymentType(paymentType) {
  if (paymentType) {
    switch (paymentType.toUpperCase()) {
      case 'IN_ARREARS_QUARTLY':
      case 'IN_ADVANCE_QUARTERLY':
        return paymentType.toUpperCase();
      default:
        return null;
    }
  } else {
    return null;
  }
}

class Facility {
  constructor(req) {
    if (req.applicationId) {
      // new application
      this.applicationId = req.applicationId ? new ObjectID(req.applicationId) : null;
      this.type = checkType(req.type);
      this.hasBeenIssued = null;
      if (req.hasBeenIssued != null) {
        this.hasBeenIssued = Boolean(req.hasBeenIssued);
      }
      this.name = req.name || null;
      this.shouldCoverStartOnSubmission = null;
      this.coverStartDate = null;
      this.coverEndDate = null;
      this.monthsOfCover = null;
      this.details = null;
      this.detailsOther = null;
      this.currency = req.currency || null;
      this.value = req.value || null;
      this.coverPercentage = null;
      this.interestPercentage = null;
      this.paymentType = null;
      this.createdAt = Date.now();
      this.updatedAt = Date.now();
      this.ukefExposure = 0;
      this.guaranteeFee = 0;
      this.submittedAsIssuedDate = req.submittedAsIssuedDate || null;
      this.ukefFacilityId = req.ukefFacilityId || null;
      this.feeType = null;
      this.frequency = null;
      this.dayCountBasis = null;
    } else {
      // update application
      if (req.hasBeenIssued != null) {
        this.hasBeenIssued = Boolean(req.hasBeenIssued);
      }

      if (req.name != null) {
        this.name = String(req.name);
      }

      if (req.shouldCoverStartOnSubmission != null) {
        this.shouldCoverStartOnSubmission = Boolean(req.shouldCoverStartOnSubmission);
      }

      if (req.coverStartDate != null) {
        this.coverStartDate = new Date(req.coverStartDate);
      }

      if (req.coverEndDate != null) {
        this.coverEndDate = new Date(req.coverEndDate);
      }

      if (req.monthsOfCover === null) {
        this.monthsOfCover = req.monthsOfCover;
      } else if (req.monthsOfCover !== undefined) {
        this.monthsOfCover = Number(req.monthsOfCover);
      }

      if (req.details != null) {
        this.details = req.details;
      }

      if (req.detailsOther != null) {
        this.detailsOther = String(req.detailsOther);
      }

      if (req.currency != null) {
        this.currency = req.currency;
      }

      if (req.value != null) {
        this.value = Number(req.value);
      }

      if (req.coverPercentage != null) {
        this.coverPercentage = Number(req.coverPercentage);
      }

      if (req.interestPercentage != null) {
        this.interestPercentage = Number(req.interestPercentage);
      }

      if (req.feeType) {
        this.feeType = req.feeType;
      }

      if (req.frequency) {
        this.frequency = req.frequency;
      }

      if (req.dayCountBasis) {
        this.dayCountBasis = req.dayCountBasis;
      }

      if (req.paymentType != null) {
        this.paymentType = checkPaymentType(req.paymentType);
      }

      if (req.ukefExposure != null) {
        this.ukefExposure = req.ukefExposure;
      }

      if (req.guaranteeFee != null) {
        this.guaranteeFee = req.guaranteeFee;
      }

      if (req.ukefFacilityId !== null) {
        this.ukefFacilityId = req.ukefFacilityId;
      }

      if (req.submittedAsIssuedDate != null) {
        this.submittedAsIssuedDate = req.submittedAsIssuedDate;
      }

      // nullify values based on previous questions
      if (req.shouldCoverStartOnSubmission === true) {
        this.coverStartDate = null;
      }

      if (req.hasBeenIssued === false) {
        this.coverStartDate = null;
        this.coverEndDate = null;
        this.shouldCoverStartOnSubmission = null;
      } else if (req.hasBeenIssued === true) {
        this.monthsOfCover = null;
      }

      this.updatedAt = Date.now();
    }
  }
}

module.exports = {
  Facility,
};
