import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function createUserFlowerRejected(
  state: Draft<FlowersState>,
  action: { error: SerializedError },
): void {
  state.createFlowerStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to create flower',
  };
}
