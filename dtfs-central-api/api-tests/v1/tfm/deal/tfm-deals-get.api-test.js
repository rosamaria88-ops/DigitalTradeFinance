const moment = require('moment');
const wipeDB = require('../../../wipeDB');
const app = require('../../../../src/createApp');
const api = require('../../../api')(app);
const now = require('../../../../src/now');
const CONSTANTS = require('../../../../src/constants');

const mockUser = {
  _id: '123456789',
  username: 'temp',
  roles: [],
  bank: {
    id: '956',
    name: 'Barclays Bank',
  },
};

const newDeal = (dealOverrides) => ({
  details: {
    bankSupplyContractName: 'mock name',
    bankSupplyContractID: 'mock id',
    ...dealOverrides.details,
    maker: {
      ...mockUser,
      ...(dealOverrides.details && dealOverrides.details.maker) ? dealOverrides.details.maker : {},
    },
  },
  submissionDetails: dealOverrides.submissionDetails,
  editedBy: [],
  eligibility: {
    status: 'Not started',
    criteria: [{ }],
  },
  bondTransactions: dealOverrides.bondTransactions,
  loanTransactions: dealOverrides.loanTransactions,
});
module.exports.newDeal = newDeal;

const createAndSubmitDeals = async (deals) => {
  const result = await Promise.all(deals.map(async (deal) => {
    // create deal
    const createResponse = await api.post({
      deal,
      user: deal.details.maker,
    }).to('/v1/portal/deals');

    expect(createResponse.status).toEqual(200);

    // submit deal
    const submitResponse = await api.put({
      dealType: CONSTANTS.DEALS.DEAL_TYPE.BSS_EWCS,
      dealId: createResponse.body._id,
    }).to('/v1/tfm/deals/submit');

    expect(submitResponse.status).toEqual(200);

    return submitResponse.body;
  }));

  return result;
};
module.exports.createAndSubmitDeals = createAndSubmitDeals;

const updateDealsTfm = async (dealsTfmUpdate) => {
  const result = await Promise.all(dealsTfmUpdate.map(async (deal) => {
    const updateResponse = await api.put({
      dealUpdate: {
        tfm: deal.tfm,
      },
    }).to(`/v1/tfm/deals/${deal._id}`);

    expect(updateResponse.status).toEqual(200);
    return updateResponse.body;
  }));

  return result;
};
module.exports.updateDealsTfm = updateDealsTfm;

describe('/v1/tfm/deals', () => {
  beforeEach(async () => {
    await wipeDB.wipe(['deals']);
    await wipeDB.wipe(['facilities']);
    await wipeDB.wipe(['tfm-deals']);
    await wipeDB.wipe(['tfm-facilities']);
  });

  describe('GET /v1/tfm/deals', () => {
    it('returns all deals', async () => {
      const miaDeal = newDeal({
        details: {
          submissionType: 'Manual Inclusion Application',
        },
      });

      const minDeal = newDeal({
        details: {
          submissionType: 'Manual Inclusion Notice',
        },
      });

      const ainDeal = newDeal({
        details: {
          submissionType: 'Automatic Inclusion Notice',
        },
      });

      await createAndSubmitDeals([
        miaDeal,
        minDeal,
        ainDeal,
        ainDeal,
      ]);

      const { status, body } = await api.get('/v1/tfm/deals');

      expect(status).toEqual(200);
      const expectedTotalDeals = 4;
      expect(body.deals.length).toEqual(expectedTotalDeals);
    });
  });
});
