// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    logout(): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  //email has capitalized letters in it to test case insensitivity
  cy.get('[formControlName="userEmail"]').type(email);
  cy.get('[formControlName="userPassword"]').type(password);

  cy.get('odst-login').find('button').contains('Sign In').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('body').then(($body) => {
    if ($body.find('.right-4').length > 0) {
      cy.get('mat-icon').contains('account_circle').parent().click();
      cy.get('button').contains('Logout').click();
    }
  });
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
