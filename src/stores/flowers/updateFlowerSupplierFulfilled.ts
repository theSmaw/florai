import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateFlowerSupplier } from './asyncActions/updateFlowerSupplier';
import type { FlowersState } from './state';

export function updateFlowerSupplierFulfilled(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateFlowerSupplier.fulfilled, (state, action) => {
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
  });
}
