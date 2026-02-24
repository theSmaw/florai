describe('Stock status', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('shows OUT OF STOCK badge for flowers with quantityOnHand = 0', () => {
    cy.get('[data-cy="out-of-stock-badge"]').should('have.length', 1);
    cy.get('[data-cy="out-of-stock-badge"]').should('contain.text', 'OUT OF STOCK');
  });

  it('shows STOCK: N badge for flowers with stock > 0', () => {
    cy.get('[data-cy="stock-badge"]').should('have.length', 6);
    // 5 in-stock cards have "STOCK: N" text (not the OOS one)
    cy.get('[data-cy="stock-badge"]').not(':has([data-cy="out-of-stock-badge"])')
      .each(($badge) => {
        cy.wrap($badge).should('contain.text', 'STOCK:');
      });
  });

  it('has the correct count of in-stock vs out-of-stock cards', () => {
    cy.get('[data-cy="out-of-stock-badge"]').should('have.length', 1);
    cy.get('[data-cy="flower-card"]').should('have.length', 6);
  });
});
