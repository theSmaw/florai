import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { SuppliersState } from '../state';

export function deleteSupplierRejected(
  state: Draft<SuppliersState>,
  action: { error: SerializedError; meta: { aborted: boolean } },
): void {
  if (action.meta.aborted) return;
  state.deleteStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to delete supplier',
  };
}
