import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateCareInstructionsRejected(
  state: Draft<FlowersState>,
  action: { error: SerializedError },
): void {
  state.updateCareInstructionsStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to update care instructions',
  };
}
