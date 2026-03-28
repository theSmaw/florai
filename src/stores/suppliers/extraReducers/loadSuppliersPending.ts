import type { Draft } from '@reduxjs/toolkit';
import type { SuppliersState } from '../state';

export function loadSuppliersPending(state: Draft<SuppliersState>): void {
  state.loadStatus = { status: 'pending' };
}
