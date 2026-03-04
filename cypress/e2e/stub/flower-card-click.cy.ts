describe('Flower card click', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('navigates to the flower detail page', () => {
    cy.get('[data-cy="flower-card"]').first().click();
    cy.get('[data-cy="flower-detail-view"]').should('be.visible');
    cy.url().should('match', /\/catalogue\/\d+/);
  });

  it('shows the correct flower on the detail page', () => {
    cy.get('[data-cy="flower-card"]').first().click();
    cy.get('[data-cy="flower-name"]').should('contain.text', 'Peony Sarah Bernhardt');
  });
});
