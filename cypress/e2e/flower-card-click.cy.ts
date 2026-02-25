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

  it('does not propagate click when the more-btn is clicked', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
    });
    cy.get('[data-cy="flower-card-more-btn"]').first().click();
    // stopPropagation prevents card-level click from firing
    cy.get('@consoleLog').should('not.be.calledWithMatch', /Selected flower:/);
  });
});
