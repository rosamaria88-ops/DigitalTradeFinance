import express from 'express';
import api from '../../api';
import aboutRoutes from './about';
import bondRoutes from './bond';
import eligibilityRoutes from './eligibility';
import {
  getApiData,
  getDealIdAndToken,
} from '../../helpers';

const router = express.Router();

router.get('/contract/:_id', async (req, res) => {
  const { _id, userToken } = getDealIdAndToken(req);

  return res.render('contract/contract-view.njk',
    await getApiData(
      api.contract(_id, userToken),
      res,
    ));
});

router.get('/contract/:_id/comments', async (req, res) => {
  const { _id, userToken } = getDealIdAndToken(req);

  return res.render('contract/contract-view-comments.njk',
    await getApiData(
      api.contract(_id, userToken),
      res,
    ));
});

router.get('/contract/:_id/submission-details', async (req, res) => {
  const { _id, userToken } = getDealIdAndToken(req);

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
  const { _id, userToken } = getDealIdAndToken(req);

  return res.render('contract/contract-delete.njk',
    await getApiData(
      api.contract(_id, userToken),
      res,
    ));
});

router.use('/',
  aboutRoutes,
  bondRoutes,
  eligibilityRoutes);

export default router;
