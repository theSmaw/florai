import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { deleteSupplierRejected } from './deleteSupplierRejected';

describe('deleteSupplierRejected', () => {
  it('sets deleteStatus to rejected with error message', () => {
    const next = createNextState(initialState, (draft) =>
      deleteSupplierRejected(draft, {
        error: { message: 'Delete failed' },
        meta: { aborted: false },
      }),
    );
    expect(next.deleteStatus).toEqual({ status: 'rejected', errorMessage: 'Delete failed' });
  });

  it('does nothing if action was aborted', () => {
    const next = createNextState(initialState, (draft) =>
      deleteSupplierRejected(draft, {
        error: { message: 'Aborted' },
        meta: { aborted: true },
      }),
    );
    expect(next.deleteStatus).toEqual({ status: 'idle' });
  });
});
