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

  it('should display the dashboard page', () => {
    // get the I want to login button
    cy.get('button').contains('I want to login').click();
    // get the login button
    cy.get('button').contains('Sign In').click();

    // the first h1 should be lt Col John Doe
    cy.get('h1').contains('Lt Col John Doe');
  });
});

describe('the dashboard', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('should go to the unresolved screen', () => {
        // navigate to the unresolved screen
        cy.get('p').contains('Unresolved').click();

        // first h1 should be Unresolved Responses
        cy.get('h1').contains('Unresolved Responses');
    
        // click on the back button
        cy.get('button').contains('Back').click();
    
        // ensure that you are back on the dashboard w/ lt col john doe
        cy.get('h1').contains('Lt Col John Doe');
    
        // navigate to the resolved screen
        cy.get('p').contains('Resolved').click();
    
        // first h1 should be Resolved Responses
        cy.get('h1').contains('Resolved Responses');
  });
});