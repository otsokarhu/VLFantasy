import { Chainable } from 'cypress';

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('createTeam', (name) => {
  cy.contains('Luo joukkue').click();
  cy.get('input[name="teamName"]').type(name);
  cy.contains('button', 'Luo joukkue').click();
});

Cypress.Commands.add(
  'register',
  (firstName, lastName, username, email, password) => {
    cy.visit('/signup');
    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  }
);

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      createTeam(name: string): Chainable<void>;
      register(
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string
      ): Chainable<void>;
    }
  }
}
