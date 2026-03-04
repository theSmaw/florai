describe('Navigation', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('opens the hamburger menu', () => {
    cy.get('[data-cy="hamburger-menu-trigger"]').click();
    cy.get('[data-cy="nav-catalogue"]').should('be.visible');
    cy.get('[data-cy="nav-collection"]').should('be.visible');
    cy.get('[data-cy="nav-weddings"]').should('be.visible');
  });

  it('navigates to the Collection page', () => {
    cy.navigateTo('collection');
    cy.get('[data-cy="collection-view"]').should('be.visible');
    cy.get('[data-cy="page-title"]').should('contain.text', 'Collection');
  });

  it('navigates to the Weddings page', () => {
    cy.navigateTo('weddings');
    cy.get('[data-cy="weddings-view"]').should('be.visible');
    cy.get('[data-cy="page-title"]').should('contain.text', 'Weddings');
  });

  it('navigates back to Catalogue from another page', () => {
    cy.navigateTo('collection');
    cy.get('[data-cy="collection-view"]').should('be.visible');
    cy.navigateTo('catalogue');
    cy.get('[data-cy="catalogue-view"]').should('be.visible');
  });

  it('loads the catalogue view when navigating directly to /catalogue', () => {
    // The SPA does not re-fetch on same-route navigation, so we just assert
    // the view is visible — the stub + visit already happened in beforeEach.
    cy.visit('/catalogue');
    cy.get('[data-cy="catalogue-view"]').should('be.visible');
  });
});
