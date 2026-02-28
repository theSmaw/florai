describe('Flower card click', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('can click a flower card without error', () => {
    cy.get('[data-cy="flower-card"]').first().click();
    cy.get('[data-cy="catalogue-view"]').should('exist');
    cy.get('[data-cy="flower-card"]').should('have.length.greaterThan', 0);
  });

});
