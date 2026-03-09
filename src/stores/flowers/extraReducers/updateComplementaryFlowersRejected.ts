import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateComplementaryFlowersRejected(
  state: Draft<FlowersState>,
  action: { error: SerializedError },
): void {
  state.updateComplementaryFlowersStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to update complementary flowers',
  };
}
