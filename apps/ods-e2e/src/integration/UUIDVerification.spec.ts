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
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('#cdk-overlay-0').should('not.be.visible', { timeout: 5000 });
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
    if (cy.get('mat-card').contains('Unresolved').click())
      cy.location('pathname').then((x) => {
        if (x.includes('/responses')) {
          cy.get('mat-card-content').should('not.' + uuid);
        }
      });
  });

  it('Verify that only people with correct permission can view a specific survey', () => {
    cy.visit('/login');
    cy.location('pathname').should('include', '/login');
    cy.get('[formcontrolname="userEmail"]').type('kenneth.voigt@us.af.mil');
    cy.get('[formcontrolname="userPassword"]').type('admin');
    cy.get('button').contains('Sign In').click();
    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get('mat-card-content', { timeout: 5000 }).contains(uuid);
    cy.get('textarea').type('This is a resolution');
    cy.get('button').contains('Submit').click();
  });

  it("Verify that only people with wrong permission can't view a specific resolved survey", () => {
    cy.visit('/login');
    cy.location('pathname').should('include', '/login');
    //Login with someone who has zero responses, of any type
    cy.get('[formcontrolname="userEmail"]').type(
      'henry.henderson.99@us.af.mil'
    );
    cy.get('[formcontrolname="userPassword"]').type('admin');
    cy.get('button').contains('Sign In').click();
    cy.location('pathname').should('include', '/dashboard');
    if (cy.get('mat-card').contains('Resolved').click())
      cy.location('pathname').then((x) => {
        if (x.includes('/responses')) {
          cy.get('mat-card-content').should('not.' + uuid);
        }
      });
  });
});
