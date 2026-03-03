describe('Catalogue loads', () => {
  beforeEach(() => {
    cy.stubFlowers();
  });

  describe('after flowers have loaded', () => {
    beforeEach(() => {
      cy.visitCatalogue();
    });

    it('shows the flower list', () => {
      cy.get('[data-cy="flower-list"]').should('be.visible');
    });

    it('renders 6 flower cards', () => {
      cy.get('[data-cy="flower-card"]').should('have.length', 6);
    });
  });

  it('shows a loading indicator while fetching', () => {
    // Intercept with a delay to catch the loading state
    cy.fixture('flowers.json').then((flowers) => {
      const rows = flowers.map((f: Record<string, unknown>) => ({
        ...Object.fromEntries(
          Object.entries(f).map(([k, v]) => [
            k.replace(/([A-Z])/g, '_$1').toLowerCase(),
            v,
          ]),
        ),
        user_flower_overrides: [],
      }));

      cy.intercept('GET', '**/rest/v1/flowers*', (req) => {
        req.reply((res) => {
          res.setDelay(500);
          res.send(rows);
        });
      }).as('getFlowersDelayed');
    });

    cy.visit('/catalogue');
    cy.get('[data-cy="loading-indicator"]').should('be.visible');
    cy.wait('@getFlowersDelayed');
    cy.get('[data-cy="loading-indicator"]').should('not.exist');
  });
});
