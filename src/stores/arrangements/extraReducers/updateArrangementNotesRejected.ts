import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function updateArrangementNotesRejected(
  state: Draft<ArrangementsState>,
  action: { error: SerializedError },
): void {
  state.updateNotesStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to update notes',
  };
}
