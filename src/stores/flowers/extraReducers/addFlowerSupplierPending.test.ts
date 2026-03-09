import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { addFlowerSupplierPending } from './addFlowerSupplierPending';

describe('addFlowerSupplierPending', () => {
  it('sets supplierOperationStatus to pending', () => {
    const next = createNextState(initialState, (draft) => addFlowerSupplierPending(draft));
    expect(next.supplierOperationStatus).toEqual({ status: 'pending' });
  });
});
