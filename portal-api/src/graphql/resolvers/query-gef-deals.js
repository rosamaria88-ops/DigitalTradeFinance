const { findDeals } = require('../../v1/gef/controllers/application.controller');

const { dbHelpers } = require('./helpers');

const queryGefDeals = async (_, { params = {} }, ctx) => {
  const { start = 0, pagesize, filters = [] } = params;

  const dbFilters = filters.map((clause) => ({
    [clause.field]: clause.operator ? dbHelpers.createDbQuery(clause.operator, clause.value) : clause.value,
  }));

  const deals = await findDeals(ctx.user, dbFilters, start, pagesize);

  const dealsArray = deals[0].deals;
  const count = deals[0].count;

  return {
    deals: dealsArray,
    count,
  };
};

module.exports = queryGefDeals;
