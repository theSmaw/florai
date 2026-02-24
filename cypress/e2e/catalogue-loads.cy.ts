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
    // Cannot use cy.visitCatalogue() here — that command waits for the loading
    // indicator to disappear, which would defeat the purpose of this test.
    cy.intercept('GET', '/api/flowers', (req) => {
      req.reply((res) => {
        res.setDelay(500);
        res.send({ fixture: 'flowers.json' });
      });
    }).as('getFlowersDelayed');

    cy.visit('/#/catalogue');
    cy.get('[data-cy="loading-indicator"]').should('be.visible');
    cy.wait('@getFlowersDelayed');
    cy.get('[data-cy="loading-indicator"]').should('not.exist');
  });
});
