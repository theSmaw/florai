import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { addFlowerSupplier } from './asyncActions/addFlowerSupplier';
import type { FlowersState } from './state';

export function addFlowerSupplierFulfilled(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(addFlowerSupplier.fulfilled, (state, action) => {
    state.supplierOperationStatus = { status: 'fulfilled' };
    const { flowerId, supplier } = action.payload;
    const flower = state.flowers.find((f) => f.id === flowerId);
    if (flower) {
      flower.suppliers.push(supplier);
    }
  });
}
