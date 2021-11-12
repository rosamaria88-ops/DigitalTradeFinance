const CONSTANTS = require('../../../../constants');

const mapDeals = (
  deals,
  mapBssDealFunc,
  mapGefDealFunc,
) => {
  const mappedDeals = deals.map((deal) => {
    const { dealType } = deal.dealSnapshot;

    if (dealType === CONSTANTS.DEALS.DEAL_TYPE.GEF) {
      return mapGefDealFunc(deal);
    }

    if (dealType === CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS) {
      return mapBssDealFunc(deal);
    }

    return deal;
  });

  return {
    count: mappedDeals.length,
    deals: mappedDeals,
  };
};

module.exports = mapDeals;
