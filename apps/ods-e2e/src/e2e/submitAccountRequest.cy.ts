describe('ods', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });

  it('will sign someone in', () => {
    cy.login('admin@admin.com', 'admin');
  });

  //This ain't working
  // it('deletes a user', () => {
  //   const authorization = `bearer ${accessToken}`;
  //   cy.request({
  //     method: 'POST',
  //     url: 'http://localhost:3343/graphql',
  //     form: true,
  //     headers: {
  //       authorization,
  //     },
  //     body: {
  //       operationName: 'deleteUser',
  //       variables: {
  //         userWhereUniqueInput: {
  //           email: 'e2etest@gmail.com',
  //         },
  //       },
  //       query: `mutation deleteUser($userWhereUniqueInput: UserWhereUniqueInput!) {
  //         deleteUser(userWhereUniqueInput: $userWhereUniqueInput) {
  //           firstName
  //         }
  //       }`,
  //     },
  //   });
  // });

  it('submit a account creation request', () => {
    //window.localStorage.removeItem('refreshToken');
    cy.visit('/request-account');
    cy.location('pathname').should('include', '/request-account');
    cy.get('[formcontrolname="firstName"]').type('e2e');
    cy.get('[formcontrolname="lastName"]').type('test');
    cy.get('[formcontrolname="email"]').type('e2etest@gmail.com');

    cy.get('[formcontrolname="grade"]').click();

    cy.wait('@graphql');

    cy.get('.mat-mdc-option').contains('O-1').click();

    cy.get('[formControlName="permissions"]').parent().parent().click();

    cy.wait('@graphql');

    cy.get('.mat-mdc-option').contains('Commander').click();

    cy.get('[formcontrolname="org"]').click();

    cy.get('.mat-mdc-option').contains('552 ACW').click();

    cy.get('[formcontrolname="password"]').type('thisISaREALLYgreatPA$$word!3');
    cy.get('[formcontrolname="confirmPassword"]').type(
      'thisISaREALLYgreatPA$$word!3'
    );

    cy.get('button').contains('Submit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });

  it('should not accept login with non-ENABLED account', () => {
    //will go through login using credentials for requested account created above
    cy.visit('/login');
    cy.get('[formcontrolname="userEmail"]').type('e2etest@gmail.com');
    cy.get('[formcontrolname="userPassword"]').type(
      'thisISaREALLYgreatPA$$word!3'
    );
    cy.get('odst-login').find('button').contains('Sign In').click();
    //expect to get a wrong email or password notice in repose
    cy.contains(
      'p',
      'Wrong email or password. Try again or click Forgot Password to reset it.'
    );
  });

  it('should accept a new account', () => {
    // We don't use this login method anymore, refer to cy.login
    cy.login('admin@admin.com', 'admin');

    // This should use the UI elements to navigate to the account request page
    // Not a hardcoded path
    cy.visit('/requested-accounts');
    cy.location('pathname').should('include', '/requested-accounts');

    // THis is not descriptive, nor clear what it's doing,
    cy.contains('td', 'e2e').click().wait('@graphql');
    cy.contains('div', 'e2e').wait('@graphql');
    cy.contains('button', 'Accept').click();

    // THis doesn't actually check whether the account was actually accepted,
    // you're removing the row regardless of whether it was accepted
    cy.contains('td', 'e2e').should('not.exist');
  });

  // THink
});
