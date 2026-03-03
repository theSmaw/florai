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

    it('displays the retail price', () => {
      cy.contains('Retail').should('be.visible');
      cy.contains('$8.99').should('be.visible');
    });
  });

  describe('Sourcing section', () => {
    beforeEach(() => {
      cy.visitFlowerDetail('1');
    });

    it('displays the supplier', () => {
      cy.contains('Holland Flowers').should('be.visible');
    });

    it('displays the origin', () => {
      cy.contains('Netherlands').should('be.visible');
    });

    it('displays the quantity on hand', () => {
      cy.contains('45').should('be.visible');
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
      cy.visit('/catalogue/1');
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
});
