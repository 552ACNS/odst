beforeEach(() => {
  cy.intercept('POST', '**/graphql').as('graphql');
});

describe('Test user account controls', () => {
  it('Should submit a password reset request by entering a valid user email', () => {
    cy.visit('/disclaimer');
    cy.get('button').contains('I want to login').click();
    cy.location('pathname').should('include', '/login');
    cy.get('button').contains('Forgot Password').click();
    cy.location('pathname').should('include', '/password-recovery');
    cy.get('input').type('admin@admin.com');
    cy.get('button').contains('Submit').click();
    cy.get('simple-snack-bar');
  });
});
