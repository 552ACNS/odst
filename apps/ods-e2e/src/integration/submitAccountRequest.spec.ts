let accessToken = '';
describe('ods', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });

  it('will sign someone in', function () {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3343/graphql', // baseUrl is prepend to URL
      form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        operationName: 'login',
        variables: {
          loginUserInput: {
            username: 'admin@admin.com',
            password: 'admin',
          },
        },
        query: `
        mutation login($loginUserInput: LoginUserInput!) {
          login(loginUserInput: $loginUserInput) {
            accessToken
            refreshToken
          }
        }
      `,
      },
    }).then((response) => {
      expect(response.body.errors).to.be.undefined;
      accessToken = response.body.data.login.accessToken;
      cy.log(accessToken);
    });
  });

  it('deletes a user', () => {
    const authorization = `bearer ${accessToken}`;
    cy.request({
      method: 'POST',
      url: 'http://localhost:3343/graphql',
      form: true,
      headers: {
        authorization,
      },
      body: {
        operationName: 'deleteUser',
        variables: {
          userWhereUniqueInput: {
            email: 'e2etest@gmail.com',
          },
        },
        query: `mutation deleteUser($userWhereUniqueInput: UserWhereUniqueInput!) {
          deleteUser(userWhereUniqueInput: $userWhereUniqueInput) {
            firstName
          }
        }`,
      },
    });
  });
  it('submit a account creation request', () => {
    //window.localStorage.removeItem('refreshToken');
    cy.visit('/request-account');
    cy.location('pathname').should('include', '/request-account');
    cy.get('[formcontrolname="firstName"]').type('e2e');
    cy.get('[formcontrolname="lastName"]').type('test');
    cy.get('[formcontrolname="email"]').type('e2etest@gmail.com');
    cy.contains('span', 'Select Grade')
      .click()
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('[formcontrolname="permissions"]')
      .click()
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.contains('span', 'Unit')
      .click()
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('[formcontrolname="password"]').type('thisISaREALLYgreatPA$$word!3');
    cy.get('[formcontrolname="confirmPassword"]')
      .type('thisISaREALLYgreatPA$$word!3')
      .wait('@graphql');
    cy.get('button').contains('Submit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });
  it('should accept a new account', () => {
    cy.visit('/login');
    cy.get('[formcontrolname="userEmail"]').type('admin@admin.com');
    cy.get('[formcontrolname="userPassword"]').type('admin');
    cy.get('odst-login').find('button').contains('Sign In').click();
    cy.location('pathname').should('include', '/dashboard');
    cy.visit('/requested-accounts');
    cy.location('pathname').should('include', '/requested-accounts');
    cy.reload(true);
    cy.contains('td', 'e2e').click().wait('@graphql');
    cy.contains('label', 'First Name: e2e').wait('@graphql');
    cy.contains('button', 'Accept').click();
    cy.contains('td', 'e2e').should('not.exist');
  });
});
