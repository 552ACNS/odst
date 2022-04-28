describe('ods', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });
  before(() => {
    //TODO: Implement when login is a thing.
    //   cy.visit('/login');
    //   cy.get('[formcontrolname="userUsername"]').type('admin');
    //   cy.get('[formcontrolname="userPassword"]').type('admin');
    //   cy.get('odst-login').find('button').contains('Sign In').click();
    //   cy.location('pathname').should('include', '/home');
  });
  it('should submit a new report', () => {
    cy.visit('/disclaimer');
    cy.location('pathname').should('include', '/disclaimer');
    cy.get('odst-disclaimer').find('button').contains('Accept').click();
    cy.location('pathname').should('include', '/survey');
    cy.contains('span', 'Organization')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('[formcontrolname="event"]').type('e2e Test');
    cy.get('#mat-radio-3').click();
    cy.get('[formcontrolname="CC')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('#mat-radio-8').click();
    cy.get('[formcontrolname="impact"]').type(
      'negative impact on work environment'
    );
    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });
});
