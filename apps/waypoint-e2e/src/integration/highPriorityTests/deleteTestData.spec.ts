let accessToken = '';

it('will sign someone in', function () {
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
    accessToken = response.body.data.login.accessToken;
    //cy.log(response.body.data.login.accessToken);
    cy.log(accessToken);
    //cy.wrap(response.body.data.login.accesstoken).as('accessToken');
    //cy.log(this["accessToken"]);
  });
});

// to prove we have a session

it('deletes an org', () => {
  const authorization = `bearer ${ accessToken }`;
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/graphql',
    form: true,
    headers: {
      authorization,
    },   
    body: {
      operationName: 'removeOrg',
      variables: {
        orgWhereUniqueInput: {
          name: '552 FakeOrg',
        },
      },
      query: `
        mutation removeOrg($orgWhereUniqueInput: OrgWhereUniqueInput!) {
          removeOrg(orgWhereUniqueInput: $orgWhereUniqueInput) {
            name
          }
        }
      `,
    },
  });
});

it('deletes a person', () => {
  const authorization = `bearer ${ accessToken }`;
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/graphql',
    form: true,
    headers: {
      authorization,
    },   
    body: {
      operationName: 'deletePerson',
      variables: {
        personWhereUniqueInput: {
          email: 'me@home.com',
        },
      },
      query: `
        mutation deletePerson($personWhereUniqueInput: PersonWhereUniqueInput!) {
          deletePerson(personWhereUniqueInput: $personWhereUniqueInput) {
            id
          }
        }
      `,
    },
  });
});
