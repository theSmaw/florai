declare global {
  namespace Cypress {
    interface Chainable {
      stubFlowers(): Chainable<void>;
      visitCatalogue(): Chainable<void>;
      visitFlowerDetail(flowerId: string): Chainable<void>;
      visitWithFakeAuth(url: string): Chainable<void>;
      navigateTo(item: 'catalogue' | 'collection' | 'weddings'): Chainable<void>;
      fakeSignIn(): Chainable<void>;
      signUp(email: string, password: string): Chainable<void>;
      signIn(email: string, password: string): Chainable<void>;
      signOut(): Chainable<void>;
      resetTestData(): Chainable<void>;
    }
  }
}

// ── Supabase local storage key (deterministic from URL) ──────────────────────
// For http://127.0.0.1:54321, hostname is '127.0.0.1' → sb-127-0-0-1-auth-token
const SUPABASE_URL = Cypress.env('SUPABASE_URL') as string | undefined ?? 'http://127.0.0.1:54321';
const SERVICE_ROLE_KEY = Cypress.env('SUPABASE_SERVICE_ROLE_KEY') as string | undefined ?? '';

function supabaseStorageKey(): string {
  const hostname = new URL(SUPABASE_URL).hostname;
  return `sb-${hostname.replace(/\./g, '-')}-auth-token`;
}

// Minimal fake session that satisfies RequireAuth without a real Supabase auth call.
// The access_token is a non-validated placeholder; Supabase JS only validates it
// client-side when making server requests (which are intercepted in stub tests).
const FAKE_SESSION = {
  access_token: 'fake-stub-access-token',
  refresh_token: 'fake-stub-refresh-token',
  token_type: 'bearer',
  expires_in: 9999999,
  expires_at: 9999999999,
  user: {
    id: '00000000-0000-0000-0000-000000000001',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'stub@florai.test',
    email_confirmed_at: '2024-01-01T00:00:00.000Z',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
    user_metadata: {},
    app_metadata: {},
  },
};

// ── Stub helpers (used in tests that don't need real auth) ────────────────────

/**
 * Intercepts the Supabase PostgREST flowers query and returns fixture data.
 */
Cypress.Commands.add('stubFlowers', () => {
  cy.fixture('flowers.json').then((flowers) => {
    const rows = (flowers as Record<string, unknown>[]).map((f) => ({
      ...Object.fromEntries(
        Object.entries(f).map(([k, v]) => [k.replace(/([A-Z])/g, '_$1').toLowerCase(), v]),
      ),
      user_flower_overrides: [],
    }));

    cy.intercept('GET', '**/rest/v1/flowers*', { body: rows, statusCode: 200 }).as('getFlowers');
  });
});

/**
 * Intercepts Supabase auth refresh calls to prevent network errors in stub tests.
 * Does NOT set localStorage — use visitWithFakeAuth to visit a page with a fake session.
 */
Cypress.Commands.add('fakeSignIn', () => {
  cy.intercept('POST', '**/auth/v1/token*', {
    body: FAKE_SESSION,
    statusCode: 200,
  }).as('authRefresh');
});

/**
 * Visits a URL with a fake session pre-loaded in localStorage so RequireAuth passes.
 * Uses onBeforeLoad to set the session before page scripts run, ensuring the
 * Supabase client reads the fake session on initialisation.
 */
Cypress.Commands.add('visitWithFakeAuth', (url: string) => {
  cy.fakeSignIn();
  cy.visit(url, {
    onBeforeLoad(win) {
      win.localStorage.setItem(supabaseStorageKey(), JSON.stringify(FAKE_SESSION));
    },
  });
});

Cypress.Commands.add('visitCatalogue', () => {
  cy.visitWithFakeAuth('/catalogue');
  cy.wait('@getFlowers');
  cy.get('[data-cy="loading-indicator"]').should('not.exist');
  cy.get('[data-cy="flower-list"]').should('be.visible');
});

Cypress.Commands.add('visitFlowerDetail', (flowerId: string) => {
  cy.visitWithFakeAuth(`/catalogue/${flowerId}`);
  cy.wait('@getFlowers');
  cy.get('[data-cy="flower-detail-view"]').should('be.visible');
});

Cypress.Commands.add('navigateTo', (item: 'catalogue' | 'collection' | 'weddings') => {
  cy.get('[data-cy="hamburger-menu-trigger"]').click();
  cy.get(`[data-cy="nav-${item}"]`).click();
});

// ── Real auth commands (used in isolation tests against Supabase local) ───────

Cypress.Commands.add('signUp', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${SUPABASE_URL}/auth/v1/signup`,
    headers: { apikey: SERVICE_ROLE_KEY, 'Content-Type': 'application/json' },
    body: { email, password },
    failOnStatusCode: false,
  }).then((res) => {
    expect(res.status).to.be.oneOf([200, 400]); // 400 = already exists, that's fine
  });
});

Cypress.Commands.add('signIn', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    headers: { apikey: SERVICE_ROLE_KEY, 'Content-Type': 'application/json' },
    body: { email, password },
  }).then((res) => {
    const session = res.body as Record<string, unknown>;
    cy.window().then((win) => {
      win.localStorage.setItem(supabaseStorageKey(), JSON.stringify(session));
    });
  });
});

Cypress.Commands.add('signOut', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem(supabaseStorageKey());
  });
});

Cypress.Commands.add('resetTestData', () => {
  // Delete all user_flower_overrides (service_role bypasses RLS)
  cy.request({
    method: 'DELETE',
    url: `${SUPABASE_URL}/rest/v1/user_flower_overrides`,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    qs: { id: 'neq.00000000-0000-0000-0000-000000000000' },
    failOnStatusCode: false,
  });
});

export {};
