describe('User Menu', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('opens the user menu on trigger click', () => {
    cy.get('[data-cy="user-menu-trigger"]').click();
    cy.get('[data-cy="user-menu-profile"]').should('be.visible');
  });

  it('shows a View Profile menu item', () => {
    cy.get('[data-cy="user-menu-trigger"]').click();
    cy.get('[data-cy="user-menu-profile"]').should('contain.text', 'View profile');
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

  it('shows the user menu trigger on the Arrangements page', () => {
    cy.stubArrangements();
    cy.navigateTo('arrangements');
    cy.get('[data-cy="arrangements-view"]').should('be.visible');
    cy.get('[data-cy="user-menu-trigger"]').should('be.visible');
  });

  it('shows the user menu trigger on the Weddings page', () => {
    cy.navigateTo('weddings');
    cy.get('[data-cy="weddings-view"]').should('be.visible');
    cy.get('[data-cy="user-menu-trigger"]').should('be.visible');
  });
});
