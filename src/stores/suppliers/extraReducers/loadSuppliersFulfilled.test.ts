import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadSuppliersFulfilled } from './loadSuppliersFulfilled';
import { makeSupplier } from '../../__tests__/fixtures';

describe('loadSuppliersFulfilled', () => {
  it('populates suppliers and marks status fulfilled', () => {
    const suppliers = [makeSupplier()];
    const next = createNextState(initialState, (draft) =>
      loadSuppliersFulfilled(draft, {
        type: 'suppliers/load/fulfilled',
        payload: suppliers,
      }),
    );
    expect(next.suppliers).toEqual(suppliers);
    expect(next.loadStatus).toEqual({ status: 'fulfilled' });
  });
});
