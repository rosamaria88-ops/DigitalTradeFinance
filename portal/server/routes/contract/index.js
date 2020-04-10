import express from 'express';
import api from '../../api';
import aboutRoutes from './about';
import bondRoutes from './bond';
import eligibilityRoutes from './eligibility';
import {
  getApiData,
  requestParams,
  errorHref,
  postToApi,
} from '../../helpers';

const router = express.Router();

router.get('/contract/:_id', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  return res.render('contract/contract-view.njk', {
    contract: await getApiData(
      api.contract(_id, userToken),
      res,
    ),
    user: req.session.user,
  });
});

router.get('/contract/:_id/comments', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  return res.render('contract/contract-view-comments.njk',
    await getApiData(
      api.contract(_id, userToken),
      res,
    ));
});

router.get('/contract/:_id/submission-details', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  return res.render('contract/contract-submission-details.njk', {
    contract: await getApiData(
      api.contract(_id, userToken),
      res,
    ),
    mandatoryCriteria: await getApiData(
      api.mandatoryCriteria(userToken),
      res,
    ),
  });
});

router.get('/contract/:_id/delete', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  return res.render('contract/contract-delete.njk',
    await getApiData(
      api.contract(_id, userToken),
      res,
    ));
});

router.get('/contract/:_id/ready-for-review', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  return res.render('contract/contract-ready-for-review.njk',
    await getApiData(
      api.contract(_id, userToken),
      res,
    ));
});

router.get('/contract/:_id/edit-name', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  return res.render('contract/contract-edit-name.njk',
    await getApiData(
      api.contract(_id, userToken),
      res,
    ));
});

router.post('/contract/:_id/edit-name', async (req, res) => {
  const { _id, userToken } = requestParams(req);
  const { bankSupplyContractName } = req.body;

  const updateToApply = {
    _id,
    details: {
      bankSupplyContractName,
    },
  };

  await api.updateDeal(updateToApply, userToken);

  return res.redirect(`/contract/${_id}`);
});

router.get('/contract/:_id/return-to-maker', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  return res.render('contract/contract-return-to-maker.njk',
    await getApiData(
      api.contract(_id, userToken),
      res,
    ));
});

router.get('/contract/:_id/confirm-submission', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  return res.render('contract/contract-confirm-submission.njk',
    await getApiData(
      api.contract(_id, userToken),
      res,
    ));
});

router.get('/contract/:_id/clone', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  const deal = await getApiData(
    api.contract(_id, userToken),
    res,
  );

  const {
    bankSupplyContractID,
    bankSupplyContractName,
  } = deal.details;

  return res.render('contract/contract-clone.njk', {
    bankSupplyContractID,
    bankSupplyContractName,
  });
});

router.post('/contract/:_id/clone', async (req, res) => {
  const { _id, userToken } = requestParams(req);

  const apiResponse = await postToApi(
    api.cloneDeal(_id, req.body, userToken),
    errorHref,
  );

  const {
    validationErrors,
    details,
  } = apiResponse;

  const {
    bankSupplyContractID,
    bankSupplyContractName,
  } = details;

  if (validationErrors) {
    return res.status(400).render('contract/contract-clone.njk', {
      bankSupplyContractID,
      bankSupplyContractName,
      validationErrors,
    });
  }

  req.flash('successMessage', {
    text: 'Supply Contract cloned successfully. We have cleared some values to ensure data quality. Please complete.',
    href: `/contract/${apiResponse._id}`, // eslint-disable-line no-underscore-dangle
    hrefText: 'View cloned Supply Contract',
  });

  return res.redirect('/dashboard');
});

router.get('/contract/:_id/clone/before-you-start', async (req, res) => {
  const { userToken } = requestParams(req);

  return res.render('before-you-start/before-you-start.njk', {
    mandatoryCriteria: await getApiData(
      api.mandatoryCriteria(userToken),
      res,
    ),
  });
});

router.post('/contract/:_id/clone/before-you-start', async (req, res) => {
  const { _id } = requestParams(req);
  const { criteriaMet } = req.body;

  if (criteriaMet === 'true') {
    return res.redirect(`/contract/${_id}/clone`);
  }
  return res.redirect('/unable-to-proceed');
});

router.use('/',
  aboutRoutes,
  bondRoutes,
  eligibilityRoutes);

export default router;
