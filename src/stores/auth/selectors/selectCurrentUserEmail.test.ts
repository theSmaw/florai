import { initialState } from '../state';
import { makeSession, makeRootState } from '../../__tests__/fixtures';
import { selectCurrentUserEmail } from './selectCurrentUserEmail';

describe('selectCurrentUserEmail', () => {
  it('returns email from session', () => {
    const session = makeSession();
    const state = makeRootState({ auth: { ...initialState, session } });
    expect(selectCurrentUserEmail(state)).toBe('test@example.com');
  });

  it('returns null when no session', () => {
    expect(selectCurrentUserEmail(makeRootState())).toBeNull();
  });
});
