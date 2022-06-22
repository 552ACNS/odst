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
    cy.location('pathname').should('include', '/feedback').wait('@graphql');
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

  it('Verify that only people with correct permission can view and resolve a specific feedback', () => {
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
    //selects the action tag selector
    cy.get('#mat-chip-list-input-1').type('Add');
    cy.get('span').contains('Addressed in organizational all-call').click();
    cy.get('mat-chip').contains('Addressed in organizational all-call');
    cy.get('button').contains('Submit').click();
    //Marks the issue as resolved
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
    cy.get('mat-chip').contains('Addressed in organizational all-call');
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

  it('should test for tag functionality', () => {
    cy.login('keven.coyle@us.af.mil', 'admin');
    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');
    cy.get('#mat-chip-list-input-1').type('Rout');
    cy.get('span').contains('Routed up the chain of command').click();
    cy.get('mat-chip').contains('Routed up the chain of command');
    cy.get('mat-icon').contains('cancel').click();
    cy.get('mat-chip').should('not.exist');
  });
});
