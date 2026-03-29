import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectSaveSupplierError } from './selectSaveSupplierError';

describe('selectSaveSupplierError', () => {
  it('returns null when status is idle', () => {
    const state = makeRootState({ suppliers: { ...initialState, saveStatus: { status: 'idle' } } });
    expect(selectSaveSupplierError(state)).toBeNull();
  });

  it('returns null when status is pending', () => {
    const state = makeRootState({ suppliers: { ...initialState, saveStatus: { status: 'pending' } } });
    expect(selectSaveSupplierError(state)).toBeNull();
  });

  it('returns null when status is fulfilled', () => {
    const state = makeRootState({ suppliers: { ...initialState, saveStatus: { status: 'fulfilled' } } });
    expect(selectSaveSupplierError(state)).toBeNull();
  });

  it('returns the error message when status is rejected', () => {
    const state = makeRootState({
      suppliers: { ...initialState, saveStatus: { status: 'rejected', errorMessage: 'Save failed' } },
    });
    expect(selectSaveSupplierError(state)).toBe('Save failed');
  });
});
