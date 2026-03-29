import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectSaveSupplierStatus } from './selectSaveSupplierStatus';

describe('selectSaveSupplierStatus', () => {
  it('returns the saveStatus', () => {
    const state = makeRootState({ suppliers: { ...initialState, saveStatus: { status: 'fulfilled' } } });
    expect(selectSaveSupplierStatus(state)).toEqual({ status: 'fulfilled' });
  });
});
