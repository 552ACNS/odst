import { v4 as uuidv4 } from 'uuid';

describe('ods', () => {
  const feedbackResponseUUID = uuidv4();
  const commentUUID = uuidv4();
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });
  it('submit a feedback with a unique uuid', () => {
    cy.visit('/disclaimer');
    cy.location('pathname').should('include', '/disclaimer');
    cy.get('odst-disclaimer').find('button').contains('Accept').click();
    cy.location('pathname').should('include', '/feedback');

    cy.contains('span', 'Organization')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');

    // Cypress sometimes doesn't close the overlay for the selector,
    // so you need to click outside the body
    cy.get('body').click('topLeft');

    cy.get('[formcontrolname="event"]').type('e2e Test');
    cy.get('#mat-radio-5').click();
    cy.get('[formcontrolname="CC')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('#mat-radio-8').click();
    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID);
    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });

  it("Verify that only people with wrong permission can't view a specific feedback", () => {
    cy.login('henry.henderson.99@us.af.mil', 'admin');

    cy.location('pathname').should('include', '/dashboard');
    if (cy.get('mat-card').contains('Unresolved').click())
      cy.location('pathname').then((x) => {
        if (x.includes('/responses')) {
          cy.get('mat-card-content').should('not.' + feedbackResponseUUID);
        }
      });
  });

  it('Verify that only people with correct permission can view a specific feedback', () => {
    cy.login('keven.coyle@us.af.mil', 'admin');

    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.scrollTo('bottom');
    cy.get('mat-card-content', { timeout: 5000 }).contains(
      feedbackResponseUUID
    );
    cy.scrollTo('top');
    cy.get('textarea').type(commentUUID);
    cy.get('button').contains('Submit').click();
    cy.get('mat-slide-toggle').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('button').contains('Back').click();
  });

  it('Verify that a comment was made and that the feedback was catagorized as resolved', () => {
    cy.login('keven.coyle@us.af.mil', 'admin');

    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Resolved').click();
    cy.location('pathname').should('include', '/responses');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.scrollTo('bottom');
    cy.get('mat-card-content', { timeout: 5000 }).contains(
      feedbackResponseUUID
    );
    cy.scrollTo('top');
    cy.get('mat-card-content').contains(commentUUID);
  });

  it("Verify that only people with wrong permission can't view a specific resolved feedback", () => {
    cy.login('henry.henderson.99@us.af.mil', 'admin');

    cy.location('pathname').should('include', '/dashboard');
    if (cy.get('mat-card').contains('Resolved').click())
      cy.location('pathname').then((x) => {
        if (x.includes('/responses')) {
          cy.get('mat-card-content').should('not.' + feedbackResponseUUID);
        }
      });
  });
});
