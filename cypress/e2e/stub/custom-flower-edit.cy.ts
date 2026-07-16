// Editing a user-created (custom) flower. Custom flowers live in the user_flowers
// table and are fully editable; every field persists through a PATCH to user_flowers.

const CUSTOM_ID = 'cf-1';

const customRow = (overrides: Record<string, unknown> = {}) => ({
  id: CUSTOM_ID,
  name: 'My Special Rose',
  image_url: null,
  colors: ['red'],
  type: 'Rose',
  wholesale_price: 3.5,
  supplier: 'My Grower',
  season: ['Summer'],
  availability: 'seasonal',
  climate: 'temperate',
  stem_length_cm: 40,
  fragrance_level: 'light',
  toxicity: 'safe',
  vase_life_days: 7,
  care_instructions: 'Keep cool',
  notes: 'Grown in my garden',
  complementary_flower_ids: [],
  ...overrides,
});

describe('Editing a custom flower', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.stubArrangements();
    // Override the empty user_flowers stub with a single custom flower.
    cy.intercept('GET', '**/rest/v1/user_flowers*', {
      body: [customRow()],
      statusCode: 200,
    }).as('getUserFlowers');
    cy.visitFlowerDetail(CUSTOM_ID);
  });

  it('shows edit buttons for the custom-only sections', () => {
    cy.get('[data-cy="edit-identity-button"]').should('be.visible');
    cy.get('[data-cy="edit-general-button"]').should('be.visible');
    cy.get('[data-cy="edit-sourcing-button"]').should('be.visible');
    cy.get('[data-cy="edit-physical-button"]').should('be.visible');
  });

  it('editing the name persists via PATCH to user_flowers', () => {
    cy.intercept('PATCH', '**/rest/v1/user_flowers*', {
      statusCode: 200,
      body: customRow({ name: 'My Renamed Rose' }),
    }).as('updateUserFlower');

    cy.get('[data-cy="edit-identity-button"]').click();
    cy.get('[data-cy="flower-name-input"]').clear().type('My Renamed Rose');
    cy.get('[data-cy="save-fields-button"]').click();
    cy.wait('@updateUserFlower');
    cy.get('[data-cy="flower-name"]').should('contain.text', 'My Renamed Rose');
  });

  it('editing the climate persists and updates the display', () => {
    cy.intercept('PATCH', '**/rest/v1/user_flowers*', {
      statusCode: 200,
      body: customRow({ climate: 'tropical' }),
    }).as('updateUserFlower');

    cy.get('[data-cy="edit-general-button"]').click();
    cy.get('[data-cy="flower-climate-select"]').select('tropical');
    cy.get('[data-cy="save-fields-button"]').click();
    cy.wait('@updateUserFlower');
    cy.get('[data-cy="flower-climate"]').should('contain.text', 'Tropical');
  });

  it('Cancel discards field edits without calling PATCH', () => {
    cy.intercept('PATCH', '**/rest/v1/user_flowers*').as('updateUserFlower');

    cy.get('[data-cy="edit-identity-button"]').click();
    cy.get('[data-cy="flower-name-input"]').clear().type('Discarded');
    cy.get('[data-cy="cancel-fields-button"]').click();
    cy.get('[data-cy="flower-name"]').should('contain.text', 'My Special Rose');
    cy.get('@updateUserFlower.all').should('have.length', 0);
  });
});

describe('Global catalogue flower is editable via per-user overrides', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.stubArrangements();
    cy.visitFlowerDetail('1');
  });

  it('shows field edit buttons on global flowers too', () => {
    cy.get('[data-cy="edit-identity-button"]').should('be.visible');
    cy.get('[data-cy="edit-general-button"]').should('be.visible');
    cy.get('[data-cy="edit-physical-button"]').should('be.visible');
    // The supplier list (global-only feature) is still present.
    cy.get('[data-cy="edit-sourcing-button"]').should('be.visible');
  });

  it('editing a physical attribute persists as an override', () => {
    cy.intercept('POST', '**/rest/v1/user_flower_overrides*', {
      statusCode: 201,
      body: {},
    }).as('saveOverride');

    cy.get('[data-cy="edit-physical-button"]').click();
    cy.get('[data-cy="flower-vase-life-input"]').clear().type('21');
    cy.get('[data-cy="save-fields-button"]').click();
    cy.wait('@saveOverride');
    cy.contains('21 days').should('be.visible');
  });

  it('Cancel discards field edits without calling the override endpoint', () => {
    cy.intercept('POST', '**/rest/v1/user_flower_overrides*').as('saveOverride');

    cy.get('[data-cy="edit-identity-button"]').click();
    cy.get('[data-cy="flower-name-input"]').clear().type('Renamed');
    cy.get('[data-cy="cancel-fields-button"]').click();
    cy.get('@saveOverride.all').should('have.length', 0);
  });
});
