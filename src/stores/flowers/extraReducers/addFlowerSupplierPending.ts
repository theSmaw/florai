import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { addFlowerSupplier } from '../asyncActions/addFlowerSupplier';
import type { FlowersState } from '../state';

export function addFlowerSupplierPending(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(addFlowerSupplier.pending, (state) => {
    state.supplierOperationStatus = { status: 'pending' };
  });
}
