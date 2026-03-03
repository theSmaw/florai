import { defineConfig } from 'cypress';

// Supabase credentials for isolation/auth tests are loaded from cypress.env.json
// (gitignored). Copy cypress.env.json.example to cypress.env.json and fill in
// the values from `supabase status` before running auth/isolation tests.
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    viewportWidth: 390,
    viewportHeight: 844,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 1, openMode: 0 },
  },
});
