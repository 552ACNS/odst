it('will sign someone in', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/graphql', // baseUrl is prepend to URL
    form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    body: {
      operationName: 'login',
      variables: {
        loginUserInput: {
          username: 'admin',
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
    cy.log(response.body);
  });
});

// to prove we have a session

it('fetches all items', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/graphql',
    body: {
      operationName: 'findManyOrgs',
      query: `
        query findManyOrgs {
          findManyOrgs {
            id
          }
        }
      `,
    },
  });
});
