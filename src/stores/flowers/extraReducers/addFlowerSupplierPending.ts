import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function addFlowerSupplierPending(state: Draft<FlowersState>): void {
  state.supplierOperationStatus = { status: 'pending' };
}
