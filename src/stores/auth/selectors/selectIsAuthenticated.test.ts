import { initialState } from '../state';
import { makeSession, makeRootState } from '../../__tests__/fixtures';
import { selectIsAuthenticated } from './selectIsAuthenticated';

describe('selectIsAuthenticated', () => {
  it('is false when no session', () => {
    expect(selectIsAuthenticated(makeRootState())).toBe(false);
  });

  it('is true when a session exists', () => {
    const session = makeSession();
    const state = makeRootState({ auth: { ...initialState, session } });
    expect(selectIsAuthenticated(state)).toBe(true);
  });
});
