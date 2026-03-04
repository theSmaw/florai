/**
 * User isolation tests — automated proof that users can only see their own changes.
 *
 * Requires real Supabase local stack (supabase start).
 * Run with: pnpm cypress:run --spec cypress/e2e/user-isolation.cy.ts
 */

const USER_A_EMAIL = 'isolation-a@test.florai.com';
const USER_B_EMAIL = 'isolation-b@test.florai.com';
const TEST_PASSWORD = 'password123';
const SUPABASE_URL = Cypress.env('SUPABASE_URL') as string ?? 'http://127.0.0.1:54321';
const SERVICE_ROLE_KEY = Cypress.env('SUPABASE_SERVICE_ROLE_KEY') as string ?? '';

before(() => {
  cy.signUp(USER_A_EMAIL, TEST_PASSWORD);
  cy.signUp(USER_B_EMAIL, TEST_PASSWORD);
});

afterEach(() => {
  cy.resetTestData();
  cy.clearLocalStorage();
});

describe('User isolation', () => {
  describe('image override isolation', () => {
    it('User A override is NOT visible to User B', () => {
      // Step 1: Sign in as User A and record the current image URL for flower 1
      cy.signIn(USER_A_EMAIL, TEST_PASSWORD);
      cy.visit('/catalogue/1');
      cy.get('[data-cy="flower-image"]')
        .invoke('attr', 'src')
        .as('originalSrc');

      // Step 2: Manually insert an override for User A via the service-role API
      cy.request({
        method: 'POST',
        url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        headers: { apikey: SERVICE_ROLE_KEY, 'Content-Type': 'application/json' },
        body: { email: USER_A_EMAIL, password: TEST_PASSWORD },
      }).then((tokenRes) => {
        const { access_token } = tokenRes.body as { access_token: string };

        cy.request({
          method: 'POST',
          url: `${SUPABASE_URL}/rest/v1/user_flower_overrides`,
          headers: {
            apikey: SERVICE_ROLE_KEY,
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: {
            flower_id: '1',
            image_url: 'https://example.com/user-a-custom-image.jpg',
          },
        });
      });

      // Step 3: User A reloads and sees the override
      cy.reload();
      cy.get('[data-cy="flower-image"]').should(
        'have.attr',
        'src',
        'https://example.com/user-a-custom-image.jpg',
      );

      // Step 4: Sign out User A, sign in User B
      cy.clearLocalStorage();
      cy.signIn(USER_B_EMAIL, TEST_PASSWORD);
      cy.visit('/catalogue/1');

      // Step 5: User B sees the original image, NOT User A's override
      cy.get('@originalSrc').then((originalSrc) => {
        cy.get('[data-cy="flower-image"]').should('have.attr', 'src', originalSrc);
      });
    });
  });

  describe('RLS enforcement via API', () => {
    it('User B cannot insert an override with User A user_id', () => {
      // Get User A's ID via the admin API
      cy.request({
        method: 'GET',
        url: `${SUPABASE_URL}/auth/v1/admin/users`,
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
      }).then((adminRes) => {
        const users = adminRes.body as { users: Array<{ id: string; email: string }> };
        const userA = users.users.find((u) => u.email === USER_A_EMAIL);
        const userAId = userA?.id;

        if (!userAId) throw new Error('User A not found in admin users list');

        // Sign in as User B
        cy.request({
          method: 'POST',
          url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
          headers: { apikey: SERVICE_ROLE_KEY, 'Content-Type': 'application/json' },
          body: { email: USER_B_EMAIL, password: TEST_PASSWORD },
        }).then((tokenRes) => {
          const { access_token } = tokenRes.body as { access_token: string };

          // Attempt to insert override row with User A's user_id using User B's token
          cy.request({
            method: 'POST',
            url: `${SUPABASE_URL}/rest/v1/user_flower_overrides`,
            headers: {
              apikey: SERVICE_ROLE_KEY,
              Authorization: `Bearer ${access_token}`,
              'Content-Type': 'application/json',
            },
            body: {
              user_id: userAId,
              flower_id: '2',
              image_url: 'https://example.com/malicious.jpg',
            },
            failOnStatusCode: false,
          }).then((res) => {
            // RLS rejects this: PostgREST returns 403 (or 42501 via 400)
            expect(res.status).to.be.oneOf([401, 403]);
          });
        });
      });
    });

    it('User B cannot read User A overrides via direct API', () => {
      // Insert an override as User A
      cy.request({
        method: 'POST',
        url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        headers: { apikey: SERVICE_ROLE_KEY, 'Content-Type': 'application/json' },
        body: { email: USER_A_EMAIL, password: TEST_PASSWORD },
      }).then((tokenRes) => {
        const { access_token: tokenA } = tokenRes.body as { access_token: string };

        cy.request({
          method: 'POST',
          url: `${SUPABASE_URL}/rest/v1/user_flower_overrides`,
          headers: {
            apikey: SERVICE_ROLE_KEY,
            Authorization: `Bearer ${tokenA}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: {
            flower_id: '3',
            image_url: 'https://example.com/user-a-secret-image.jpg',
          },
        });
      });

      // Now sign in as User B and query user_flower_overrides directly
      cy.request({
        method: 'POST',
        url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        headers: { apikey: SERVICE_ROLE_KEY, 'Content-Type': 'application/json' },
        body: { email: USER_B_EMAIL, password: TEST_PASSWORD },
      }).then((tokenRes) => {
        const { access_token: tokenB } = tokenRes.body as { access_token: string };

        cy.request({
          method: 'GET',
          url: `${SUPABASE_URL}/rest/v1/user_flower_overrides`,
          headers: {
            apikey: SERVICE_ROLE_KEY,
            Authorization: `Bearer ${tokenB}`,
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          // RLS ensures User B only sees their own rows (none in this case)
          const rows = res.body as unknown[];
          expect(rows).to.have.length(0);
        });
      });
    });
  });
});
