import type { Draft } from '@reduxjs/toolkit';
import type { SuppliersState } from '../state';

export function deleteSupplierPending(state: Draft<SuppliersState>): void {
  state.deleteStatus = { status: 'pending' };
}
