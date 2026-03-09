import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function loadArrangementsRejected(
  state: Draft<ArrangementsState>,
  action: { error: SerializedError; meta: { aborted: boolean } },
): void {
  if (action.meta.aborted) return;
  state.loadStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to load arrangements',
  };
}
