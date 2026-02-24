describe('Search', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('filters cards by name (case-insensitive)', () => {
    cy.get('[data-cy="search-input"]').type('peony');
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
    cy.get('[data-cy="flower-card-name"]').should('contain.text', 'Peony');
  });

  it('filters cards by type', () => {
    cy.get('[data-cy="search-input"]').type('Rose');
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
    cy.get('[data-cy="flower-card-name"]').should('contain.text', 'Explorer Red Rose');
  });

  it('filters cards by notes', () => {
    cy.get('[data-cy="search-input"]').type('Fragrant');
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
    cy.get('[data-cy="flower-card-name"]').should('contain.text', 'English Lavender');
  });

  it('shows all cards after clearing the search', () => {
    cy.get('[data-cy="search-input"]').type('peony');
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
    cy.get('[data-cy="search-input"]').clear();
    cy.get('[data-cy="flower-card"]').should('have.length', 6);
  });

  it('shows a filter pill for the active search term', () => {
    cy.get('[data-cy="search-input"]').type('lavender');
    cy.get('[data-cy="active-filters"]').should('be.visible');
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'lavender');
  });
});
