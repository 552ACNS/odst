import { onNewUserLogin } from '../support/Common_functions/newUserLogin';

let accessToken = '';

beforeEach(() => {
  cy.intercept('POST', '**/graphql').as('graphql');
});

it('will sign someone in', function () {
  cy.request({
    method: 'POST',
    //TODO Don't hardcode this
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

it('deletes an org', () => {
  const authorization = `bearer ${accessToken}`;
  cy.request({
    method: 'POST',
    //TODO Don't hardcode this
    url: 'http://localhost:3343/graphql',
    form: true,
    headers: {
      authorization,
    },
    body: {
      operationName: 'deleteOrg',
      variables: {
        orgWhereUniqueInput: {
          name: '111 TESTORG',
        },
      },
      query: `mutation deleteOrg($orgWhereUniqueInput: OrgWhereUniqueInput!) {
        deleteOrg(orgWhereUniqueInput: $orgWhereUniqueInput) {
        name
        }
      }`,
    },
  });

  cy.request({
    method: 'POST',
    //TODO Don't hardcode this
    url: 'http://localhost:3343/graphql',
    form: true,
    headers: {
      authorization,
    },
    body: {
      operationName: 'deleteOrg',
      variables: {
        orgWhereUniqueInput: {
          name: '222 TESTORG',
        },
      },
      query: `mutation deleteOrg($orgWhereUniqueInput: OrgWhereUniqueInput!) {
        deleteOrg(orgWhereUniqueInput: $orgWhereUniqueInput) {
        name
        }
      }`,
    },
  });

  cy.request({
    method: 'POST',
    //TODO Don't hardcode this
    url: 'http://localhost:3343/graphql',
    form: true,
    headers: {
      authorization,
    },
    body: {
      operationName: 'deleteOrg',
      variables: {
        orgWhereUniqueInput: {
          name: '333 TESTORG',
        },
      },
      query: `mutation deleteOrg($orgWhereUniqueInput: OrgWhereUniqueInput!) {
        deleteOrg(orgWhereUniqueInput: $orgWhereUniqueInput) {
        name
        }
      }`,
    },
  });

  cy.request({
    method: 'POST',
    //TODO Don't hardcode this
    url: 'http://localhost:3343/graphql',
    form: true,
    headers: {
      authorization,
    },
    body: {
      operationName: 'deleteOrg',
      variables: {
        orgWhereUniqueInput: {
          name: '444 TESTORG',
        },
      },
      query: `mutation deleteOrg($orgWhereUniqueInput: OrgWhereUniqueInput!) {
        deleteOrg(orgWhereUniqueInput: $orgWhereUniqueInput) {
        name
        }
      }`,
    },
  });

  cy.request({
    method: 'POST',
    //TODO Don't hardcode this
    url: 'http://localhost:3343/graphql',
    form: true,
    headers: {
      authorization,
    },
    body: {
      operationName: 'deleteOrg',
      variables: {
        orgWhereUniqueInput: {
          name: '444 EDITORG',
        },
      },
      query: `mutation deleteOrg($orgWhereUniqueInput: OrgWhereUniqueInput!) {
        deleteOrg(orgWhereUniqueInput: $orgWhereUniqueInput) {
        name
        }
      }`,
    },
  });
});

it('Verify that a wing CC can create others type organizations and then successfully create an other type org', () => {
  onNewUserLogin.loginAndCreateOrg('emmanuel.matos@us.af.mil', 'admin');

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);

  cy.get('mat-select[formcontrolname="orgTier"]').click();
  cy.get('mat-option').contains('OTHER').click();

  cy.get('input[formcontrolname="orgName"]').type('444 TESTORG');
  cy.get('input[formcontrolname="confirmName"]').type('444 TESTORG');

  cy.get('mat-select[formcontrolname="parentOrg"]').click();
  cy.get('mat-option').contains('552 ACG').click();

  cy.get('#btnSubmit').click();
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);
  cy.get('p').contains('Your Unit has been successfully created!');
});

it('Verify that a group CC can create squadrons and others type organizations and then successfully create a squadron', () => {
  onNewUserLogin.loginAndCreateOrg('kenneth.voigt@us.af.mil', 'admin');

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);

  cy.get('mat-select[formcontrolname="orgTier"]').click();
  cy.get('mat-option').contains('OTHER');
  cy.get('mat-option').contains('SQUADRON').click();

  cy.get('input[formcontrolname="orgName"]').type('333 TESTORG');
  cy.get('input[formcontrolname="confirmName"]').type('333 TESTORG');

  cy.get('#btnSubmit').click();
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);
  cy.get('p').contains('Your Unit has been successfully created!');
});

it('Verify that a wing CC can create groups, squadrons, and others type organizations and then successfully create a group', () => {
  onNewUserLogin.loginAndCreateOrg('keven.coyle@us.af.mil', 'admin');

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);

  cy.get('mat-select[formcontrolname="orgTier"]').click();
  cy.get('mat-option').contains('OTHER');
  cy.get('mat-option').contains('SQUADRON');
  cy.get('mat-option').contains('GROUP').click();

  cy.get('input[formcontrolname="orgName"]').type('222 TESTORG');
  cy.get('input[formcontrolname="confirmName"]').type('222 TESTORG');

  cy.get('mat-select[formcontrolname="parentOrg"]').click();
  cy.get('mat-option').contains('N/A').click();

  cy.get('#childrenSelect').click();
  cy.get('mat-option').contains('333 TESTORG').click();

  cy.get('#btnSubmit').click();
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);
  cy.get('p').contains('Your Unit has been successfully created!');
});

it('Verify that an admin can create every type of organization and then successfully create a wing', () => {
  onNewUserLogin.loginAndCreateOrg('admin@admin.com', 'admin');

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);

  cy.get('mat-select[formcontrolname="orgTier"]').click();
  cy.get('mat-option').contains('OTHER');
  cy.get('mat-option').contains('SQUADRON');
  cy.get('mat-option').contains('GROUP');
  cy.get('mat-option').contains('WING').click();

  cy.get('input[formcontrolname="orgName"]').type('111 TESTORG');
  cy.get('input[formcontrolname="confirmName"]').type('111 TESTORG');

  cy.get('mat-select[formcontrolname="parentOrg"]').click();
  cy.get('mat-option').contains('N/A').click();

  cy.get('#btnSubmit').click();
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);
  cy.get('p').contains('Your Unit has been successfully created!');
});

it('Verify that a CC can edit an organizations name that they are a part of or an organization below them', () => {
  onNewUserLogin.loginAndEditOrg('kenneth.voigt@us.af.mil', 'admin');

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);

  cy.get('mat-select[formcontrolname="orgToEdit"]').click();
  cy.get('mat-option').contains('552 ACG');
  cy.get('mat-option').contains('444 TESTORG').click();

  cy.get('input[formcontrolname="orgName"]').type('444 EDITORG');
  cy.get('input[formcontrolname="confirmName"]').type('444 EDITORG');

  cy.get('#btnSubmit').click();
});

it('Verify that a CC can edit an organization children relationship that they are a part of or an organization below them', () => {
  onNewUserLogin.loginAndEditOrg('keven.coyle@us.af.mil', 'admin');

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);

  cy.get('mat-select[formcontrolname="orgToEdit"]').click();
  cy.get('mat-option').contains('552 ACW');
  cy.get('mat-option').contains('552 ACG').click();

  // ya its gross but it works
  cy.get('span')
    .contains('444 EDITORG')
    .parent()
    .parent()
    .parent()
    .within(() => {
      cy.get('button').click();
    });

  cy.get('#btnSubmit').click();
});
