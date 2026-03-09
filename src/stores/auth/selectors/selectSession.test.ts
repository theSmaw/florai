import { initialState } from '../state';
import { makeSession, makeRootState } from '../../__tests__/fixtures';
import { selectSession } from './selectSession';

describe('selectSession', () => {
  it('returns the current session', () => {
    const session = makeSession();
    const state = makeRootState({ auth: { ...initialState, session } });
    expect(selectSession(state)).toEqual(session);
  });
});
