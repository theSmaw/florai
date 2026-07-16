/**
 * Sample arrangements onboarding — proves every new user is created with a
 * couple of ready-made, editable arrangements (via the on_auth_user_created
 * trigger in migration 0015).
 *
 * Requires the real Supabase local stack (supabase start).
 * Run with: pnpm cypress:run --spec cypress/e2e/integration/sample-arrangements.cy.ts
 */

const TEST_PASSWORD = 'password123';
const SUPABASE_URL = (Cypress.env('SUPABASE_URL') as string) ?? 'http://127.0.0.1:54321';
const SERVICE_ROLE_KEY = (Cypress.env('SUPABASE_SERVICE_ROLE_KEY') as string) ?? '';

// Unique email per run so we always exercise the fresh-signup path.
const NEW_USER_EMAIL = `sample-arrangements-${Date.now()}@test.florai.com`;

function fetchArrangementsFor(email: string) {
  return cy
    .request({
      method: 'POST',
      url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
      headers: { apikey: SERVICE_ROLE_KEY, 'Content-Type': 'application/json' },
      body: { email, password: TEST_PASSWORD },
    })
    .then((tokenRes) => {
      const { access_token } = tokenRes.body as { access_token: string };
      return cy.request({
        method: 'GET',
        url: `${SUPABASE_URL}/rest/v1/arrangements?order=created_at.asc`,
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });
    });
}

describe('Sample arrangements for new users', () => {
  before(() => {
    cy.signUp(NEW_USER_EMAIL, TEST_PASSWORD);
  });

  it('creates two starter arrangements on sign-up', () => {
    fetchArrangementsFor(NEW_USER_EMAIL).then((res) => {
      const rows = res.body as Array<{ name: string; flower_ids: string[]; size: string }>;
      expect(rows).to.have.length(2);

      const names = rows.map((r) => r.name);
      expect(names).to.include.members(['Classic Romance Bouquet', 'Sunny Meadow Jar']);

      // Real, populated arrangements — not empty placeholders.
      rows.forEach((r) => {
        expect(r.flower_ids.length).to.be.greaterThan(0);
        expect(r.size).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('shows the starter arrangements on the Arrangements page', () => {
    cy.signIn(NEW_USER_EMAIL, TEST_PASSWORD);
    cy.visit('/arrangements');

    cy.get('[data-cy="arrangement-card"]').should('have.length', 2);
    cy.get('[data-cy="arrangement-card-name"]').then(($names) => {
      const text = $names.toArray().map((el) => el.textContent);
      expect(text).to.include('Classic Romance Bouquet');
      expect(text).to.include('Sunny Meadow Jar');
    });
  });

  it('starter arrangements are fully editable — user can delete one', () => {
    fetchArrangementsFor(NEW_USER_EMAIL).then((res) => {
      const rows = res.body as Array<{ id: string }>;
      const target = rows[0];

      cy.request({
        method: 'POST',
        url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        headers: { apikey: SERVICE_ROLE_KEY, 'Content-Type': 'application/json' },
        body: { email: NEW_USER_EMAIL, password: TEST_PASSWORD },
      }).then((tokenRes) => {
        const { access_token } = tokenRes.body as { access_token: string };
        cy.request({
          method: 'DELETE',
          url: `${SUPABASE_URL}/rest/v1/arrangements?id=eq.${target.id}`,
          headers: {
            apikey: SERVICE_ROLE_KEY,
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
        }).then((delRes) => {
          expect(delRes.status).to.be.oneOf([200, 204]);
        });
      });
    });

    fetchArrangementsFor(NEW_USER_EMAIL).then((res) => {
      expect(res.body as unknown[]).to.have.length(1);
    });
  });
});
