const {login} = require('../../missions');
const {deleteAllDeals, createManyDeals} = require('../../missions/deal-api');
const {contract} = require('../../pages');
const relative = require('../../relativeURL');

const maker1 = {username: 'MAKER', password: 'MAKER'};

// test data we want to set up + work with..
const twentyOneDeals = require('./dashboard/twentyOneDeals');


context('Contracts viewed by role=maker, by status', () => {

  let dealsFromMaker1 = twentyOneDeals;

  const aDealInStatus = (status) => {
    const candidates = dealsFromMaker1.filter(deal=>deal.details.status===status);
    expect(candidates.length > 0);
    return candidates[0];
  };

  beforeEach( () => {
    // [dw] at time of writing, the portal was throwing exceptions; this stops cypress caring
    cy.on('uncaught:exception', (err, runnable) => {
      console.log(err.stack);
      return false;
    });
  });

  before( async() => {
    // clean down anything our test-users have created
    await deleteAllDeals(maker1);
    // insert deals as each user
    dealsFromMaker1 = await createManyDeals(dealsFromMaker1, { ...maker1 });
  });

  it('Status = Draft, (//TODO validation) abandon = disabled, proceed to review = enabled', () => {
    login({...maker1});
    contract.visit(aDealInStatus('Draft'));

    // since we're deliberately not applying validation at this point we check this
    contract.canProceed().should('exist');
    contract.cannotProceed().should('not.exist');

    contract.proceedToReview().should('exist')
                              .and('not.be.disabled');

    // once we validate properly we'll need a test case that also covers invalid Drafts:
    // contract.cannotProceed().should('exist');
    // contract.canProceed().should('not.exist');
    //
    // contract.proceedToReview().should('exist')
    //                           .and('be.disabled');


    contract.abandon().should('exist')
                      .and('not.be.disabled');

    contract.returnToMaker().should('not.exist');
    contract.proceedToSubmit().should('not.exist');
  });

  it("Status = Further Maker's input required, (//TODO validation)  abandon = enabled, proceed to review = enabled", () => {
    login({...maker1});
    contract.visit(aDealInStatus("Further Maker's input required"));

    // since we're deliberately not applying validation at this point we check this
    contract.canProceed().should('exist');
    contract.cannotProceed().should('not.exist');

    contract.proceedToReview().should('exist')
                              .and('not.be.disabled');

    // once we validate properly we'll need a test case that also covers invalid Drafts:
    // contract.cannotProceed().should('exist');
    // contract.canProceed().should('not.exist');
    //
    // contract.proceedToReview().should('exist')
    //                           .and('be.disabled');


    contract.abandon().should('exist')
                      .and('not.be.disabled');

    contract.returnToMaker().should('not.exist');
    contract.proceedToSubmit().should('not.exist');
  });

  it("Status = Abandoned Deal, abandon = disabled, proceed to review = disabled", () => {
    login({...maker1});
    contract.visit(aDealInStatus("Abandoned Deal"));

    contract.canProceed().should('not.exist');
    contract.cannotProceed().should('not.exist');

    contract.abandon().should('exist')
                      .and('be.disabled');

    contract.proceedToReview().should('exist')
                              .and('be.disabled');

    contract.returnToMaker().should('not.exist');
    contract.proceedToSubmit().should('not.exist');
  });

  it("Status = Acknowledged by UKEF, abandon = disabled, proceed to review = disabled", () => {
    login({...maker1});
    contract.visit(aDealInStatus("Acknowledged by UKEF"));

    contract.canProceed().should('not.exist');
    contract.cannotProceed().should('not.exist');

    contract.abandon().should('exist')
                      .and('be.disabled');

    contract.proceedToReview().should('exist')
                              .and('be.disabled');

    contract.returnToMaker().should('not.exist');
    contract.proceedToSubmit().should('not.exist');
  });

  it("Status = Accepted by UKEF (without conditions), abandon = disabled, proceed to review = enabled", () => {
    login({...maker1});
    contract.visit(aDealInStatus("Accepted by UKEF (without conditions)"));

    contract.canProceed().should('not.exist');
    contract.cannotProceed().should('not.exist');

    contract.abandon().should('exist')
                      .and('be.disabled');

    contract.proceedToReview().should('exist')
                              .and('not.be.disabled');

    contract.returnToMaker().should('not.exist');
    contract.proceedToSubmit().should('not.exist');
  });

  it("Status = Accepted by UKEF (with conditions), abandon = disabled, proceed to review = enabled", () => {
    login({...maker1});
    contract.visit(aDealInStatus("Accepted by UKEF (with conditions)"));

    contract.canProceed().should('not.exist');
    contract.cannotProceed().should('not.exist');

    contract.abandon().should('exist')
                      .and('be.disabled');

    contract.proceedToReview().should('exist')
                              .and('not.be.disabled');

    contract.returnToMaker().should('not.exist');
    contract.proceedToSubmit().should('not.exist');
  });

  it("Status = Ready for Checker's approval, abandon = disabled, proceed to review = disabled", () => {
    login({...maker1});
    contract.visit(aDealInStatus("Ready for Checker's approval"));

    contract.canProceed().should('not.exist');
    contract.cannotProceed().should('not.exist');

    contract.abandon().should('exist')
                      .and('be.disabled');

    contract.proceedToReview().should('exist')
                              .and('be.disabled');

    contract.returnToMaker().should('not.exist');
    contract.proceedToSubmit().should('not.exist');
  });

  it("Status = Submitted, no options displayed", () => {
    login({...maker1});
    contract.visit(aDealInStatus("Submitted"));

    contract.canProceed().should('not.exist');
    contract.cannotProceed().should('not.exist');
    contract.abandon().should('not.exist');
    contract.proceedToReview().should('not.exist');
    contract.returnToMaker().should('not.exist');
    contract.proceedToSubmit().should('not.exist');
  });

  it("Status = Rejected by UKEF, no options displayed", () => {
    login({...maker1});
    contract.visit(aDealInStatus("Rejected by UKEF"));

    contract.canProceed().should('not.exist');
    contract.cannotProceed().should('not.exist');
    contract.abandon().should('not.exist');
    contract.proceedToReview().should('not.exist');
    contract.returnToMaker().should('not.exist');
    contract.proceedToSubmit().should('not.exist');
  });

});
