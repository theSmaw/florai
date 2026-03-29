describe('Suppliers', () => {
  beforeEach(() => {
    cy.stubFlowers();
    cy.visitSuppliers();
  });

  it('renders supplier cards from fixture data', () => {
    cy.get('[data-cy="supplier-card"]').should('have.length', 3);
    cy.get('[data-cy="supplier-card"]').first().should('contain.text', 'Bloom & Co');
    cy.get('[data-cy="supplier-card"]').last().should('contain.text', 'Petal Paradise');
  });

  it('shows the page title', () => {
    cy.get('[data-cy="page-title"]').should('contain.text', 'Suppliers');
  });

  it('opens the add modal when Add Supplier card is clicked', () => {
    cy.get('[data-cy="add-supplier-card"]').click();
    cy.get('[data-cy="supplier-name-input"]').should('be.visible');
    cy.get('[data-cy="supplier-name-input"]').should('have.value', '');
  });

  it('disables Save when name is empty', () => {
    cy.get('[data-cy="add-supplier-card"]').click();
    cy.get('[data-cy="supplier-modal-save"]').should('be.disabled');
  });

  it('enables Save when name is filled and intercepts POST on save', () => {
    cy.intercept('POST', '**/rest/v1/suppliers*', {
      body: {
        id: 'sup-new',
        user_id: '00000000-0000-0000-0000-000000000001',
        name: 'New Supplier',
        emails: [],
        phones: [],
        website: null,
        address: null,
        contact_person: null,
        payment_terms: null,
        notes: null,
        created_at: '2026-03-01T00:00:00Z',
      },
      statusCode: 201,
    }).as('createSupplier');

    cy.get('[data-cy="add-supplier-card"]').click();
    cy.get('[data-cy="supplier-name-input"]').type('New Supplier');
    cy.get('[data-cy="supplier-modal-save"]').should('not.be.disabled');
    cy.get('[data-cy="supplier-modal-save"]').click();
    cy.wait('@createSupplier');
  });

  it('opens the edit modal pre-filled when Edit is clicked', () => {
    cy.get('[data-cy="edit-supplier-button"]').first().click();
    cy.get('[data-cy="supplier-name-input"]').should('not.have.value', '');
  });

  it('intercepts PATCH on edit save', () => {
    cy.intercept('PATCH', '**/rest/v1/suppliers*', {
      body: {
        id: 'sup-1',
        user_id: '00000000-0000-0000-0000-000000000001',
        name: 'Holland Flowers Updated',
        emails: ['info@holland.com'],
        phones: ['+31 20 000 0000'],
        website: 'https://holland-flowers.com',
        address: '123 Tulip Lane, Amsterdam',
        contact_person: 'Jan de Vries',
        payment_terms: 'Net 30',
        notes: 'Primary wholesale supplier',
        created_at: '2024-01-01T00:00:00Z',
      },
      statusCode: 200,
    }).as('updateSupplier');

    cy.get('[data-cy="edit-supplier-button"]').eq(1).click();
    cy.get('[data-cy="supplier-name-input"]').clear().type('Holland Flowers Updated');
    cy.get('[data-cy="supplier-modal-save"]').click();
    cy.wait('@updateSupplier');
  });

  it('shows delete confirm on trash click', () => {
    cy.get('[data-cy="delete-supplier-button"]').first().click();
    cy.get('[data-cy="delete-confirm-question"]').should('be.visible');
  });

  it('dismisses delete confirm on Cancel', () => {
    cy.get('[data-cy="delete-supplier-button"]').first().click();
    cy.get('[data-cy="delete-confirm-question"]').should('be.visible');
    cy.get('[data-cy="delete-cancel-button"]').click();
    cy.get('[data-cy="delete-confirm-question"]').should('not.exist');
  });

  it('fires DELETE request on Confirm', () => {
    cy.intercept('DELETE', '**/rest/v1/suppliers*', {
      body: [],
      statusCode: 204,
    }).as('deleteSupplier');

    cy.get('[data-cy="delete-supplier-button"]').first().click();
    cy.get('[data-cy="delete-confirm-button"]').click();
    cy.wait('@deleteSupplier');
  });

  it('shows empty state when no suppliers', () => {
    cy.intercept('GET', '**/rest/v1/suppliers*', { body: [], statusCode: 200 }).as('getSuppliersEmpty');
    cy.visitWithFakeAuth('/suppliers');
    cy.wait('@getSuppliersEmpty');
    cy.get('[data-cy="suppliers-empty"]').should('be.visible');
  });
});
