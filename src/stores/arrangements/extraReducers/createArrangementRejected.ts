import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function createArrangementRejected(
  state: Draft<ArrangementsState>,
  action: { error: SerializedError },
): void {
  state.createStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to create arrangement',
  };
}
