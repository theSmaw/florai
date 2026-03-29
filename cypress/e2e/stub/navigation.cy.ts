describe('Navigation', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('opens the hamburger menu', () => {
    cy.get('[data-cy="hamburger-menu-trigger"]').click();
    cy.get('[data-cy="nav-catalogue"]').should('be.visible');
    cy.get('[data-cy="nav-arrangements"]').should('be.visible');
    cy.get('[data-cy="nav-weddings"]').should('be.visible');
    cy.get('[data-cy="nav-suppliers"]').should('be.visible');
  });

  it('navigates to the Arrangements page', () => {
    cy.stubArrangements();
    cy.navigateTo('arrangements');
    cy.get('[data-cy="arrangements-view"]').should('be.visible');
    cy.get('[data-cy="page-title"]').should('contain.text', 'Arrangements');
  });

  it('navigates to the Weddings page', () => {
    cy.navigateTo('weddings');
    cy.get('[data-cy="weddings-view"]').should('be.visible');
    cy.get('[data-cy="page-title"]').should('contain.text', 'Weddings');
  });

  it('navigates to the Suppliers page', () => {
    cy.stubSuppliers();
    cy.navigateTo('suppliers');
    cy.get('[data-cy="suppliers-view"]').should('be.visible');
    cy.get('[data-cy="page-title"]').should('contain.text', 'Suppliers');
  });

  it('navigates back to Catalogue from another page', () => {
    cy.stubArrangements();
    cy.navigateTo('arrangements');
    cy.get('[data-cy="arrangements-view"]').should('be.visible');
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
