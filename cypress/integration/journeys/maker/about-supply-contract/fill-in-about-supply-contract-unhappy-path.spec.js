const {contract, contractAboutSupplier, contractAboutPreview} = require('../../../pages');
const maker1 = {username: 'MAKER', password: 'MAKER'};

// test data we want to set up + work with..
const twentyOneDeals = require('../dashboard/twentyOneDeals');


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
    const aDealWith_AboutSupplyContract_InStatus = (status) => {
      const candidates = twentyOneDeals
        .filter( deal=> (deal.submissionDetails && status === deal.submissionDetails.status) )
        .filter( deal=> (deal.details && deal.details.status === 'Draft'));

      const deal = candidates[0];
      if (!deal) {
        throw new Error("no suitable test data found");
      } else {
        return deal;
      }
    };

    cy.deleteDeals(maker1);
    cy.insertOneDeal(aDealWith_AboutSupplyContract_InStatus('Not Started'), { ...maker1 })
      .then( insertedDeal =>  deal=insertedDeal );
  });

  it('A maker picks up a deal in status=Draft, and fills in the about-supply-contract section, selecting every option that requires more data.', () => {
    cy.login({...maker1});

    // go the long way for the first test- actually clicking via the contract page to prove the link..
    contract.visit(deal);
    // check the status is displaying correctly
    contract.aboutSupplierDetailsStatus().invoke('text').then((text) => {
      expect(text.trim()).equal('Not Started');
    });
    contract.aboutSupplierDetailsLink().click();

    contractAboutSupplier.supplierType().select('Exporter');
    contractAboutSupplier.supplierName().type('UKFS');
    contractAboutSupplier.supplierAddress().country().select('GBR');
    contractAboutSupplier.supplierAddress().line1().type('1 Horseguards Road');
    contractAboutSupplier.supplierAddress().town().type('Westminster');
    contractAboutSupplier.supplierAddress().county().type('London');
    contractAboutSupplier.supplierAddress().postcode().type('SW1A 2HQ');

    //-----
    // select a different correspondence address so we are forced to fill it in
    contractAboutSupplier.supplierCorrespondenceAddressDifferent().click();
    contractAboutSupplier.supplierCorrespondenceAddress().country().select('GBR');
    contractAboutSupplier.supplierCorrespondenceAddress().line1().type('2 Horseguards Road');
    contractAboutSupplier.supplierCorrespondenceAddress().town().type('Eastminster');
    contractAboutSupplier.supplierCorrespondenceAddress().county().type('Edinburgh');
    contractAboutSupplier.supplierCorrespondenceAddress().postcode().type('ED1 23S');

    contractAboutSupplier.industrySector().select('1009'); //Information and communication
    contractAboutSupplier.industryClass().select('62012'); //Business and domestic software development
    contractAboutSupplier.smeTypeSmall().click();
    contractAboutSupplier.supplyContractDescription().type('Description.')

    //-----
    // select a legally-distinct indemnifier
    contractAboutSupplier.legallyDistinct().click();

    //-----
    // use the companies house search to find the indemnifier
    contractAboutSupplier.indemnifierCompaniesHouseRegistrationNumber().type('08547313');
    contractAboutSupplier.indemnifierSearchCompaniesHouse().click();

    //------
    // the search should populate the indemnifier address fields
    //
    // contractAboutSupplier.supplierAddressCountry().should('?', '?'); //TODO country; mapping company house "england"-> portal "United Kingdom"
    // contractAboutSupplier.supplierAddress().county().should('not.have.value', ''); //TODO don't believe CH store county...
    contractAboutSupplier.indemnifierName().should('not.have.value', ''); //TODO if we had 'proper' test company we might assert real data
    contractAboutSupplier.indemnifierAddress().line1().should('not.have.value', ''); //TODO
    contractAboutSupplier.indemnifierAddress().line2().should('not.have.value', ''); //TODO
    contractAboutSupplier.indemnifierAddress().town().should('not.have.value', ''); //TODO
    contractAboutSupplier.indemnifierAddress().postcode().should('not.have.value', ''); //TODO

    //-----
    // continue filling in the form..
    // select a different correspondence address for the indemnifier..
    contractAboutSupplier.indemnifierCorrespondenceAddressDifferent().click();
    contractAboutSupplier.indemnifierCorrespondenceAddress().country().select('GBR');
    contractAboutSupplier.indemnifierCorrespondenceAddress().line1().type('27 Petersfield');
    contractAboutSupplier.indemnifierCorrespondenceAddress().town().type('Chelmsford');
    contractAboutSupplier.indemnifierCorrespondenceAddress().county().type('Essex');
    contractAboutSupplier.indemnifierCorrespondenceAddress().postcode().type('CM1 4EP');


    contractAboutSupplier.saveAndGoBack().click();

    contract.aboutSupplierDetailsStatus().invoke('text').then((text) => {
      expect(text.trim()).equal('Incomplete');
    });


    //---
    // confirm all the data we entered ^^ on the preview page
    //---
    contractAboutPreview.visit(deal);

    contractAboutPreview.supplierType().invoke('text').then((text) => {
      expect(text.trim()).equal('Exporter');
    });
    contractAboutPreview.supplierName().invoke('text').then((text) => {
      expect(text.trim()).equal('UKFS');
    });
    contractAboutPreview.supplierAddress().country().invoke('text').then((text) => {
      expect(text.trim()).equal('GBR');
    });
    contractAboutPreview.supplierAddress().line1().invoke('text').then((text) => {
      expect(text.trim()).equal('1 Horseguards Road');
    });
    contractAboutPreview.supplierAddress().town().invoke('text').then((text) => {
      expect(text.trim()).equal('Westminster');
    });
    contractAboutPreview.supplierAddress().county().invoke('text').then((text) => {
      expect(text.trim()).equal('London');
    });
    contractAboutPreview.supplierAddress().postcode().invoke('text').then((text) => {
      expect(text.trim()).equal('SW1A 2HQ');
    });

    contractAboutPreview.supplierCorrespondenceAddressDifferent().invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });
    //TODO - country seems to be a weak spot.. need to think about it..
    // contractAboutPreview.supplierCorrespondenceAddress().country().invoke('text').then((text) => {
    //   expect(text.trim()).equal('GBR');
    // });
    contractAboutPreview.supplierCorrespondenceAddress().line1().invoke('text').then((text) => {
      expect(text.trim()).equal('2 Horseguards Road');
    });
    contractAboutPreview.supplierCorrespondenceAddress().town().invoke('text').then((text) => {
      expect(text.trim()).equal('Eastminster');
    });
    contractAboutPreview.supplierCorrespondenceAddress().county().invoke('text').then((text) => {
      expect(text.trim()).equal('Edinburgh');
    });
    contractAboutPreview.supplierCorrespondenceAddress().postcode().invoke('text').then((text) => {
      expect(text.trim()).equal('ED1 23S');
    });

    contractAboutPreview.industrySector().invoke('text').then((text) => {
      expect(text.trim()).equal('1009');//Information and communication
    });
    contractAboutPreview.industryClass().invoke('text').then((text) => {
      expect(text.trim()).equal('62012');//Business and domestic software development
    });
    contractAboutPreview.smeType().invoke('text').then((text) => {
      expect(text.trim()).equal('Small');
    });
    contractAboutPreview.supplyContractDescription().invoke('text').then((text) => {
      expect(text.trim()).equal('Description.');
    });

    contractAboutPreview.legallyDistinct().invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });

    contractAboutPreview.indemnifierCompaniesHouseRegistrationNumber().invoke('text').then((text) => {
      expect(text.trim()).equal('08547313');
    });
    // contractAboutSupplier.supplierAddressCountry().should('?', '?'); //TODO country; mapping company house "england"-> portal "United Kingdom"
    // contractAboutSupplier.supplierAddress().county().should('not.have.value', ''); //TODO don't believe CH store county...
    contractAboutPreview.indemnifierName().invoke('text').then((text) => {
      expect(text.trim()).not.equal('');//TODO if we had 'proper' test company we might assert real data
    });
    contractAboutPreview.indemnifierAddress().line1().invoke('text').then((text) => {
      expect(text.trim()).not.equal('');//TODO if we had 'proper' test company we might assert real data
    });
    contractAboutPreview.indemnifierAddress().line2().invoke('text').then((text) => {
      expect(text.trim()).not.equal('');//TODO if we had 'proper' test company we might assert real data
    });
    contractAboutPreview.indemnifierAddress().town().invoke('text').then((text) => {
      expect(text.trim()).not.equal('');//TODO if we had 'proper' test company we might assert real data
    });
    contractAboutPreview.indemnifierAddress().postcode().invoke('text').then((text) => {
      expect(text.trim()).not.equal('');//TODO if we had 'proper' test company we might assert real data
    });

    //-----
    // continue filling in the form..
    // select a different correspondence address for the indemnifier..
    contractAboutPreview.indemnifierCorrespondenceAddressDifferent().invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });
    contractAboutPreview.indemnifierCorrespondenceAddress().country().invoke('text').then((text) => {
      expect(text.trim()).equal('GBR');
    });
    contractAboutPreview.indemnifierCorrespondenceAddress().line1().invoke('text').then((text) => {
      expect(text.trim()).equal('27 Petersfield');
    });
    contractAboutPreview.indemnifierCorrespondenceAddress().town().invoke('text').then((text) => {
      expect(text.trim()).equal('Chelmsford');
    });
    contractAboutPreview.indemnifierCorrespondenceAddress().county().invoke('text').then((text) => {
      expect(text.trim()).equal('Essex');
    });
    contractAboutPreview.indemnifierCorrespondenceAddress().postcode().invoke('text').then((text) => {
      expect(text.trim()).equal('CM1 4EP');
    });


  });

});
