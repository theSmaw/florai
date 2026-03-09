import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateFlowerSupplierRejected(
  state: Draft<FlowersState>,
  action: { error: SerializedError },
): void {
  state.supplierOperationStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to update supplier',
  };
}
