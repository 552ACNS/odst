
describe('waypoint', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[formcontrolname="userUsername"]').type('admin');
    cy.get('[formcontrolname="userPassword"]').type('admin');
    cy.get('odst-login').find('button').contains('Sign In').click();
    cy.location('pathname').should('include', '/home');
  });
  // after(() => {
  //   cy.visit('/login');
  //   cy.get('[formcontrolname="userUsername"]').type('admin');
  //   cy.get('[formcontrolname="userPassword"]').type('admin');
  //   cy.get('odst-login').find('button').contains('Sign In').click();
  //   cy.location('pathname').should('include', '/home');
  // });

  //need to run this test before create person
  it('should create a new org', () => {
    cy.visit('/create-org');
    cy.get('[formcontrolname="orgName"]').type('552 ACNS');
    cy.get('[formcontrolname="orgTier"]')
      .click()
      .get('mat-option')
      .contains('OTHER')
      .click();
    cy.get('#btnOrgSubmit').click();
    // cy.get('#orgCheck', { timeout: 10000 }).should('be.visible');
  });

  it('should create a new person', () => {
    cy.visit('/create-person');
    cy.get('[formcontrolname="personFirstName"]').type('FirstName');
    cy.get('[formcontrolname="personLastName"]').type('LastName');
    cy.get('[formcontrolname="personDoDIDNumber"]').type('0123456789');
    cy.get('[formcontrolname="personSSN"]').type('444339999');
    cy.get('[formcontrolname="personEmail"]').type('me@home.com');
    cy.get('[name="next1"]').click();
    cy.get('[formcontrolname="personBirthCountry"]').type('USA');
    cy.get('[formcontrolname="personBirthCity"]').type('OKC');
    cy.get('[formcontrolname="personBirthState"]')
      .click()
      .get('mat-option')
      .contains('OK')
      .click();
    cy.get('[formcontrolname="personBirthDate"]').type('2000-01-01');
    cy.get('[name="next2"]').click();
    cy.get('[formcontrolname="personHairColor"]')
      .click()
      .get('mat-option')
      .contains('BLONDE')
      .click();
    cy.get('[formcontrolname="personEyeColor"]')
      .click()
      .get('mat-option')
      .contains('HAZEL')
      .click();
    cy.get('[formcontrolname="personSpec"]')
      .click()
      .get('mat-option')
      .contains('OTHER')
      .click();
    cy.get('[formcontrolname="personGrade"]')
      .click()
      .get('mat-option')
      .contains('5')
      .click();
    cy.get('[formcontrolname="personOrg"]')
      .click()
      .get('mat-option')
      .contains('Scorpion Developers')
      .click();
    cy.get('[formcontrolname="personHeight"]').type('68');
    cy.get('#btnPersonSubmit').click();
    // cy.get('#personCheck', { timeout: 10000 }).should('be.visible');
  });
});
