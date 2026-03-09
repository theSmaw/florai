import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';
import type { FlowerSupplier } from '../../../domain/Flower';

export function addFlowerSupplierFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<{ flowerId: string; supplier: FlowerSupplier }>,
): void {
  state.supplierOperationStatus = { status: 'fulfilled' };
  const { flowerId, supplier } = action.payload;
  const flower = state.flowers.find((f) => f.id === flowerId);
  if (flower) {
    flower.suppliers.push(supplier);
  }
}
