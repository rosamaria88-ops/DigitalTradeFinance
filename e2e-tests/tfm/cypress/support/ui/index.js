import './amendments';
import './facilities';
import './deals';

Cypress.Commands.add('login', require('./logIn'));
Cypress.Commands.add('typeWithoutDelay', { prevSubject: true }, require('./type-without-delay'));
