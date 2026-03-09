import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { removeFlowerSupplierPending } from './removeFlowerSupplierPending';

describe('removeFlowerSupplierPending', () => {
  it('sets supplierOperationStatus to pending', () => {
    const next = createNextState(initialState, (draft) => removeFlowerSupplierPending(draft));
    expect(next.supplierOperationStatus).toEqual({ status: 'pending' });
  });
});
