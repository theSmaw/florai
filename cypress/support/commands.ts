declare global {
  namespace Cypress {
    interface Chainable {
      stubFlowers(): Chainable<void>;
      stubUser(): Chainable<void>;
      visitCatalogue(): Chainable<void>;
      navigateTo(item: 'catalogue' | 'collection' | 'weddings'): Chainable<void>;
    }
  }
}

Cypress.Commands.add('stubFlowers', () => {
  cy.intercept('GET', '/api/flowers', { fixture: 'flowers.json' }).as('getFlowers');
});

Cypress.Commands.add('stubUser', () => {
  cy.intercept('GET', '/api/user', { name: 'Demo Florist', email: 'demo@florai.com' }).as(
    'getUser',
  );
});

Cypress.Commands.add('visitCatalogue', () => {
  cy.visit('/#/catalogue');
  cy.wait('@getFlowers');
  cy.get('[data-cy="loading-indicator"]').should('not.exist');
  cy.get('[data-cy="flower-list"]').should('be.visible');
});

Cypress.Commands.add('navigateTo', (item: 'catalogue' | 'collection' | 'weddings') => {
  cy.get('[data-cy="hamburger-menu-trigger"]').click();
  cy.get(`[data-cy="nav-${item}"]`).click();
});

export {};
