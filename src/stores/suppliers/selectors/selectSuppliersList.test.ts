import { initialState } from '../state';
import { makeSupplier, makeRootState } from '../../__tests__/fixtures';
import { selectSuppliersList } from './selectSuppliersList';

describe('selectSuppliersList', () => {
  it('returns all suppliers', () => {
    const s1 = makeSupplier({ id: 's1' });
    const s2 = makeSupplier({ id: 's2' });
    const state = makeRootState({ suppliers: { ...initialState, suppliers: [s1, s2] } });
    expect(selectSuppliersList(state)).toEqual([s1, s2]);
  });
});
