import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { removeFlowerSupplierRejected } from './removeFlowerSupplierRejected';

describe('removeFlowerSupplierRejected', () => {
  it('sets supplierOperationStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      removeFlowerSupplierRejected(draft, { error: { message: 'fail' } }),
    );
    expect(next.supplierOperationStatus).toEqual({ status: 'rejected', errorMessage: 'fail' });
  });
});
