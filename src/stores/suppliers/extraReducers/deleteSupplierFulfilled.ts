import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { SuppliersState } from '../state';

export function deleteSupplierFulfilled(
  state: Draft<SuppliersState>,
  action: PayloadAction<string>,
): void {
  state.deleteStatus = { status: 'fulfilled' };
  state.suppliers = state.suppliers.filter((s) => s.id !== action.payload);
}
