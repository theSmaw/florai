describe('Flower card click', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('logs the flower ID when a card is clicked', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
    });
    cy.get('[data-cy="flower-card"]').first().click();
    cy.get('@consoleLog').should('be.calledWithMatch', /Selected flower:/);
  });

  it('does not propagate click when the more-btn is clicked', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
    });
    cy.get('[data-cy="flower-card-more-btn"]').first().click();
    // console.log for "Selected flower:" should not have been called
    cy.get('@consoleLog').should('not.be.calledWithMatch', /Selected flower:/);
  });
});
