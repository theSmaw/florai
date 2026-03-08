import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { removeFlowerSupplier } from '../asyncActions/removeFlowerSupplier';
import type { FlowersState } from '../state';

export function removeFlowerSupplierPending(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(removeFlowerSupplier.pending, (state) => {
    state.supplierOperationStatus = { status: 'pending' };
  });
}
