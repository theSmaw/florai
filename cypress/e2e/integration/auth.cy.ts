/**
 * Auth flow tests — require real Supabase local stack (supabase start).
 *
 * Run with: pnpm cypress:run --spec cypress/e2e/auth.cy.ts
 */

const TEST_EMAIL_A = 'user-a@test.florai.com';
const TEST_EMAIL_B = 'user-b@test.florai.com';
const TEST_PASSWORD = 'password123';

describe('Authentication', () => {
  before(() => {
    // Ensure test users exist
    cy.signUp(TEST_EMAIL_A, TEST_PASSWORD);
    cy.signUp(TEST_EMAIL_B, TEST_PASSWORD);
  });

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  describe('Sign-in page', () => {
    it('redirects unauthenticated users to /login', () => {
      cy.url().should('include', '/login');
      cy.get('[data-cy="auth-form"]').should('be.visible');
    });

    it('shows sign-in form by default', () => {
      cy.url().should('include', '/login');
      cy.get('[data-cy="auth-submit"]').should('contain.text', 'Sign in');
    });

    it('can toggle to sign-up mode', () => {
      cy.url().should('include', '/login');
      cy.get('[data-cy="auth-toggle-mode"]').click();
      cy.get('[data-cy="auth-submit"]').should('contain.text', 'Create account');
    });

    it('shows an error on invalid credentials', () => {
      cy.url().should('include', '/login');
      cy.get('[data-cy="auth-email"]').type('nonexistent@example.com');
      cy.get('[data-cy="auth-password"]').type('wrongpassword');
      cy.get('[data-cy="auth-submit"]').click();
      cy.get('[data-cy="auth-error"]').should('be.visible');
    });
  });

  describe('Sign in', () => {
    it('signs in and redirects to catalogue', () => {
      cy.visit('/login');
      cy.get('[data-cy="auth-email"]').type(TEST_EMAIL_A);
      cy.get('[data-cy="auth-password"]').type(TEST_PASSWORD);
      cy.get('[data-cy="auth-submit"]').click();
      cy.url().should('include', '/catalogue');
    });

    it('shows the user email in the user menu after sign-in', () => {
      cy.visit('/login');
      cy.get('[data-cy="auth-email"]').type(TEST_EMAIL_A);
      cy.get('[data-cy="auth-password"]').type(TEST_PASSWORD);
      cy.get('[data-cy="auth-submit"]').click();
      cy.get('[data-cy="user-menu-trigger"]').click();
      cy.contains(TEST_EMAIL_A).should('be.visible');
    });
  });

  describe('Sign out', () => {
    beforeEach(() => {
      cy.signIn(TEST_EMAIL_A, TEST_PASSWORD);
      cy.visit('/catalogue');
    });

    it('signs out and redirects to login', () => {
      cy.get('[data-cy="user-menu-trigger"]').click();
      cy.get('[data-cy="user-menu-sign-out"]').click();
      cy.url().should('include', '/login');
    });

    it('cannot access protected routes after sign-out', () => {
      cy.get('[data-cy="user-menu-trigger"]').click();
      cy.get('[data-cy="user-menu-sign-out"]').click();
      cy.visit('/catalogue');
      cy.url().should('include', '/login');
    });
  });

  describe('Sign up', () => {
    it('creates a new account and redirects to catalogue', () => {
      // Use a unique email each test run
      const uniqueEmail = `new-${Date.now()}@test.florai.com`;
      cy.visit('/login');
      cy.get('[data-cy="auth-toggle-mode"]').click();
      cy.get('[data-cy="auth-email"]').type(uniqueEmail);
      cy.get('[data-cy="auth-password"]').type(TEST_PASSWORD);
      cy.get('[data-cy="auth-submit"]').click();
      cy.url().should('include', '/catalogue');
    });
  });
});
