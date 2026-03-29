import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadSuppliersRejected } from './loadSuppliersRejected';

describe('loadSuppliersRejected', () => {
  it('sets loadStatus to rejected with error message', () => {
    const next = createNextState(initialState, (draft) =>
      loadSuppliersRejected(draft, {
        error: { message: 'Network error' },
        meta: { aborted: false },
      }),
    );
    expect(next.loadStatus).toEqual({ status: 'rejected', errorMessage: 'Network error' });
  });

  it('does nothing if action was aborted', () => {
    const next = createNextState(initialState, (draft) =>
      loadSuppliersRejected(draft, {
        error: { message: 'Aborted' },
        meta: { aborted: true },
      }),
    );
    expect(next.loadStatus).toEqual({ status: 'idle' });
  });
});
