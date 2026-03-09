import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function overrideFlowerImageRejected(
  state: Draft<FlowersState>,
  action: { error: SerializedError },
): void {
  state.overrideImageStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to override image',
  };
}
