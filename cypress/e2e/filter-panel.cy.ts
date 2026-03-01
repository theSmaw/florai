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

  it('filters by season chip', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Peony (Spring) and Lavender (Spring)
    cy.get('[data-cy="flower-card"]').should('have.length', 2);
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'Spring');
  });

  it('deselects season chip when "All" is clicked', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 2);

    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="all"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 6);
  });

  it('filters by type chip', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="type-chip"][data-cy-value="Rose"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
    cy.get('[data-cy="flower-card-name"]').should('contain.text', 'Rose');
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'Rose');
  });

  it('filters by fragrance chip', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="fragrance-chip"][data-cy-value="strong"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Peony (strong) and Lavender (strong)
    cy.get('[data-cy="flower-card"]').should('have.length', 2);
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'Strong');
  });

  it('filters fragrance to "none" shows flowers with no fragrance', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="fragrance-chip"][data-cy-value="none"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Hydrangea, Calla Lily, Sunflower (fragranceLevel: "none")
    cy.get('[data-cy="flower-card"]').should('have.length', 3);
  });

  it('filters by toxicity chip', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="toxicity-chip"][data-cy-value="toxic"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Only Calla Lily is toxic
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
    cy.get('[data-cy="flower-card-name"]').should('contain.text', 'Calla Lily');
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'Toxic');
  });

  it('filters toxicity to "safe" shows safe flowers', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="toxicity-chip"][data-cy-value="safe"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Peony, Rose, Sunflower, Lavender (4 safe flowers)
    cy.get('[data-cy="flower-card"]').should('have.length', 4);
  });

  it('filters by stem length min range slider', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    // Set min stem length to 60 — only Rose (60), Sunflower (60), Calla Lily (70) qualify
    cy.get('[data-cy="stem-length-min"]').invoke('val', 60).trigger('change');
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 3);
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'cm');
  });

  it('filters by vase life max range slider', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    // Set max vase life to 7 — only Peony (7) and Calla Lily (7) qualify
    cy.get('[data-cy="vase-life-max"]').invoke('val', 7).trigger('change');
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 2);
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'days');
  });

  it('combines color and season filters', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="color-chip"][data-cy-color="pink"]').click(); // Peony
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click(); // Peony, Lavender
    cy.get('[data-cy="apply-filters-button"]').click();
    // Only Peony is both pink AND Spring
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
    cy.get('[data-cy="flower-card-name"]').should('contain.text', 'Peony');
    cy.get('[data-cy="filter-pill"]').should('have.length', 2);
  });

  it('combines fragrance and toxicity filters', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="fragrance-chip"][data-cy-value="strong"]').click();
    cy.get('[data-cy="toxicity-chip"][data-cy-value="safe"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Peony (strong, safe) and Lavender (strong, safe)
    cy.get('[data-cy="flower-card"]').should('have.length', 2);
    cy.get('[data-cy="filter-pill"]').should('have.length', 2);
  });

  it('combines season and availability filters', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="Summer"]').click();
    cy.get('[data-cy="availability-chip"][data-cy-value="seasonal"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Hydrangea (Summer, seasonal) and Sunflower (Summer, seasonal)
    cy.get('[data-cy="flower-card"]').should('have.length', 2);
  });

  it('filters by climate chip', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="climate-chip"][data-cy-value="temperate"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Peony (temperate) and Sunflower (temperate)
    cy.get('[data-cy="flower-card"]').should('have.length', 2);
    cy.get('[data-cy="filter-pill"]').should('contain.text', 'Temperate');
  });

  it('filters by subtropical climate', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="climate-chip"][data-cy-value="subtropical"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Rose (subtropical) and Calla Lily (subtropical)
    cy.get('[data-cy="flower-card"]').should('have.length', 2);
  });

  it('filters by mediterranean climate', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="climate-chip"][data-cy-value="mediterranean"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Hydrangea (mediterranean) and Lavender (mediterranean)
    cy.get('[data-cy="flower-card"]').should('have.length', 2);
  });

  it('deselects climate chip when "All" is clicked', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="climate-chip"][data-cy-value="temperate"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 2);

    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="climate-chip"][data-cy-value="all"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 6);
  });

  it('combines climate and season filters', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="climate-chip"][data-cy-value="temperate"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    // Peony is temperate AND Spring; Sunflower is temperate but Summer
    cy.get('[data-cy="flower-card"]').should('have.length', 1);
    cy.get('[data-cy="flower-card-name"]').should('contain.text', 'Peony');
  });

  it('clears a season filter by clicking its pill', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 2);

    cy.get('[data-cy="filter-pill"]').contains('Spring').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 6);
    cy.get('[data-cy="filter-pill"]').should('not.exist');
  });

  it('clears a color filter by clicking its pill', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="color-chip"][data-cy-color="pink"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 1);

    cy.get('[data-cy="filter-pill"]').contains('pink').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 6);
    cy.get('[data-cy="filter-pill"]').should('not.exist');
  });

  it('clears a type filter by clicking its pill', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="type-chip"][data-cy-value="Rose"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 1);

    cy.get('[data-cy="filter-pill"]').contains('Rose').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 6);
    cy.get('[data-cy="filter-pill"]').should('not.exist');
  });

  it('deselects a chip in the filter panel by clicking it again', () => {
    cy.get('[data-cy="filter-toggle-button"]').click();
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click();
    // Click again to deselect
    cy.get('[data-cy="season-chip"][data-cy-value="Spring"]').click();
    cy.get('[data-cy="apply-filters-button"]').click();
    cy.get('[data-cy="flower-card"]').should('have.length', 6);
    cy.get('[data-cy="filter-pill"]').should('not.exist');
  });
});
