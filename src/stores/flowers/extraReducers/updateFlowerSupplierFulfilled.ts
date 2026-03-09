import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateFlowerSupplierFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<{ flowerId: string; id: string; name: string; wholesalePrice: number | null }>,
): void {
  state.supplierOperationStatus = { status: 'fulfilled' };
  const { flowerId, id, name, wholesalePrice } = action.payload;
  const flower = state.flowers.find((f) => f.id === flowerId);
  if (flower) {
    const supplier = flower.suppliers.find((s) => s.id === id);
    if (supplier) {
      supplier.name = name;
      supplier.wholesalePrice = wholesalePrice;
    }
  }
}
