describe('waypoint', () => {
  before(() => {
    cy.visit('/login');
    cy.get('[formcontrolname="userUsername"]').type('admin');
    cy.get('[formcontrolname="userPassword"]').type('admin');
    cy.get('odst-login').find('button').contains('Sign In').click();
    cy.location('pathname').should('include', '/home');
  });
  it('should create a new org', () => {
    cy.visit('/create-org');
    cy.location('pathname').should('include', '/create-org');
    cy.get('[formcontrolname="orgName"]').type('552 FakeOrg');
    cy.get('[formcontrolname="orgTier"]')
      .click()
      .get('mat-option')
      .contains('OTHER')
      .click();
    cy.get('#btnOrgSubmit').click();
    cy.get('#orgCheck', { timeout: 10000 }).should('be.visible');
  });
});
