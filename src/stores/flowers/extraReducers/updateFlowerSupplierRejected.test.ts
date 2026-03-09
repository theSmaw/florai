import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateFlowerSupplierRejected } from './updateFlowerSupplierRejected';

describe('updateFlowerSupplierRejected', () => {
  it('sets supplierOperationStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      updateFlowerSupplierRejected(draft, { error: { message: 'fail' } }),
    );
    expect(next.supplierOperationStatus).toEqual({ status: 'rejected', errorMessage: 'fail' });
  });
});
