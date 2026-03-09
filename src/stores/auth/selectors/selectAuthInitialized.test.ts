import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectAuthInitialized } from './selectAuthInitialized';

describe('selectAuthInitialized', () => {
  it('reflects the initialized flag', () => {
    const state = makeRootState({ auth: { ...initialState, initialized: true } });
    expect(selectAuthInitialized(state)).toBe(true);
  });
});
