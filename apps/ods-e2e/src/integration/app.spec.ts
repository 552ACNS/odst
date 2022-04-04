describe('ods', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('mat-card-title').contains(
      'Observations of Discrimination in the Squadron'
    );
  });

  it('should display the login page', () => {
    // get the I want to login button
    cy.get('button').contains('I want to login').click();
    // get the login form
    cy.get('mat-card-title').contains('Sign In');
  });
});
