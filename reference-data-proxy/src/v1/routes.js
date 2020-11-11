const express = require('express');

const openRouter = express.Router();
const countries = require('./controllers/countries.controller');
const currencies = require('./controllers/currencies.controller');
const industrySectors = require('./controllers/industry-sectors.controller');

openRouter.route('/countries')
  .get(
    countries.findAll,
  );

openRouter.route('/countries/:code')
  .get(
    countries.findOne,
  );

openRouter.route('/currencies')
  .get(
    currencies.findAll,
  );

openRouter.route('/currencies/:id')
  .get(
    currencies.findOne,
  );

openRouter.route('/industry-sectors')
  .get(
    industrySectors.findAll,
  );

openRouter.route('/industry-sectors/:code')
  .get(
    industrySectors.findOne,
  );

module.exports = { openRouter };
