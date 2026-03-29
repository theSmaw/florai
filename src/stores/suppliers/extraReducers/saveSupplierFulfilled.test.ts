import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { saveSupplierFulfilled } from './saveSupplierFulfilled';
import { makeSupplier } from '../../__tests__/fixtures';

describe('saveSupplierFulfilled', () => {
  it('prepends a new supplier and marks status fulfilled', () => {
    const supplier = makeSupplier({ id: 's2' });
    const next = createNextState(initialState, (draft) =>
      saveSupplierFulfilled(draft, {
        type: 'suppliers/save/fulfilled',
        payload: supplier,
      }),
    );
    expect(next.suppliers[0]).toEqual(supplier);
    expect(next.saveStatus).toEqual({ status: 'fulfilled' });
  });

  it('replaces an existing supplier in place', () => {
    const existing = makeSupplier({ id: 's1', name: 'Old Name' });
    const updated = makeSupplier({ id: 's1', name: 'New Name' });
    const stateWithSupplier = { ...initialState, suppliers: [existing] };
    const next = createNextState(stateWithSupplier, (draft) =>
      saveSupplierFulfilled(draft, {
        type: 'suppliers/save/fulfilled',
        payload: updated,
      }),
    );
    expect(next.suppliers).toHaveLength(1);
    expect(next.suppliers[0]).toEqual(updated);
    expect(next.saveStatus).toEqual({ status: 'fulfilled' });
  });
});
