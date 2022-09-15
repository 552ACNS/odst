import { v4 as uuidv4 } from 'uuid';

describe('ods', () => {
  const feedbackResponseUUID = uuidv4();
  const commentUUID = uuidv4();
  let surveyID = '';

  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });
  it('submit a feedback with a unique uuid', () => {
    cy.visit('/disclaimer');
    cy.get('odst-disclaimer').find('button').contains('Accept').click();

    // Make sure you are on the feedback page
    cy.location('pathname').should('include', '/feedback');

    // Must wait here for all GQL queries to finish to preload everything
    cy.wait('@graphql');

    // Switching order of input to help ensure that all data is loaded before trying to access drop down
    cy.get('[formcontrolname="event"]').type('This is a UUID test');

    // My Spec is Active Duty
    cy.get('[ng-reflect-name="person_spec"]>[value="AD"]').click();

    // Selects the mat selector that's call
    cy.get('[formcontrolname="eventOrg"]').click();

    // // Wait for the queries to load
    cy.wait('@graphql');

    // Select ACW
    cy.get('.mat-option-text').contains('552 ACW').click();

    // Gets the spec of the instigator as AD
    cy.get('[ng-reflect-name="violator_spec"]>[value="AD"]').click();

    // Gets the dropdown for the commander
    cy.get('[formcontrolname="CC"]').click();

    // Selects Col Coyle as the commander (this is a response for the wing)
    cy.get('.mat-option-text').contains('Coyle').click();

    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID);

    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
    //Grabs the value of the text from the card and sets it as surveyID
    cy.get('[class="flex justify-center font-bold"]').then(($txt) => {
      surveyID = $txt.text();
    });
  });

  it('Verify that users can track submitted surveys after a survey is submitted', () => {
    cy.visit('/response-lookup');
    cy.get('[formcontrolname="reportID"]').type(surveyID);
    cy.get('button').contains('Lookup ID').click();
    cy.wait('@graphql');
    cy.get('[class="ng-star-inserted"]').contains(
      'This feedback was submitted on',
      {
        timeout: 5000,
      }
    );
  });

  it('Verify that users will recieve a message when an invalid ID is submitted', () => {
    cy.visit('/response-lookup');
    cy.get('[formcontrolname="reportID"]').type('faultyID');
    cy.get('button').contains('Lookup ID').click();
    cy.wait('@graphql');
    cy.get('[class="mb-4 error-text text-center ng-star-inserted"]').contains(
      'An issue with the entered ID could not be found.'
    );
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
    cy.get('mat-card-content', { timeout: 5000 }).contains(
      feedbackResponseUUID
    );
  });

  it('should submit a comment on a response', () => {
    cy.login('keven.coyle@us.af.mil', 'admin');
    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');
    cy.get('textarea').type(commentUUID);
    cy.get('button').contains('Submit').click();
  });

  it('should mark an issue as resolved', () => {
    cy.login('keven.coyle@us.af.mil', 'admin');
    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');
    //selects the action tag selector
    cy.get('#mat-chip-list-input-1').type('Add');
    cy.get('span').contains('Addressed In Organizational All-call').click();
    cy.get('mat-chip').contains('Addressed In Organizational All-call');
    cy.scrollTo('bottom');
    //Marks the issue as resolved
    cy.get('mat-slide-toggle').click();
  });

  it('should verify a user can track when and how an issue was resolved', () => {
    cy.visit('/response-lookup');
    cy.get('[formcontrolname="reportID"]').type(surveyID);
    cy.get('button').contains('Lookup ID').click();
    cy.wait('@graphql');
    cy.get('[class="ng-star-inserted"]').contains('was resolved on', {
      timeout: 5000,
    });
    cy.get('p').contains('Addressed In Organizational All-call');
  });

  it('Verify that a comment was made and that the feedback was catagorized as resolved', () => {
    cy.login('keven.coyle@us.af.mil', 'admin');

    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Resolved').click();
    cy.location('pathname').should('include', '/responses');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('mat-card-content', { timeout: 5000 }).contains(
      feedbackResponseUUID
    );
    cy.get('mat-chip').contains('Addressed In Organizational All-call');
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
    cy.get('mat-card').contains('Resolved').click();
    cy.location('pathname').should('include', '/responses');
    cy.get('#mat-chip-list-input-1')
      .type('Routed Up The Chain Of Command{enter}')
      .wait('@graphql');
    cy.scrollTo('bottom');
    cy.get('mat-chip')
      .contains('Routed Up The Chain Of Command')
      .wait('@graphql');
    cy.get('mat-icon').contains('cancel').click();
    cy.get('mat-chip')
      .contains('Addressed In Organizational All-call')
      .should('not.exist');
  });
});
