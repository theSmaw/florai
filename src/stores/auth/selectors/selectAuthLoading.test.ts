import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectAuthLoading } from './selectAuthLoading';

describe('selectAuthLoading', () => {
  it('reflects the loading flag', () => {
    const state = makeRootState({ auth: { ...initialState, loading: true } });
    expect(selectAuthLoading(state)).toBe(true);
  });
});
