import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { addFlowerSupplier } from './asyncActions/addFlowerSupplier';
import type { FlowersState } from './state';

export function addFlowerSupplierRejected(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(addFlowerSupplier.rejected, (state, action) => {
    state.supplierOperationStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to add supplier',
    };
  });
}
