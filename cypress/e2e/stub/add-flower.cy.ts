describe('Add flower', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitCatalogue();
  });

  it('shows the add flower button in the catalogue header', () => {
    cy.get('[data-cy="add-flower-card"]').should('be.visible');
  });

  it('clicking the add button opens the modal', () => {
    cy.get('[data-cy="add-flower-card"]').click();
    cy.get('[data-cy="flower-name-input"]').should('be.visible');
    cy.get('[data-cy="flower-type-input"]').should('be.visible');
    cy.get('[data-cy="color-chips"]').should('be.visible');
  });

  it('save button is disabled when name, type, or colors are missing', () => {
    cy.get('[data-cy="add-flower-card"]').click();
    cy.get('[data-cy="save-flower-button"]').should('be.disabled');

    // Name only
    cy.get('[data-cy="flower-name-input"]').type('My Rose');
    cy.get('[data-cy="save-flower-button"]').should('be.disabled');

    // Name + type, still no color
    cy.get('[data-cy="flower-type-input"]').type('Rose');
    cy.get('[data-cy="save-flower-button"]').should('be.disabled');

    // Now select a color — button should enable
    cy.get('[data-cy="color-chip-pink"]').click();
    cy.get('[data-cy="save-flower-button"]').should('not.be.disabled');
  });

  it('clicking Save calls POST to user_flowers and modal closes', () => {
    cy.intercept('POST', '**/rest/v1/user_flowers*', {
      statusCode: 201,
      body: {
        id: 'uf-new-1',
        user_id: '00000000-0000-0000-0000-000000000001',
        name: 'My Custom Rose',
        colors: ['red'],
        type: 'Rose',
        image_url: null,
        wholesale_price: 0,
        supplier: '',
        season: [],
        availability: 'always',
        climate: 'temperate',
        stem_length_cm: null,
        fragrance_level: null,
        toxicity: null,
        vase_life_days: null,
        care_instructions: '',
        notes: '',
        complementary_flower_ids: [],
        created_at: '2026-03-12T10:00:00Z',
      },
    }).as('createUserFlower');

    cy.get('[data-cy="add-flower-card"]').click();
    cy.get('[data-cy="flower-name-input"]').type('My Custom Rose');
    cy.get('[data-cy="flower-type-input"]').type('Rose');
    cy.get('[data-cy="color-chip-red"]').click();
    cy.get('[data-cy="save-flower-button"]').click();
    cy.wait('@createUserFlower');
    cy.get('[data-cy="flower-name-input"]').should('not.exist');
  });

  it('Cancel dismisses the modal without saving', () => {
    cy.intercept('POST', '**/rest/v1/user_flowers*').as('createUserFlower');

    cy.get('[data-cy="add-flower-card"]').click();
    cy.get('[data-cy="flower-name-input"]').type('Should Not Save');
    cy.get('[data-cy="cancel-flower-button"]').click();
    cy.get('[data-cy="flower-name-input"]').should('not.exist');
    cy.get('@createUserFlower.all').should('have.length', 0);
  });
});
