import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function removeFlowerSupplierRejected(
  state: Draft<FlowersState>,
  action: { error: SerializedError },
): void {
  state.supplierOperationStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to remove supplier',
  };
}
