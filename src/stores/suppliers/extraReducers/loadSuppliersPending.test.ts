import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadSuppliersPending } from './loadSuppliersPending';

describe('loadSuppliersPending', () => {
  it('sets loadStatus to pending', () => {
    const next = createNextState(initialState, (draft) =>
      loadSuppliersPending(draft),
    );
    expect(next.loadStatus).toEqual({ status: 'pending' });
  });
});
