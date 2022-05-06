describe('ods', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });
  before(() => {
    cy.visit('/login');
    //email has capitalized letters in it to test case insensitivity
    cy.get('[formcontrolname="userEmail"]').type('adMin@aDmin.com');
    cy.get('[formcontrolname="userPassword"]').type('admin');
    cy.get('odst-login').find('button').contains('Sign In').click();
    cy.location('pathname').should('include', '/dashboard');
  });
  it('should view unresolved and resolved responses from dashboard', () => {
    cy.visit('/dashboard');
    cy.location('pathname').should('include', '/dashboard');
    cy.get('h1').contains('Admin Admin, E-∞');
    cy.get('h3').contains('Administrator');
    cy.get('p').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');
    cy.get('h1').contains('Unresolved Responses');
    cy.get('button').contains('Back').click().wait('@graphql');
    cy.location('pathname').should('include', '/dashboard');
    cy.get('p').contains('Resolved').click();
    cy.location('pathname').should('include', '/responses');
    cy.get('h1').contains('Resolved Responses');
    cy.get('button').contains('Back').click();
    cy.location('pathname').should('include', '/dashboard');
  });
});
