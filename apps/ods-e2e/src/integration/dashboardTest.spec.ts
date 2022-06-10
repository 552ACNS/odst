describe('ods', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });
  before(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
    cy.visit('/disclaimer');
    cy.location('pathname').should('include', '/disclaimer');
    cy.get('odst-disclaimer').find('button').contains('Accept').click();
    cy.location('pathname').should('include', '/feedback');
    cy.contains('span', 'Organization')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('[formcontrolname="event"]').type('Needs a test in resolved', {
      force: true,
    });
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
    cy.login('admin@admin.com', 'admin');

    cy.location('pathname').should('include', '/dashboard');
    cy.get('#userNameGrade').contains('Admin Admin, E-∞');
    cy.get('#userTitleOrg').contains('Administrator');
    cy.get('mat-card').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');
    cy.get('h1').contains('Unresolved Responses');
    cy.get('button').contains('Submit').click();
    cy.get('mat-slide-toggle').click();
    cy.reload();
    cy.get('button').contains('Back').click().wait('@graphql');
    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Resolved').click();
    cy.location('pathname').should('include', '/responses');

    cy.get('h1').contains('Resolved Responses');
    cy.get('button').contains('Back').click();
    cy.location('pathname').should('include', '/dashboard');
  });
});
