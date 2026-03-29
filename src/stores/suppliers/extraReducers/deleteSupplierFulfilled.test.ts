import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { deleteSupplierFulfilled } from './deleteSupplierFulfilled';
import { makeSupplier } from '../../__tests__/fixtures';

describe('deleteSupplierFulfilled', () => {
  it('removes the supplier and marks status fulfilled', () => {
    const s1 = makeSupplier({ id: 's1' });
    const s2 = makeSupplier({ id: 's2' });
    const stateWithSuppliers = { ...initialState, suppliers: [s1, s2] };
    const next = createNextState(stateWithSuppliers, (draft) =>
      deleteSupplierFulfilled(draft, {
        type: 'suppliers/delete/fulfilled',
        payload: 's1',
      }),
    );
    expect(next.suppliers).toHaveLength(1);
    expect(next.suppliers[0]).toEqual(s2);
    expect(next.deleteStatus).toEqual({ status: 'fulfilled' });
  });
});
