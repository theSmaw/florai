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

  describe('Pricing section', () => {
    beforeEach(() => {
      cy.visitFlowerDetail('1');
    });

    it('displays the wholesale price', () => {
      cy.contains('Wholesale').should('be.visible');
      cy.contains('$4.50').should('be.visible');
    });
  });

  describe('Sourcing section', () => {
    beforeEach(() => {
      cy.visitFlowerDetail('1');
    });

    it('displays the supplier', () => {
      cy.contains('Holland Flowers').should('be.visible');
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

    it('does not show the Pairs Well With section when there are no complementary flowers', () => {
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
        }));
        cy.intercept('GET', '**/rest/v1/flowers*', rows).as('getFlowersNoComplement');
      });
      cy.visitWithFakeAuth('/catalogue/1');
      cy.wait('@getFlowersNoComplement');
      cy.contains('Pairs Well With').should('not.exist');
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

  describe('Price editing', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/user_flower_overrides**', { statusCode: 200, body: {} }).as(
        'savePrices',
      );
      cy.visitFlowerDetail('1');
    });

    it('opens price edit mode when edit button is clicked', () => {
      cy.get('[data-cy="edit-prices-button"]').click();
      cy.get('[data-cy="wholesale-price-input"]').should('be.visible');
    });

    it('saves updated wholesale price and displays new value', () => {
      cy.get('[data-cy="edit-prices-button"]').click();
      cy.get('[data-cy="wholesale-price-input"]').clear().type('6.00');
      cy.get('[data-cy="save-prices-button"]').click();
      cy.get('[data-cy="wholesale-price-value"]').should('contain.text', '$6.00');
    });

    it('cancel edit restores original values without saving', () => {
      cy.get('[data-cy="edit-prices-button"]').click();
      cy.get('[data-cy="wholesale-price-input"]').clear().type('99.99');
      cy.get('[data-cy="cancel-price-edit-button"]').click();
      cy.get('[data-cy="wholesale-price-value"]').should('contain.text', '$4.50');
      cy.get('[data-cy="edit-prices-button"]').should('be.visible');
    });
  });
});
