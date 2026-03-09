import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateSourcingNotesRejected(
  state: Draft<FlowersState>,
  action: { error: SerializedError },
): void {
  state.updateSourcingNotesStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to update sourcing notes',
  };
}
