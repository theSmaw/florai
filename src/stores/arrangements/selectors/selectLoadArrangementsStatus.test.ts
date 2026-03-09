import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectLoadArrangementsStatus } from './selectLoadArrangementsStatus';

describe('selectLoadArrangementsStatus', () => {
  it('returns the load status', () => {
    const state = makeRootState({ arrangements: { ...initialState, loadStatus: { status: 'pending' } } });
    expect(selectLoadArrangementsStatus(state)).toEqual({ status: 'pending' });
  });
});
