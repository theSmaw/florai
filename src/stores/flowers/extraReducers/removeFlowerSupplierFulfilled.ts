import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function removeFlowerSupplierFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<{ flowerId: string; supplierId: string }>,
): void {
  state.supplierOperationStatus = { status: 'fulfilled' };
  const { flowerId, supplierId } = action.payload;
  const flower = state.flowers.find((f) => f.id === flowerId);
  if (flower) {
    flower.suppliers = flower.suppliers.filter((s) => s.id !== supplierId);
  }
}
