const { startNow, users, createUser} = require('../../../pages');
const relative = require('../../../relativeURL');

const admin = { username: 'ADMIN', password: 'ADMIN' };

context('Admin user creates a new user', () => {
  const userToCreate = {
    username: 'an.address@some.com',
    password: 'w00t',
    firstname: 'bob',
    surname: 'builder',
    bank: 'HSBC',
    roles: ['maker'],
  }

  beforeEach(() => {
    // [dw] at time of writing, the portal was throwing exceptions; this stops cypress caring
    cy.on('uncaught:exception', (err, runnable) => {
      console.log(err.stack);
      return false;
    });

    cy.removeUserIfPresent(userToCreate, admin);
  });

  it('Admin user adds a new user and confirms the new user works', () => {
    // login and go to dashboard
    cy.login(admin);

    startNow.header().users().click();
    users.user(userToCreate).should('not', 'exist');

    users.addUser().click();

    for (const role of userToCreate.roles) {
      createUser.role(role).click();
    }
    createUser.username().type(userToCreate.username);
    createUser.password().type(userToCreate.password);
    createUser.confirmPassword().type(userToCreate.password);
    createUser.firstname().type(userToCreate.firstname);
    createUser.surname().type(userToCreate.surname);

    createUser.bank().select(userToCreate.bank);

    createUser.createUser().click();

    cy.url().should('eq', relative('/admin/users/'));
    users.user(userToCreate).should('exist');


    // login as the new user
    cy.login(userToCreate);
    cy.url().should('eq', relative('/start-now'));

    // prove the lastLogin timestamp
    cy.login(admin);
    cy.url().should('eq', relative('/start-now'));
    startNow.header().users().click();

    users.row(userToCreate).lastLogin().invoke('text').then((text) => {
      expect(text.trim()).to.not.equal('');
    });

  });

  it("Manage users screen should pass Lighthouse audit", function () {
    // login and go to manage users
    cy.login(admin);
    startNow.header().users().click();
    
    cy.lighthouse({
      performance: 85,
      accessibility: 100,
      "best-practices": 85,
      seo: 85,
      pwa: 100,
    });
    cy.pa11y();
  });

  it("Add user screen should pass Lighthouse audit", function () {
    // login and go to add/edit user
    cy.login(admin);
    startNow.header().users().click();
    users.addUser().click();
    
    cy.lighthouse({
      performance: 85,
      accessibility: 100,
      "best-practices": 85,
      seo: 85,
      pwa: 100,
    });
    cy.pa11y();
  });

});
