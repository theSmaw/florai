import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectLoadSuppliersStatus } from './selectLoadSuppliersStatus';

describe('selectLoadSuppliersStatus', () => {
  it('returns the loadStatus', () => {
    const state = makeRootState({ suppliers: { ...initialState, loadStatus: { status: 'pending' } } });
    expect(selectLoadSuppliersStatus(state)).toEqual({ status: 'pending' });
  });
});
