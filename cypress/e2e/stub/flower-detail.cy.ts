describe('Flower detail page', () => {
  beforeEach(() => {
    cy.stubFlowers();
  });

  describe('navigation', () => {
    it('can be reached by navigating directly to a flower URL', () => {
      cy.visitFlowerDetail('1');
      cy.get('[data-cy="flower-detail-view"]').should('be.visible');
    });

    it('can be reached by clicking a flower card in the catalogue', () => {
      cy.visitCatalogue();
      cy.get('[data-cy="flower-card"]').first().click();
      cy.get('[data-cy="flower-detail-view"]').should('be.visible');
    });

    it('back button returns to the catalogue', () => {
      cy.visitFlowerDetail('1');
      cy.get('[data-cy="back-button"]').click();
      cy.get('[data-cy="catalogue-view"]').should('be.visible');
      cy.url().should('include', '/catalogue');
      cy.url().should('not.match', /\/catalogue\/\d+/);
    });
  });

  describe('flower identity', () => {
    beforeEach(() => {
      cy.visitFlowerDetail('1');
    });

    it('displays the flower name', () => {
      cy.get('[data-cy="flower-name"]').should('contain.text', 'Peony Sarah Bernhardt');
    });

    it('displays the correct flower for a different ID', () => {
      cy.visitFlowerDetail('2');
      cy.get('[data-cy="flower-name"]').should('contain.text', 'Explorer Red Rose');
    });
  });

  describe('General section', () => {
    beforeEach(() => {
      cy.visitFlowerDetail('1');
    });

    it('displays the climate', () => {
      // Peony has climate: temperate
      cy.get('[data-cy="flower-climate"]').should('contain.text', 'Temperate');
    });

    it('displays the correct climate for a subtropical flower', () => {
      cy.visitFlowerDetail('2');
      // Rose has climate: subtropical
      cy.get('[data-cy="flower-climate"]').should('contain.text', 'Subtropical');
    });

    it('displays the correct climate for a mediterranean flower', () => {
      cy.visitFlowerDetail('3');
      // Hydrangea has climate: mediterranean
      cy.get('[data-cy="flower-climate"]').should('contain.text', 'Mediterranean');
    });
  });

  describe('complementary flowers', () => {
    it('displays complementary flowers when present', () => {
      // Peony (id 1) has complementaryFlowerIds: ["3", "6"] — Hydrangea and Lavender
      cy.visitFlowerDetail('1');
      cy.contains('Pairs Well With').should('be.visible');
      cy.contains('Blue Hydrangea').should('be.visible');
      cy.contains('English Lavender').should('be.visible');
    });

    it('clicking a complementary flower navigates to its detail page', () => {
      cy.visitFlowerDetail('1');
      // Peony (id 1) pairs with Blue Hydrangea (id 3) and English Lavender (id 6)
      cy.contains('Blue Hydrangea').click();
      cy.url().should('match', /\/catalogue\/3$/);
      cy.get('[data-cy="flower-name"]').should('contain.text', 'Blue Hydrangea');
    });

    it('back button shows the source flower name after navigating via a pairing', () => {
      cy.visitFlowerDetail('1');
      cy.contains('Blue Hydrangea').click();
      cy.get('[data-cy="back-button"]').should('contain.text', 'Peony Sarah Bernhardt');
    });

    it('back button shows Catalogue when arriving via direct URL', () => {
      cy.visitFlowerDetail('1');
      cy.get('[data-cy="back-button"]').should('contain.text', 'Catalogue');
    });

    it('shows the empty hint when there are no complementary flowers', () => {
      // This test needs a custom fixture variant (flower id=1 with no complementary
      // flower IDs), so it sets up its own intercept rather than using cy.stubFlowers().
      // The fixture is loaded, the first flower's complementary_flower_ids is zeroed out,
      // and the result is served as a static stub. The page is then visited directly
      // (not via cy.visitFlowerDetail) so we can wait on the custom alias instead.
      cy.fixture('flowers.json').then((flowers) => {
        const rows = flowers.map((f: Record<string, unknown>, i: number) => ({
          ...Object.fromEntries(
            Object.entries(f).map(([k, v]) => [
              k.replace(/([A-Z])/g, '_$1').toLowerCase(),
              v,
            ]),
          ),
          ...(i === 0 ? { complementary_flower_ids: [] } : {}),
          user_flower_overrides: [],
          flower_suppliers: [],
        }));
        cy.intercept('GET', '**/rest/v1/flowers*', rows).as('getFlowersNoComplement');
      });
      cy.visitWithFakeAuth('/catalogue/1');
      cy.wait('@getFlowersNoComplement');
      cy.contains('Pairs Well With').should('be.visible');
      cy.contains('No pairings added yet.').should('be.visible');
    });
  });

  describe('care instructions and notes', () => {
    beforeEach(() => {
      cy.visitFlowerDetail('1');
    });

    it('displays care instructions', () => {
      cy.contains('Botanical Care').should('be.visible');
      cy.contains('Keep in cool water, change daily').should('be.visible');
    });

    it('displays sourcing notes', () => {
      cy.contains('Sourcing Notes').should('be.visible');
      cy.contains('Beautiful full bloom, long lasting').should('be.visible');
    });
  });

  describe('Botanical Care editing', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/rest/v1/user_flower_overrides**', {
        statusCode: 200,
        body: {},
      }).as('saveCare');
      cy.visitFlowerDetail('1');
    });

    it('shows the Edit button', () => {
      cy.get('[data-cy="edit-care-button"]').should('be.visible');
    });

    it('clicking Edit shows textarea pre-filled with existing care text', () => {
      cy.get('[data-cy="edit-care-button"]').click();
      cy.get('[data-cy="care-instructions-textarea"]')
        .should('be.visible')
        .and('have.value', 'Keep in cool water, change daily');
    });

    it('typing and saving calls the intercept and shows updated text', () => {
      cy.get('[data-cy="edit-care-button"]').click();
      cy.get('[data-cy="care-instructions-textarea"]').clear().type('New care notes');
      cy.get('[data-cy="save-care-button"]').click();
      cy.wait('@saveCare');
      cy.get('[data-cy="care-instructions-textarea"]').should('not.exist');
      cy.contains('New care notes').should('be.visible');
    });

    it('clicking Cancel restores original text without saving', () => {
      cy.get('[data-cy="edit-care-button"]').click();
      cy.get('[data-cy="care-instructions-textarea"]').clear().type('Should not be saved');
      cy.get('[data-cy="cancel-care-button"]').click();
      cy.get('[data-cy="care-instructions-textarea"]').should('not.exist');
      cy.contains('Keep in cool water, change daily').should('be.visible');
      cy.get('@saveCare.all').should('have.length', 0);
    });
  });

  describe('Pairs Well With editing', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/rest/v1/user_flower_overrides**', {
        statusCode: 200,
        body: {},
      }).as('savePairings');
      cy.visitFlowerDetail('1');
    });

    it('shows the Edit button', () => {
      cy.get('[data-cy="edit-pairings-button"]').should('be.visible');
    });

    it('clicking Edit shows the current pairings with remove buttons', () => {
      cy.get('[data-cy="edit-pairings-button"]').click();
      cy.contains('Blue Hydrangea').should('be.visible');
      cy.contains('English Lavender').should('be.visible');
      cy.get('[data-cy="pairings-remove-button"]').should('have.length', 2);
    });

    it('removing a pairing removes it from the list', () => {
      cy.get('[data-cy="edit-pairings-button"]').click();
      cy.get('[data-cy="pairings-edit-list"]')
        .contains('Blue Hydrangea')
        .closest('li')
        .find('[data-cy="pairings-remove-button"]')
        .click();
      cy.get('[data-cy="pairings-edit-list"]').should('not.contain', 'Blue Hydrangea');
      cy.get('[data-cy="pairings-edit-list"]').should('contain', 'English Lavender');
    });

    it('add dropdown shows flowers not already in the list', () => {
      cy.get('[data-cy="edit-pairings-button"]').click();
      cy.get('[data-cy="pairings-add-select"] option').should('have.length.gt', 1);
      cy.get('[data-cy="pairings-add-select"] option').should('not.contain', 'Blue Hydrangea');
      cy.get('[data-cy="pairings-add-select"] option').should('not.contain', 'English Lavender');
    });

    it('selecting from the dropdown adds the flower to the list', () => {
      cy.get('[data-cy="edit-pairings-button"]').click();
      cy.get('[data-cy="pairings-add-select"]').select('Explorer Red Rose');
      cy.contains('Explorer Red Rose').should('be.visible');
    });

    it('saving calls the intercept', () => {
      cy.get('[data-cy="edit-pairings-button"]').click();
      cy.get('[data-cy="save-pairings-button"]').click();
      cy.wait('@savePairings');
      cy.get('[data-cy="pairings-add-select"]').should('not.exist');
    });

    it('cancelling restores the original pairings without saving', () => {
      cy.get('[data-cy="edit-pairings-button"]').click();
      cy.contains('Blue Hydrangea')
        .closest('li')
        .find('[data-cy="pairings-remove-button"]')
        .click();
      cy.get('[data-cy="cancel-pairings-button"]').click();
      cy.contains('Blue Hydrangea').should('be.visible');
      cy.get('@savePairings.all').should('have.length', 0);
    });
  });

  describe('Sourcing Notes editing', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/rest/v1/user_flower_overrides**', {
        statusCode: 200,
        body: {},
      }).as('saveNotes');
      cy.visitFlowerDetail('1');
    });

    it('shows the Edit button', () => {
      cy.get('[data-cy="edit-notes-button"]').should('be.visible');
    });

    it('clicking Edit shows textarea pre-filled with existing notes', () => {
      cy.get('[data-cy="edit-notes-button"]').click();
      cy.get('[data-cy="sourcing-notes-textarea"]')
        .should('be.visible')
        .and('have.value', 'Beautiful full bloom, long lasting');
    });

    it('typing and saving calls the intercept and shows updated text', () => {
      cy.get('[data-cy="edit-notes-button"]').click();
      cy.get('[data-cy="sourcing-notes-textarea"]').clear().type('New sourcing notes');
      cy.get('[data-cy="save-notes-button"]').click();
      cy.wait('@saveNotes');
      cy.get('[data-cy="sourcing-notes-textarea"]').should('not.exist');
      cy.contains('New sourcing notes').should('be.visible');
    });

    it('clicking Cancel restores original text without saving', () => {
      cy.get('[data-cy="edit-notes-button"]').click();
      cy.get('[data-cy="sourcing-notes-textarea"]').clear().type('Should not be saved');
      cy.get('[data-cy="cancel-notes-button"]').click();
      cy.get('[data-cy="sourcing-notes-textarea"]').should('not.exist');
      cy.contains('Beautiful full bloom, long lasting').should('be.visible');
      cy.get('@saveNotes.all').should('have.length', 0);
    });
  });

  describe('Supplier management', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/rest/v1/flower_suppliers**', {
        statusCode: 201,
        body: { id: 'new-supplier-id', name: 'Test Supplier', wholesale_price: 5.0 },
      }).as('addSupplier');
      cy.intercept('PATCH', '**/rest/v1/flower_suppliers**', {
        statusCode: 200,
        body: {},
      }).as('updateSupplier');
      cy.intercept('DELETE', '**/rest/v1/flower_suppliers**', {
        statusCode: 204,
        body: {},
      }).as('removeSupplier');
      cy.visitFlowerDetail('1');
    });

    it('shows the default hint when there are no suppliers', () => {
      // Peony: supplier = "Holland Flowers", wholesalePrice = 4.50
      cy.get('[data-cy="supplier-list"]').should('be.visible');
      cy.contains('Holland Flowers').should('be.visible');
      cy.contains('$4.50').should('be.visible');
    });

    it('shows the add supplier button', () => {
      cy.get('[data-cy="add-supplier-button"]').should('be.visible');
    });

    it('opens inline form when Add supplier is clicked', () => {
      cy.get('[data-cy="add-supplier-button"]').click();
      cy.get('[data-cy="supplier-name-input"]').should('be.visible');
      cy.get('[data-cy="supplier-price-input"]').should('be.visible');
      cy.get('[data-cy="save-supplier-button"]').should('be.visible');
      cy.get('[data-cy="cancel-supplier-button"]').should('be.visible');
    });

    it('adds a new supplier and shows it in the list', () => {
      cy.get('[data-cy="add-supplier-button"]').click();
      cy.get('[data-cy="supplier-name-input"]').type('Test Supplier');
      cy.get('[data-cy="supplier-price-input"]').type('5.00');
      cy.get('[data-cy="save-supplier-button"]').click();
      cy.wait('@addSupplier');
      cy.get('[data-cy="supplier-item"]').should('exist');
      cy.get('[data-cy="supplier-name"]').should('contain.text', 'Test Supplier');
    });

    it('cancel closes the form without saving', () => {
      cy.get('[data-cy="add-supplier-button"]').click();
      cy.get('[data-cy="supplier-name-input"]').type('Should Not Save');
      cy.get('[data-cy="cancel-supplier-button"]').click();
      cy.get('[data-cy="supplier-name-input"]').should('not.exist');
      cy.get('[data-cy="add-supplier-button"]').should('be.visible');
    });
  });
});
