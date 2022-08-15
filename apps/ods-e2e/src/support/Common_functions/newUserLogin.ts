export class newUserLogin {
  newUserLogin(email: string, password: string) {
    cy.login(email, password);
    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');
  }
}

export const onNewUserLogin = new newUserLogin();
