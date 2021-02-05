const { queryDeals } = require('../../v1/api');
const queryDeal = require('./query-deal');
const queryFacility = require('./query-facility');

const resolvers = {
  Query: {
    deal: (root, args) => queryDeal(args),
    deals: (root, args) => queryDeals(args),
    facility: (root, args) => queryFacility(args),
  },
};

module.exports = resolvers;
