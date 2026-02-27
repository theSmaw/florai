describe('User Menu', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.stubUser();
    cy.visitCatalogue();
  });

  it('opens the user menu on trigger click', () => {
    cy.get('[data-cy="user-menu-trigger"]').click();
    cy.get('[data-cy="user-menu-profile"]').should('be.visible');
  });

  it('displays the user name and email from the API', () => {
    cy.get('[data-cy="user-menu-trigger"]').click();
    cy.contains('Demo Florist').should('be.visible');
    cy.contains('demo@florai.com').should('be.visible');
  });

  it('shows a View Profile menu item', () => {
    cy.get('[data-cy="user-menu-trigger"]').click();
    cy.get('[data-cy="user-menu-profile"]').should('contain.text', 'View Profile');
  });

  it('closes the menu on Escape', () => {
    cy.get('[data-cy="user-menu-trigger"]').click();
    cy.get('[data-cy="user-menu-profile"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-cy="user-menu-profile"]').should('not.exist');
  });

  it('closes the menu when clicking outside', () => {
    cy.get('[data-cy="user-menu-trigger"]').click();
    cy.get('[data-cy="user-menu-profile"]').should('be.visible');
    cy.get('[data-cy="catalogue-view"]').click({ force: true });
    cy.get('[data-cy="user-menu-profile"]').should('not.exist');
  });

  it('shows the user menu trigger on the Collection page', () => {
    cy.navigateTo('collection');
    cy.get('[data-cy="collection-view"]').should('be.visible');
    cy.get('[data-cy="user-menu-trigger"]').should('be.visible');
    cy.get('[data-cy="user-menu-trigger"]').click();
    cy.contains('Demo Florist').should('be.visible');
  });

  it('shows the user menu trigger on the Weddings page', () => {
    cy.navigateTo('weddings');
    cy.get('[data-cy="weddings-view"]').should('be.visible');
    cy.get('[data-cy="user-menu-trigger"]').should('be.visible');
    cy.get('[data-cy="user-menu-trigger"]').click();
    cy.contains('Demo Florist').should('be.visible');
  });
});
