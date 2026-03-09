import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectLoadFlowersStatus } from './selectLoadFlowersStatus';

describe('selectLoadFlowersStatus', () => {
  it('returns the load status', () => {
    const state = makeRootState({ flowers: { ...initialState, loadFlowersStatus: { status: 'pending' } } });
    expect(selectLoadFlowersStatus(state)).toEqual({ status: 'pending' });
  });
});
