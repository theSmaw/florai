import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { saveSupplierRejected } from './saveSupplierRejected';

describe('saveSupplierRejected', () => {
  it('sets saveStatus to rejected with error message', () => {
    const next = createNextState(initialState, (draft) =>
      saveSupplierRejected(draft, {
        error: { message: 'Save failed' },
        meta: { aborted: false },
      }),
    );
    expect(next.saveStatus).toEqual({ status: 'rejected', errorMessage: 'Save failed' });
  });

  it('does nothing if action was aborted', () => {
    const next = createNextState(initialState, (draft) =>
      saveSupplierRejected(draft, {
        error: { message: 'Aborted' },
        meta: { aborted: true },
      }),
    );
    expect(next.saveStatus).toEqual({ status: 'idle' });
  });
});
