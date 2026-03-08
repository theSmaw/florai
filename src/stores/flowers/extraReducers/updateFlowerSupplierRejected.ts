import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateFlowerSupplier } from '../asyncActions/updateFlowerSupplier';
import type { FlowersState } from '../state';

export function updateFlowerSupplierRejected(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateFlowerSupplier.rejected, (state, action) => {
    state.supplierOperationStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to update supplier',
    };
  });
}
