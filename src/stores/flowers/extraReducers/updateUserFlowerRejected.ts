import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateUserFlowerRejected(
  state: Draft<FlowersState>,
  action: { error: SerializedError },
): void {
  state.updateUserFlowerStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to update flower',
  };
}
