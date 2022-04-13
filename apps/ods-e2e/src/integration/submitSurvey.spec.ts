import { timeout } from 'rxjs';

describe('ods', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('graphql');
  });
  before(() => {
    //   cy.visit('/login');
    //   cy.get('[formcontrolname="userUsername"]').type('admin');
    //   cy.get('[formcontrolname="userPassword"]').type('admin');
    //   cy.get('odst-login').find('button').contains('Sign In').click();
    //   cy.location('pathname').should('include', '/home');
  });
  it('should submit a new report', () => {
    cy.visit('/disclaimer');
    cy.location('pathname').should('include', '/disclaimer');
    cy.get('odst-disclaimer').find('button').contains('Accept').click();
    cy.location('pathname').should('include', '/survey');

    // cy.get('[formcontrolname="eventOrg"]').select('#mat-option-1')

    // select the write option and press enter
    // cy.get('mat-select[formControlName=eventOrg]').click().first().click();
    // cy.get('[formcontrolname="eventOrg"]').focus().click();

    cy.contains('span', 'Organization').click();

    // cy.wait(2000);
    // wait for the graphql response to finish first
    cy.wait('@graphql');

    // select the first option
    cy.get('mat-option').first().click();

    // cy.contains('552 ACNS').click({ force: true });

    // cy.get('mat-option')

    // cy.get('[formcontrolname="event"]').type('e2e Test');
    // cy.get('#mat-radio-3').click();
    // cy.get('[formcontrolname="CC')
    //   .click()
    //   .get('mat-option')
    //   .contains('Matos, Emmanuel Lt. Col.')
    //   .click();
    // cy.get('#mat-radio-8').click();
    // cy.get('[formcontrolname="impact"]').type('it made me cry');
    // cy.get('#btnSubmit').click();
    // cy.get('#submitCheck', { timeout: 10000 }).should('be.visible');
  });
});
