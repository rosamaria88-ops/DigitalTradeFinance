const {createADeal} = require('../../missions');
const {deleteAllDeals} = require('../../missions/deal-api');

const {contract, dashboard} = require('../../pages');
const relative = require('../../relativeURL');

const user = {username: 'MAKER', password: 'MAKER'};

context('View a deal', () => {
  beforeEach( async() => {
    // [dw] at time of writing, the portal was throwing exceptions; this stops cypress caring
    cy.on('uncaught:exception', (err, runnable) => {
      console.log(err.stack);
      return false;
    });

    await deleteAllDeals(user);
  });

  it('The deal page contains the data entered in /before-you-start/bank-details', () => {
    createADeal({
      ... user,
      bankDealId: 'someDealId',
      bankDealName: 'someDealName'
    });

    contract.bankSupplyContractID().invoke('text').then((text) => {
      expect(text.trim()).equal('someDealId')
    });

    contract.supplyContractName().invoke('text').then((text) => {
      expect(text.trim()).equal('someDealName')
    });

  });

});
