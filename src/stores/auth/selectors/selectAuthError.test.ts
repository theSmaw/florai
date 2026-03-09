import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectAuthError } from './selectAuthError';

describe('selectAuthError', () => {
  it('returns the error string', () => {
    const state = makeRootState({ auth: { ...initialState, error: 'oops' } });
    expect(selectAuthError(state)).toBe('oops');
  });
});
