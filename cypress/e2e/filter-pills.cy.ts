// Tests for the active-filter pills shown above the flower list in the catalogue.
// These pills appear after applying filters and each one clears its filter when clicked.

describe('Active filter pills (catalogue header)', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('shows a pill for the active season filter after applying', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();

    cy.get('[data-cy="filter-pill"]').should('have.length', 1);
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'Spring');
  });

  it('clears a season filter by clicking its pill above the catalogue', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 2);

    cy.get('[data-cy="filter-pill"]').contains('Spring').click();

    cy.get('[data-cy="flower-card"]').should('have.length', 6);
    cy.get('[data-cy="filter-pill"]').should('not.exist');
  });

  it('clears a color filter by clicking its pill above the catalogue', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="color-chip"][data-cy-color="pink"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 1);

    cy.get('[data-cy="filter-pill"]').contains('pink').click();

    cy.get('[data-cy="flower-card"]').should('have.length', 6);
    cy.get('[data-cy="filter-pill"]').should('not.exist');
  });

  it('clears a type filter by clicking its pill above the catalogue', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="type-chip"][data-cy-value="Rose"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 1);

    cy.get('[data-cy="filter-pill"]').contains('Rose').click();

    cy.get('[data-cy="flower-card"]').should('have.length', 6);
    cy.get('[data-cy="filter-pill"]').should('not.exist');
  });

  it('clears a climate filter by clicking its pill above the catalogue', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="climate-chip"][data-cy-value="temperate"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 2);

    cy.get('[data-cy="filter-pill"]').contains('Temperate').click();

    cy.get('[data-cy="flower-card"]').should('have.length', 6);
    cy.get('[data-cy="filter-pill"]').should('not.exist');
  });

  it('clears only its own filter when one of multiple pills is clicked', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="color-chip"][data-cy-color="pink"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="filter-pill"]').should('have.length', 2);
    cy.get('[data-cy="flower-card"]').should('have.length', 1);

    // Clear the season pill only — color filter should remain active
    cy.get('[data-cy="filter-pill"]').contains('Spring').click();

    cy.get('[data-cy="filter-pill"]').should('have.length', 1);
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'pink');
    // Peony is pink (no longer restricted by Spring)
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
  });
});
