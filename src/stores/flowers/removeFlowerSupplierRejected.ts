import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { removeFlowerSupplier } from './asyncActions/removeFlowerSupplier';
import type { FlowersState } from './state';

export function removeFlowerSupplierRejected(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(removeFlowerSupplier.rejected, (state, action) => {
    state.supplierOperationStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to remove supplier',
    };
  });
}
