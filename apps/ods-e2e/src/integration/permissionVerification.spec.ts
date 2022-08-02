import { v4 as uuidv4 } from 'uuid';

describe('ods', () => {
  const feedbackResponseUUID = uuidv4();
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

    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID);

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
    cy.get('.mat-option-text').contains('Henry').click();

    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID);

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
    cy.get('.mat-option-text').contains('Henderson').click();

    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID);

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

    cy.get('[formcontrolname="impact"]').type(feedbackResponseUUID);

    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });
});
