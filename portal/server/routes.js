import express from 'express';
import api from './api';

const router = express.Router();

router.get('/', (req, res) => res.render('login.njk'));

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const tokenResponse = await api.login(email, password);

  const {
    success,
    token,
  } = tokenResponse;

  if (success) {
    req.session.userToken = token;
    res.redirect('/start-now');
  } else {
    res.status(401).render('login.njk');
  }
});

router.get('/start-now', (req, res) => res.render('start-now.njk'));

router.get('/before-you-start', async (req, res) => res.render('before-you-start/before-you-start.njk', {
  mandatoryCriteria: await api.mandatoryCriteria(req.session.userToken),
}));

router.post('/before-you-start', (req, res) => {
  const { criteriaMet } = req.body;

  // TODO: check as boolean
  if (criteriaMet === 'true') {
    return res.redirect('/before-you-start/bank-deal');
  }
  return res.redirect('/unable-to-proceed');
});

router.get('/before-you-start/bank-deal', (req, res) => res.render('before-you-start/before-you-start-bank-deal.njk'));

router.post('/before-you-start/bank-deal', (req, res) => res.redirect('/contract/1'));

router.get('/unable-to-proceed', (req, res) => res.render('unable-to-proceed.njk'));

router.get('/dashboard', async (req, res) => res.render('dashboard/deals.njk', {
  contracts: await api.contracts(req.session.userToken),
  banks: await api.banks(req.session.userToken),
}));

// TODO: maybe something like
// const doApiCall = async (call) => call(req.userToken)

router.get('/dashboard/transactions', async (req, res) => res.render('dashboard/transactions.njk', {
  transactions: await api.transactions(req.session.userToken),
  banks: await api.banks(req.session.userToken),
}));

router.get('/contract/:id', async (req, res) => res.render('contract/contract-view.njk', await api.contract(req.params.id, req.session.userToken)));

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

router.get('/feedback', (req, res) => res.render('feedback.njk'));

router.get('/contact-us', (req, res) => res.render('contact.njk'));

export default router;
