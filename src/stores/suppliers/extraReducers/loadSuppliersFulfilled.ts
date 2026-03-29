import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { SuppliersState } from '../state';
import type { Supplier } from '../../../domain/Supplier';

export function loadSuppliersFulfilled(
  state: Draft<SuppliersState>,
  action: PayloadAction<Supplier[]>,
): void {
  state.suppliers = action.payload;
  state.loadStatus = { status: 'fulfilled' };
}
