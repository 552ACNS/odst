import { v4 as uuidv4 } from 'uuid';

describe('ods', () => {
  const uuid = uuidv4();
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });
  it('submit a survey with a unique uuid', () => {
    cy.visit('/disclaimer');
    cy.location('pathname').should('include', '/disclaimer');
    cy.get('odst-disclaimer').find('button').contains('Accept').click();
    cy.location('pathname').should('include', '/survey');
    cy.contains('span', 'Organization')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('[formcontrolname="event"]').type('e2e Test');
    cy.get('#mat-radio-5').click();
    cy.get('[formcontrolname="CC')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('#mat-radio-8').click();
    cy.get('[formcontrolname="impact"]').type(uuid);
    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });

  it('Verify that only people with correct permission can view a specific survey', () => {
    cy.visit('/login');
    cy.location('pathname').should('include', '/login');
    cy.get('[formcontrolname="userEmail"]').type('kenneth.voigt@us.af.mil');
    cy.get('[formcontrolname="userPassword"]').type('admin');
    cy.get('button').contains('Sign In').click();
    cy.location('pathname').should('include', '/dashboard');
    cy.get('#issuesCard').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses').wait('@graphql');

    cy.get('[aria-label="Last page"]').click();
    cy.get('mat-card-content').contains(uuid);
  });

  it("Verify that only people with wrong permission can't view a specific survey", () => {
    cy.visit('/login');
    cy.location('pathname').should('include', '/login');
    //Login with someone who has zero responses, of any type
    cy.get('[formcontrolname="userEmail"]').type(
      'henry.henderson.99@us.af.mil'
    );
    cy.get('[formcontrolname="userPassword"]').type('admin');
    cy.get('button').contains('Sign In').click();
    cy.location('pathname').should('include', '/dashboard');
    cy.get('#issuesCard').contains(0);
  });
});
