describe('Arrangements page', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.stubArrangements();
  });

  describe('navigation', () => {
    it('loads at /arrangements via direct URL', () => {
      cy.visitArrangements();
      cy.get('[data-cy="arrangements-view"]').should('be.visible');
      cy.url().should('include', '/arrangements');
    });

    it('clicking an arrangement card navigates to its detail page', () => {
      cy.visitArrangements();
      cy.get('[data-cy="arrangement-card"]').first().click();
      cy.get('[data-cy="arrangement-detail-view"]').should('be.visible');
      cy.url().should('match', /\/arrangements\/a\d/);
    });

    it('back button from detail returns to /arrangements', () => {
      cy.visitArrangementDetail('a1');
      cy.get('[data-cy="back-button"]').click();
      cy.get('[data-cy="arrangements-view"]').should('be.visible');
      cy.url().should('match', /\/arrangements$/);
    });
  });

  describe('arrangement list', () => {
    beforeEach(() => {
      cy.visitArrangements();
    });

    it('displays arrangement names from fixture', () => {
      cy.contains('Spring Romance').should('be.visible');
      cy.contains('Wild Garden Posy').should('be.visible');
      cy.contains('Modern White Centerpiece').should('be.visible');
    });

    it('displays arrangement cards', () => {
      cy.get('[data-cy="arrangement-card"]').should('have.length', 3);
    });

    it('shows the add card at the end of the list', () => {
      cy.get('[data-cy="add-arrangement-card"]').should('be.visible');
      cy.get('[data-cy="arrangement-grid"]').within(() => {
        cy.get('[data-cy="arrangement-card"], [data-cy="add-arrangement-card"]').last()
          .should('have.attr', 'data-cy', 'add-arrangement-card');
      });
    });

    it('shows only the add card when no arrangements match search', () => {
      cy.get('[data-cy="arrangements-search-input"]').type('xyzxyzxyz');
      cy.get('[data-cy="arrangement-card"]').should('not.exist');
      cy.get('[data-cy="add-arrangement-card"]').should('be.visible');
    });
  });

  describe('filters', () => {
    beforeEach(() => {
      cy.visitArrangements();
    });

    it('search filters arrangements by name', () => {
      cy.get('[data-cy="arrangements-search-input"]').type('Spring');
      cy.get('[data-cy="arrangement-card"]').should('have.length', 1);
      cy.contains('Spring Romance').should('be.visible');
      cy.contains('Wild Garden Posy').should('not.exist');
    });

    it('clearing search restores full list', () => {
      cy.get('[data-cy="arrangements-search-input"]').type('Spring');
      cy.get('[data-cy="arrangement-card"]').should('have.length', 1);
      cy.get('[data-cy="arrangements-search-input"]').clear();
      cy.get('[data-cy="arrangement-card"]').should('have.length', 3);
    });

    it('filter button is visible', () => {
      cy.get('[data-cy="arrangements-filter-button"]').should('be.visible');
    });
  });

  describe('add arrangement', () => {
    beforeEach(() => {
      cy.visitArrangements();
    });

    it('shows add arrangement card', () => {
      cy.get('[data-cy="add-arrangement-card"]').should('be.visible');
    });

    it('clicking add button opens the add modal', () => {
      cy.get('[data-cy="add-arrangement-card"]').click();
      cy.get('[data-cy="arrangement-name-input"]').should('be.visible');
      cy.get('[data-cy="arrangement-size-select"]').should('be.visible');
    });

    it('filling name and size enables the save button', () => {
      cy.get('[data-cy="add-arrangement-card"]').click();
      cy.get('[data-cy="save-arrangement-button"]').should('be.disabled');
      cy.get('[data-cy="arrangement-name-input"]').type('Test Bouquet');
      cy.get('[data-cy="arrangement-size-select"]').select('medium');
      cy.get('[data-cy="save-arrangement-button"]').should('not.be.disabled');
    });

    it('clicking Save calls POST arrangements intercept', () => {
      cy.intercept('POST', '**/rest/v1/arrangements*', {
        statusCode: 201,
        body: {
          id: 'a-new',
          user_id: '00000000-0000-0000-0000-000000000001',
          name: 'Test Bouquet',
          flower_ids: [],
          size: 'medium',
          style: null,
          occasion: null,
          stem_count: null,
          estimated_weight_grams: null,
          time_to_build_minutes: null,
          vase_life_days: null,
          wholesale_cost: null,
          retail_price: null,
          description: null,
          notes: null,
          image_url: null,
          created_at: '2026-03-07T10:00:00Z',
        },
      }).as('createArrangement');

      cy.get('[data-cy="add-arrangement-card"]').click();
      cy.get('[data-cy="arrangement-name-input"]').type('Test Bouquet');
      cy.get('[data-cy="arrangement-size-select"]').select('medium');
      cy.get('[data-cy="save-arrangement-button"]').click();
      cy.wait('@createArrangement');
    });

    it('Cancel dismisses the modal without saving', () => {
      cy.intercept('POST', '**/rest/v1/arrangements*').as('createArrangement');

      cy.get('[data-cy="add-arrangement-card"]').click();
      cy.get('[data-cy="arrangement-name-input"]').type('Should Not Save');
      cy.get('[data-cy="cancel-arrangement-button"]').click();
      cy.get('[data-cy="arrangement-name-input"]').should('not.exist');
      cy.get('@createArrangement.all').should('have.length', 0);
    });
  });

  describe('detail page', () => {
    beforeEach(() => {
      cy.visitArrangementDetail('a1');
    });

    it('displays the arrangement name', () => {
      cy.get('[data-cy="arrangement-name"]').should('contain.text', 'Spring Romance');
    });

    it('shows the upload image button', () => {
      cy.get('[data-cy="upload-image-button"]').should('be.visible');
    });

    it('shows the notes edit button', () => {
      cy.get('[data-cy="edit-notes-button"]').should('be.visible');
    });

    it('shows notes content from fixture', () => {
      cy.contains('Perfect for spring weddings').should('be.visible');
    });

    it('clicking Edit notes shows textarea pre-filled', () => {
      cy.get('[data-cy="edit-notes-button"]').click();
      cy.get('[data-cy="notes-textarea"]')
        .should('be.visible')
        .and('have.value', 'Perfect for spring weddings');
    });

    it('typing and saving notes calls the PATCH intercept', () => {
      cy.intercept('PATCH', '**/rest/v1/arrangements*', {
        statusCode: 200,
        body: {},
      }).as('saveNotes');

      cy.get('[data-cy="edit-notes-button"]').click();
      cy.get('[data-cy="notes-textarea"]').clear().type('Updated notes');
      cy.get('[data-cy="save-notes-button"]').click();
      cy.wait('@saveNotes');
      cy.get('[data-cy="notes-textarea"]').should('not.exist');
      cy.contains('Updated notes').should('be.visible');
    });

    it('clicking Cancel notes restores original text without saving', () => {
      cy.intercept('PATCH', '**/rest/v1/arrangements*').as('saveNotes');

      cy.get('[data-cy="edit-notes-button"]').click();
      cy.get('[data-cy="notes-textarea"]').clear().type('Should not be saved');
      cy.get('[data-cy="cancel-notes-button"]').click();
      cy.get('[data-cy="notes-textarea"]').should('not.exist');
      cy.contains('Perfect for spring weddings').should('be.visible');
      cy.get('@saveNotes.all').should('have.length', 0);
    });

    it('shows the back button with Arrangements label when arriving directly', () => {
      cy.get('[data-cy="back-button"]').should('contain.text', 'Arrangements');
    });
  });
});
