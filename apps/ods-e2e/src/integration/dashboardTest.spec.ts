describe('ods', () => {
  before(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
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
    cy.get('[formcontrolname="event"]').type('Needs a test in resolved');
    cy.get('#mat-radio-5').click();
    cy.get('[formcontrolname="CC')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('#mat-radio-8').click();
    cy.get('[formcontrolname="impact"]').type('Test');
    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });
  it('should view unresolved and resolved responses from dashboard', () => {
    cy.visit('/login');
    //email has capitalized letters in it to test case insensitivity
    cy.get('[formcontrolname="userEmail"]').type('adMin@aDmin.com');
    cy.get('[formcontrolname="userPassword"]').type('admin');
    cy.get('odst-login').find('button').contains('Sign In').click();
    cy.location('pathname').should('include', '/dashboard');
    cy.get('#userNameGrade').contains('Admin Admin, E-∞');
    cy.get('#userTitleOrg').contains('Administrator');
    cy.get('#gridId').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');
    cy.get('h1').contains('Unresolved Responses');
    cy.get('textarea').type('This is a resolution');
    cy.get('button').contains('Submit').click();
    cy.get('button').contains('Back').click().wait('@graphql');
    cy.location('pathname').should('include', '/dashboard');
    cy.get('#gridId').contains('Resolved').click();
    cy.location('pathname').should('include', '/responses');
    cy.get('h1').contains('Resolved Responses');
    // cy.get('[aria-label="Last page"]').click();
    // cy.get('textarea').should('have.value', 'This is a resolution');
    cy.get('button').contains('Back').click();
    cy.location('pathname').should('include', '/dashboard');
  });
});
