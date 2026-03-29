import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { deleteSupplierPending } from './deleteSupplierPending';

describe('deleteSupplierPending', () => {
  it('sets deleteStatus to pending', () => {
    const next = createNextState(initialState, (draft) =>
      deleteSupplierPending(draft),
    );
    expect(next.deleteStatus).toEqual({ status: 'pending' });
  });
});
