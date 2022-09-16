export class newUserLogin {
  newUserLogin(email: string, password: string) {
    cy.login(email, password);
    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');
  }

  loginAndCreateOrg(email: string, password: string) {
    cy.login(email, password);
    cy.location('pathname').should('include', '/dashboard');
    cy.get('#btnMenu').click();
    cy.get('button').contains('Create Organization').click();
    cy.location('pathname').should('include', '/create-organization');
  }

  loginAndEditOrg(email: string, password: string) {
    cy.login(email, password);
    cy.location('pathname').should('include', '/dashboard');
    cy.get('#btnMenu').click();
    cy.get('button').contains('Edit Organization').click();
    cy.location('pathname').should('include', '/edit-organization');
  }
}

export const onNewUserLogin = new newUserLogin();
