const express = require('express');
const api = require('../api');
const {
  requestParams,
  generateErrorSummary,
  errorHref,
  postToApi,
} = require('../helpers');

const validateToken = require('./middleware/validate-token');

const {
  provide, MANDATORY_CRITERIA,
} = require('./api-data-provider');

const beforeYouStartValidation = require('../validation/before-you-start');

const router = express.Router();
router.use('/before-you-start/*', validateToken);

const userCanCreateADeal = (user) => user && user.roles.includes('maker');

router.get('/before-you-start', provide([MANDATORY_CRITERIA]), async (req, res) => {
  const { mandatoryCriteria } = req.apiData;

  const { user } = req.session;

  if (!userCanCreateADeal(user)) {
    res.redirect('/');
  } else {
    res.render('before-you-start/before-you-start.njk', {
      mandatoryCriteria,
      user: req.session.user,
    });
  }
});

router.post('/before-you-start', provide([MANDATORY_CRITERIA]), async (req, res) => {
  const { mandatoryCriteria } = req.apiData;

  const validationErrors = generateErrorSummary(
    beforeYouStartValidation(req.body),
    errorHref,
  );

  if (validationErrors) {
    return res.render('before-you-start/before-you-start.njk', {
      mandatoryCriteria,
      validationErrors,
    });
  }

  if (req.body.criteriaMet === 'false') {
    return res.redirect('/unable-to-proceed');
  }

  return res.redirect('/before-you-start/bank-deal');
});

router.get('/before-you-start/bank-deal', async (req, res) => {
  const { user } = req.session;

  if (!userCanCreateADeal(user)) {
    res.redirect('/');
  } else {
    res.render('before-you-start/before-you-start-bank-deal.njk', {
      user: req.session.user,
    });
  }
});

router.post('/before-you-start/bank-deal', provide([MANDATORY_CRITERIA]), async (req, res) => {
  const { userToken } = requestParams(req);

  const newDeal = {
    ...req.body,
    mandatoryCriteria: req.apiData[MANDATORY_CRITERIA],
  };

  const apiResponse = await postToApi(
    api.createDeal(newDeal, userToken),
    errorHref,
  );

  const { validationErrors } = apiResponse;

  if (validationErrors) {
    const {
      bankInternalRefName,
      additionalRefName,
    } = req.body;

    return res.status(400).render('before-you-start/before-you-start-bank-deal.njk', {
      bankInternalRefName,
      additionalRefName,
      validationErrors,
      user: req.session.user,
    });
  }

  return res.redirect(`/contract/${apiResponse._id}`); // eslint-disable-line no-underscore-dangle
});

router.get('/unable-to-proceed', (req, res) => res.render('unable-to-proceed.njk', {
  user: req.session.user,
}));

module.exports = router;
