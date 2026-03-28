import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { SuppliersState } from '../state';
import type { Supplier } from '../../../domain/Supplier';

export function saveSupplierFulfilled(
  state: Draft<SuppliersState>,
  action: PayloadAction<Supplier>,
): void {
  state.saveStatus = { status: 'fulfilled' };
  const index = state.suppliers.findIndex((s) => s.id === action.payload.id);
  if (index !== -1) {
    state.suppliers[index] = action.payload;
  } else {
    state.suppliers.unshift(action.payload);
  }
}
