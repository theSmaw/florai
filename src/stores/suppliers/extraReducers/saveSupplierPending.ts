import type { Draft } from '@reduxjs/toolkit';
import type { SuppliersState } from '../state';

export function saveSupplierPending(state: Draft<SuppliersState>): void {
  state.saveStatus = { status: 'pending' };
}
