describe('ods', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });

  it('should submit a new report', () => {
    cy.visit('/disclaimer');
    cy.location('pathname').should('include', '/disclaimer');
    cy.get('odst-disclaimer').find('button').contains('Accept').click();
    cy.location('pathname').should('include', '/feedback');

    cy.get('[formcontrolname="eventOrg"')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');

    cy.get('body').click('left');

    // Cypress sometimes doesn't close the overlay for the selector,
    // so you need to click outside the body
    cy.get('body').click('topLeft');

    cy.get('[formcontrolname="event"]').type('e2e Test');
    cy.get('#mat-radio-3').click();
    cy.get('[formcontrolname="CC"]')
      .click()
      .wait('@graphql')
      .focused()
      .click({ force: true })
      .type('{enter}');
    cy.get('#mat-radio-8').click();
    cy.get('[formcontrolname="impact"]').type(
      'negative impact on work environment'
    );
    cy.get('#btnSubmit').click();
    cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });
});
