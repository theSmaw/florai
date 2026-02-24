describe('Catalogue loads', () => {
  beforeEach(() => {
    cy.stubFlowers();
  });

  it('shows the flower list after load', () => {
    cy.visitCatalogue();
    cy.get('[data-cy="flower-list"]').should('be.visible');
  });

  it('renders 6 flower cards', () => {
    cy.visitCatalogue();
    cy.get('[data-cy="flower-card"]').should('have.length', 6);
  });

  it('shows a loading indicator while fetching', () => {
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
