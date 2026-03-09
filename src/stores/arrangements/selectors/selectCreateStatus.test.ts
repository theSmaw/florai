import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectCreateStatus } from './selectCreateStatus';

describe('selectCreateStatus', () => {
  it('returns the create status', () => {
    const state = makeRootState({ arrangements: { ...initialState, createStatus: { status: 'fulfilled' } } });
    expect(selectCreateStatus(state)).toEqual({ status: 'fulfilled' });
  });
});
