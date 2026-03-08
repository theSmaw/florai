import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { removeFlowerSupplier } from '../asyncActions/removeFlowerSupplier';
import type { FlowersState } from '../state';

export function removeFlowerSupplierFulfilled(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(removeFlowerSupplier.fulfilled, (state, action) => {
    state.supplierOperationStatus = { status: 'fulfilled' };
    const { flowerId, supplierId } = action.payload;
    const flower = state.flowers.find((f) => f.id === flowerId);
    if (flower) {
      flower.suppliers = flower.suppliers.filter((s) => s.id !== supplierId);
    }
  });
}
