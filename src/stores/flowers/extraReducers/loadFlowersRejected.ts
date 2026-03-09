import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function loadFlowersRejected(
  state: Draft<FlowersState>,
  action: { error: SerializedError; meta: { aborted: boolean } },
): void {
  if (action.meta.aborted) return;
  state.loadFlowersStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to load flowers',
  };
}
