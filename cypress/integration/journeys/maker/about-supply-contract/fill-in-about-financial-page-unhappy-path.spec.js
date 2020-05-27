const {contract, contractAboutSupplier, contractAboutBuyer, contractAboutFinancial, contractAboutPreview} = require('../../../pages');
const maker1 = {username: 'MAKER', password: 'MAKER'};

// test data we want to set up + work with..
const aDealWithAboutBuyerComplete = require('./dealWithSecondPageComplete.json');

context('about-supply-contract', () => {
  let deal;

  beforeEach( () => {
    // [dw] at time of writing, the portal was throwing exceptions; this stops cypress caring
    cy.on('uncaught:exception', (err, runnable) => {
      console.log(err.stack);
      return false;
    });
  });

  before( () => {
    cy.insertOneDeal(aDealWithAboutBuyerComplete, { ...maker1 })
      .then( insertedDeal =>  deal=insertedDeal );
  });

  it('A maker picks up a deal with the supplier details completed, and fills in the about-buyer-contract section, using the companies house search.', () => {
    cy.login({...maker1});

    // navigate to the about-buyer page; use the nav so we have it covered in a test..
    contract.visit(deal);
    contract.aboutSupplierDetailsLink().click();
    contractAboutSupplier.nav().aboutBuyerLink().click();
    contractAboutBuyer.nav().aboutFinancialLink().click();

    // set a GBP value, so we don't need to fill in the exchange-rate fields
    contractAboutFinancial.supplyContractValue().type('10,000');
    contractAboutFinancial.supplyContractCurrency().select('USD');
    contractAboutFinancial.supplyContractConversionRateToGBP().type('1.123456');
    contractAboutFinancial.supplyContractConversionDate().day().type('27');
    contractAboutFinancial.supplyContractConversionDate().month().type('11');
    contractAboutFinancial.supplyContractConversionDate().year().type('2019');

    contractAboutFinancial.saveAndGoBack().click();

    // check the data is now on the preview page..
    contractAboutPreview.visit(deal);
    contractAboutPreview.supplyContractValue().invoke('text').then((text) => {
      expect(text.trim()).equal('10,000');
    });
    contractAboutPreview.supplyContractCurrency().invoke('text').then((text) => {
      expect(text.trim()).equal('USD');
    });
    contractAboutPreview.supplyContractConversionRateToGBP().invoke('text').then((text) => {
      expect(text.trim()).equal('1.123456');
    });
    contractAboutPreview.supplyContractConversionDate().invoke('text').then((text) => {
      expect(text.trim()).equal('27/11/2019');
    });

  });

});
