import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectDeleteSupplierStatus } from './selectDeleteSupplierStatus';

describe('selectDeleteSupplierStatus', () => {
  it('returns the deleteStatus', () => {
    const state = makeRootState({ suppliers: { ...initialState, deleteStatus: { status: 'pending' } } });
    expect(selectDeleteSupplierStatus(state)).toEqual({ status: 'pending' });
  });
});
