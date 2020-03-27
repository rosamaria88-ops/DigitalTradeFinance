import express from 'express';
import api from '../api';

const router = express.Router();

const makeApiCall = async (query) => {
  try {
    const result = await query;
    return result;
  } catch (catchErr) {
    throw new Error(catchErr);
  }
};

/* eslint-disable */
const getApiData = (query, res) => new Promise((resolve) =>
  makeApiCall(query).then((data) => resolve(data)) // eslint-disable-line implicit-arrow-linebreak
    .catch(() => { // eslint-disable-line arrow-body-style
      // redirect to login (currently assuming all errors are Auth errors)
      return res.redirect('/');
    }));
/* eslint-enable */

router.get('/contract/:_id', async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const contract = await getApiData(
    api.contract(req.params._id, req.session.userToken),
    res,
  );
  return res.render('contract/contract-view.njk', contract);
});

router.get('/contract/:id/comments', async (req, res) => res.render('contract/contract-view-comments.njk', await api.contract(req.params.id, req.session.userToken)));

router.get('/contract/:id/submission-details', async (req, res) => res.render('contract/contract-submission-details.njk', {
  contract: await api.contract(req.params.id, req.session.userToken),
  mandatoryCriteria: await api.mandatoryCriteria(req.session.userToken),
}));

router.get('/contract/:id/delete', async (req, res) => res.render('contract/contract-delete.njk', await api.contract(req.params.id, req.session.userToken)));

router.get('/contract/:id/about/supplier', async (req, res) => res.render('about/about-supplier.njk', {
  contract: await api.contract(req.params.id, req.session.userToken),
  countries: await api.countries(req.session.userToken),
  industrySectors: await api.industrySectors(req.session.userToken),
}));

router.get('/contract/:id/about/financial', async (req, res) => res.render('about/about-supply-financial.njk', {
  contract: await api.contract(req.params.id, req.session.userToken),
  currencies: await api.bondCurrencies(req.session.userToken),
}));

router.get('/contract/:id/about/buyer', async (req, res) => res.render('about/about-supply-buyer.njk', {
  contract: await api.contract(req.params.id, req.session.userToken),
  countries: await api.countries(req.session.userToken),
}));

router.get('/contract/:id/about/preview', async (req, res) => res.render('about/about-supply-preview.njk', {
  contract: await api.contract(req.params.id, req.session.userToken),
}));

router.get('/contract/:id/eligibility/criteria', async (req, res) => res.render('eligibility/eligibility-criteria.njk', await api.contract(req.params.id, req.session.userToken)));

router.get('/contract/:id/eligibility/supporting-documentation', async (req, res) => res.render('eligibility/eligibility-supporting-documentation.njk', await api.contract(req.params.id, req.session.userToken)));

router.get('/contract/:id/eligibility/preview', async (req, res) => res.render('eligibility/eligibility-preview.njk', {
  contract: await api.contract(req.params.id, req.session.userToken),
  mandatoryCriteria: await api.mandatoryCriteria(req.session.userToken),
}));

router.get('/contract/:id/bond/:bondId/details', async (req, res) => res.render('bond/bond-details.njk',
  await api.contractBond(req.params.id, req.params.bondId, req.session.userToken)));

router.get('/contract/:id/bond/:bondId/financial-details', async (req, res) => res.render('bond/bond-financial-details.njk', {
  ...await api.contractBond(req.params.id, req.params.bondId, req.session.userToken),
  currencies: await api.bondCurrencies(req.session.userToken),
}));

router.get('/contract/:id/bond/:bondId/fee-details', async (req, res) => res.render('bond/bond-fee-details.njk',
  await api.contractBond(req.params.id, req.params.bondId, req.session.userToken)));

router.get('/contract/:id/bond/:bondId/preview', async (req, res) => res.render('bond/bond-preview.njk', {
  contract: await api.contract(req.params.id, req.session.userToken),
  bond: api.contractBond(req.params.id, req.params.bondId, req.session.userToken),
}));

router.get('/contract/:id/bond/:bondId/delete', async (req, res) => res.render('bond/bond-delete.njk', {
  contract: await api.contract(req.params.id, req.session.userToken),
  bond: api.contractBond(req.params.id, req.params.bondId, req.session.userToken),
}));

export default router;
