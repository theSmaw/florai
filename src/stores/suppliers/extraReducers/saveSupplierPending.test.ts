import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { saveSupplierPending } from './saveSupplierPending';

describe('saveSupplierPending', () => {
  it('sets saveStatus to pending', () => {
    const next = createNextState(initialState, (draft) =>
      saveSupplierPending(draft),
    );
    expect(next.saveStatus).toEqual({ status: 'pending' });
  });
});
