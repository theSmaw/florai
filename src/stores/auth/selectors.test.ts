import { initialState } from './state';
import {
  selectSession,
  selectIsAuthenticated,
  selectAuthInitialized,
  selectAuthLoading,
  selectAuthError,
  selectCurrentUserEmail,
} from './selectors';
import { makeSession, makeRootState } from '../__tests__/fixtures';

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
