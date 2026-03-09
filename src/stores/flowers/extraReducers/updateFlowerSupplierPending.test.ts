import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateFlowerSupplierPending } from './updateFlowerSupplierPending';

describe('updateFlowerSupplierPending', () => {
  it('sets supplierOperationStatus to pending', () => {
    const next = createNextState(initialState, (draft) => updateFlowerSupplierPending(draft));
    expect(next.supplierOperationStatus).toEqual({ status: 'pending' });
  });
});
