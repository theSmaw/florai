import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateFlowerSupplier } from './asyncActions/updateFlowerSupplier';
import type { FlowersState } from './state';

export function updateFlowerSupplierPending(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(updateFlowerSupplier.pending, (state) => {
    state.supplierOperationStatus = { status: 'pending' };
  });
}
