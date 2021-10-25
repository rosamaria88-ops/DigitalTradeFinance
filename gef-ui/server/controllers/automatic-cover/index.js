const { validationErrorHandler, stringToBoolean } = require('../../utils/helpers');
const { DEAL_SUBMISSION_TYPE } = require('../../../constants');
const { getValidationErrors, deriveCoverType } = require('./helpers');

const api = require('../../services/api');

const updateSubmissionType = async (applicationId, coverType) => {
  await api.updateApplication(applicationId, { submissionType: coverType });
};

const automaticCover = async (req, res) => {
  const { params } = req;
  const { applicationId } = params;

  try {
    const application = await api.getApplication(applicationId);
    const { eligibility } = application;

    return res.render('partials/automatic-cover.njk', {
      terms: eligibility.criteria,
      applicationId,
    });
  } catch (err) {
    console.error(err);
    return res.render('partials/problem-with-service.njk');
  }
};

const validateAutomaticCover = async (req, res, next) => {
  try {
    const { body, params, query } = req;
    const { applicationId } = params;
    const { saveAndReturn } = query;
    const application = await api.getApplication(applicationId);
    const { eligibility } = application;

    const automaticCoverErrors = getValidationErrors(body, eligibility.criteria);
    const coverType = deriveCoverType(body, eligibility.criteria);

    if (!saveAndReturn && automaticCoverErrors.length > 0) {
      const mappedTerms = eligibility.criteria.map((answerObj) => {
        const submittedAnswer = body[String(answerObj.id)];

        return {
          ...answerObj,
          answer: submittedAnswer ? stringToBoolean(submittedAnswer) : null,
        };
      });

      return res.render('partials/automatic-cover.njk', {
        errors: validationErrorHandler(automaticCoverErrors, 'automatic-cover'),
        terms: mappedTerms,
        applicationId,
      });
    }

    await updateSubmissionType(applicationId, coverType);

    // copy existing answers
    const newAnswers = eligibility.criteria;

    // only update the answers that have been submitted.
    Object.keys(body).forEach((key) => {
      const answerIndex = newAnswers.findIndex((a) => a.id === Number(key));
      newAnswers[answerIndex].answer = stringToBoolean(body[key]);
    });

    const applicationUpdate = {
      eligibility: {
        criteria: newAnswers,
      },
    };

    await api.updateApplication(applicationId, applicationUpdate);

    if (saveAndReturn) {
      return res.redirect(`/gef/application-details/${applicationId}`);
    }

    if (coverType === DEAL_SUBMISSION_TYPE.MIA) {
      return res.redirect(
        `/gef/application-details/${applicationId}/ineligible-automatic-cover`,
      );
    }
    if (coverType === DEAL_SUBMISSION_TYPE.AIN) {
      return res.redirect(
        `/gef/application-details/${applicationId}/eligible-automatic-cover`,
      );
    }

    return res.redirect(`/gef/application-details/${applicationId}`);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  automaticCover,
  validateAutomaticCover,
};
