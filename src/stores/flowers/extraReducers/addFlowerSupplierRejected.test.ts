import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { addFlowerSupplierRejected } from './addFlowerSupplierRejected';

describe('addFlowerSupplierRejected', () => {
  it('sets supplierOperationStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      addFlowerSupplierRejected(draft, { error: { message: 'db error' } }),
    );
    expect(next.supplierOperationStatus).toEqual({ status: 'rejected', errorMessage: 'db error' });
  });
});
