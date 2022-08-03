import { v4 as uuidv4 } from 'uuid';

describe('ods', () => {
  const feedbackResponseUUID1 = uuidv4();
  const feedbackResponseUUID2 = uuidv4();
  const feedbackResponseUUID3 = uuidv4();
  const feedbackResponseUUID4 = uuidv4();
  //const commentUUID = uuidv4();
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });
  it('submit a feedback for ACNS with a unique uuid', () => {
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
    cy.get('.mat-option-text').contains('552 ACNS').click();

    // Gets the spec of the instigator as AD
    cy.get('[ng-reflect-name="violator_spec"]>[value="AD"]').click();

    // Gets the dropdown for the commander
    cy.get('[formcontrolname="CC"]').click();

    // Selects Col Coyle as the commander (this is a response for the wing)
    cy.get('.mat-option-text').contains('Matos').click();

    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID1);

    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });
  it('submit a feedback for OSS with a unique uuid', () => {
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
    cy.get('.mat-option-text').contains('752 OSS').click();

    // Gets the spec of the instigator as AD
    cy.get('[ng-reflect-name="violator_spec"]>[value="AD"]').click();

    // Gets the dropdown for the commander
    cy.get('[formcontrolname="CC"]').click();

    // Selects Col Coyle as the commander (this is a response for the wing)
    cy.get('.mat-option-text').contains('Henderson').click();

    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID2);

    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });

  it('submit a feedback for MXS with a unique uuid', () => {
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
    cy.get('.mat-option-text').contains('552 MXS').click();

    // Gets the spec of the instigator as AD
    cy.get('[ng-reflect-name="violator_spec"]>[value="AD"]').click();

    // Gets the dropdown for the commander
    cy.get('[formcontrolname="CC"]').click();

    // Selects Col Coyle as the commander (this is a response for the wing)
    cy.get('.mat-option-text').contains('Henry').click();

    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID3);

    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });

  it('submit a feedback for ACG with a unique uuid', () => {
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
    cy.get('.mat-option-text').contains('552 ACG').click();

    // Gets the spec of the instigator as AD
    cy.get('[ng-reflect-name="violator_spec"]>[value="AD"]').click();

    // Gets the dropdown for the commander
    cy.get('[formcontrolname="CC"]').click();

    // Selects Col Coyle as the commander (this is a response for the wing)
    cy.get('.mat-option-text').contains('Voigt').click();

    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID4);

    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });

  it('Verify that ACW CC can view all feedback', () => {
    cy.login('keven.coyle@us.af.mil', 'admin');

    cy.location('pathname').should('include', '/dashboard');
    cy.get('mat-card').contains('Unresolved').click();
    cy.location('pathname').should('include', '/responses');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    //check if ACW CC can view the fourth created feedback
    cy.get('mat-card-content', { timeout: 5000 }).contains(
      feedbackResponseUUID4
    );
    //move to the third feedback and check
    cy.get('.mat-paginator-navigation-next').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('mat-card-content', { timeout: 5000 }).contains(
      feedbackResponseUUID3
    );
    //move to the second feedback and check
    cy.get('.mat-paginator-navigation-next').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('mat-card-content', { timeout: 5000 }).contains(
      feedbackResponseUUID2
    );
    //move to the first feedback and check
    cy.get('.mat-paginator-navigation-next').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('mat-card-content', { timeout: 5000 }).contains(
      feedbackResponseUUID1
    );
  });
});
