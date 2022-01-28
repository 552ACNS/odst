import { getGreeting } from '../support/app.po';

describe('waypoint', () => {
  beforeEach(() => cy.visit('/'));

  it.only('should create a new person', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.get('[formcontrolname="personFirstName"]').type('FirstName')
    cy.get('[formcontrolname="personLastName"]').type('LastName')
    cy.get('[formcontrolname="personDoDIDNumber"]').type('0123456789')
    cy.get('[formcontrolname="personSSN"]').type('444339999')
    cy.get('[formcontrolname="personEmail"]').type('me@home.com')
    cy.get('[formcontrolname="personBirthCountry"]').type('USA')
    cy.get('[formcontrolname="personBirthCity"]').type('OKC')
    cy.get('[formcontrolname="personBirthState"]').click().get('mat-option').contains('OK').click();
    cy.get('[formcontrolname="personHairColor"]').click().get('mat-option').contains('BLONDE').click();
    cy.get('[formcontrolname="personEyeColor"]').click().get('mat-option').contains('HAZEL').click();
    cy.get('[formcontrolname="personSpec"]').click().get('mat-option').contains('OTHER').click();
    cy.get('[formcontrolname="personGrade"]').click().get('mat-option').contains('5').click();
    cy.get('[formcontrolname="personOrg"]').click().get('mat-option').contains('552 ACNS').click();
    cy.get('[formcontrolname="personHeight"]').type('68')
    cy.get('[formcontrolname="personBirthDate"]').type('2000-01-01')
    cy.get('odst-create-person').find('button').contains('Submit').click()


    //cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    //getGreeting().contains('Welcome to waypoint!');
  });

  it('should create a new org', () => {
    cy.get('[formcontrolname="orgName"]').type('552 ACNS')
    cy.get('[formcontrolname="orgTier"]').click().get('mat-option').contains('OTHER').click();
    cy.get('odst-create-org').find('button').click()
  })
});
