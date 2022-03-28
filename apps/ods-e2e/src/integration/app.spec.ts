describe('ods', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('mat-card-title').contains(
      'Observations of Discrimination in the Squadron'
    );
  });
});
