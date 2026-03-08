import reducer, { sessionChanged, signIn, signUp, signOut } from './slice';
import { initialState } from './state';
import { makeSession, makeRootState } from '../__tests__/fixtures';
import {
  selectSession,
  selectIsAuthenticated,
  selectAuthInitialized,
  selectAuthLoading,
  selectAuthError,
  selectCurrentUserEmail,
} from './selectors';

// ── Sync reducers ──────────────────────────────────────────────────────────────

describe('sessionChanged', () => {
  it('sets session, marks initialized, and clears error', () => {
    const session = makeSession();
    const state = reducer({ ...initialState, error: 'old error' }, sessionChanged(session));
    expect(state.session).toEqual(session);
    expect(state.initialized).toBe(true);
    expect(state.error).toBeNull();
  });

  it('accepts null to clear session', () => {
    const session = makeSession();
    const state = reducer({ ...initialState, session }, sessionChanged(null));
    expect(state.session).toBeNull();
    expect(state.initialized).toBe(true);
  });
});

// ── signIn extra reducers ──────────────────────────────────────────────────────

describe('signIn.pending', () => {
  it('sets loading=true and clears error', () => {
    const action = signIn.pending('r1', { email: 'a@b.com', password: 'pw' });
    const state = reducer({ ...initialState, error: 'previous error' }, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
});

describe('signIn.fulfilled', () => {
  it('sets session and clears loading', () => {
    const session = makeSession();
    const action = signIn.fulfilled(session, 'r1', { email: 'a@b.com', password: 'pw' });
    const state = reducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.session).toEqual(session);
  });
});

describe('signIn.rejected', () => {
  it('clears loading and sets error message', () => {
    const action = signIn.rejected(new Error('Invalid credentials'), 'r1', { email: 'a@b.com', password: 'pw' });
    const state = reducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Invalid credentials');
  });

});

// ── signUp extra reducers ──────────────────────────────────────────────────────

describe('signUp.pending', () => {
  it('sets loading=true and clears error', () => {
    const action = signUp.pending('r1', { email: 'a@b.com', password: 'pw' });
    const state = reducer({ ...initialState, error: 'prev' }, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
});

describe('signUp.fulfilled', () => {
  it('sets session and clears loading', () => {
    const session = makeSession();
    const action = signUp.fulfilled(session, 'r1', { email: 'a@b.com', password: 'pw' });
    const state = reducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.session).toEqual(session);
  });
});

describe('signUp.rejected', () => {
  it('clears loading and sets error message', () => {
    const action = signUp.rejected(new Error('Email taken'), 'r1', { email: 'a@b.com', password: 'pw' });
    const state = reducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Email taken');
  });

});

// ── signOut extra reducer ──────────────────────────────────────────────────────

describe('signOut.fulfilled', () => {
  it('clears session, loading, and error', () => {
    const session = makeSession();
    const action = signOut.fulfilled(undefined, 'r1', undefined);
    const state = reducer({ ...initialState, session, loading: true, error: 'err' }, action);
    expect(state.session).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});

// ── Selectors ──────────────────────────────────────────────────────────────────

describe('auth selectors', () => {
  const session = makeSession();

  it('selectSession returns the current session', () => {
    const state = makeRootState({ auth: { ...initialState, session } });
    expect(selectSession(state)).toEqual(session);
  });

  it('selectIsAuthenticated is false when no session', () => {
    expect(selectIsAuthenticated(makeRootState())).toBe(false);
  });

  it('selectIsAuthenticated is true when a session exists', () => {
    const state = makeRootState({ auth: { ...initialState, session } });
    expect(selectIsAuthenticated(state)).toBe(true);
  });

  it('selectAuthInitialized reflects the initialized flag', () => {
    const state = makeRootState({ auth: { ...initialState, initialized: true } });
    expect(selectAuthInitialized(state)).toBe(true);
  });

  it('selectAuthLoading reflects the loading flag', () => {
    const state = makeRootState({ auth: { ...initialState, loading: true } });
    expect(selectAuthLoading(state)).toBe(true);
  });

  it('selectAuthError returns the error string', () => {
    const state = makeRootState({ auth: { ...initialState, error: 'oops' } });
    expect(selectAuthError(state)).toBe('oops');
  });

  it('selectCurrentUserEmail returns email from session', () => {
    const state = makeRootState({ auth: { ...initialState, session } });
    expect(selectCurrentUserEmail(state)).toBe('test@example.com');
  });

  it('selectCurrentUserEmail returns null when no session', () => {
    expect(selectCurrentUserEmail(makeRootState())).toBeNull();
  });
});
