import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function updateArrangementRejected(
  state: Draft<ArrangementsState>,
  action: { error: SerializedError },
): void {
  state.updateStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to update arrangement',
  };
}
