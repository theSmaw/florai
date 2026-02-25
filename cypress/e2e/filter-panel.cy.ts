describe('Filter panel', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('opens when the Filter button is clicked', () => {
    cy.get('[data-cy="filter-panel"]').should('not.exist');
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="filter-panel"]').should('be.visible');
  });

  it('closes when the close button is clicked', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="filter-panel"]').should('be.visible');
    cy.get('[aria-label="Close filters"]').click();
    cy.get('[data-cy="filter-panel"]').should('not.exist');
  });

  it('closes when Escape is pressed', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="filter-panel"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-cy="filter-panel"]').should('not.exist');
  });

  it('groups cards by type when the type groupBy chip is selected', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="groupby-chip"][data-cy-value="type"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="group-title"]').should('have.length.greaterThan', 1);
    cy.get('[data-cy="group-title"]').first().should('not.contain.text', 'All Flowers');
  });

  it('groups cards by color when the color groupBy chip is selected', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="groupby-chip"][data-cy-value="color"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="group-title"]').should('have.length.greaterThan', 1);
  });

  it('filters by color chip', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="color-chip"][data-cy-color="pink"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
    cy.get('[data-cy="flower-card-name"]').should('contain.text', 'Peony');
  });
});
