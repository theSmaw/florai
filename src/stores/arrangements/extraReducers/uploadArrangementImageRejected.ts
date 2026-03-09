import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function uploadArrangementImageRejected(
  state: Draft<ArrangementsState>,
  action: { error: SerializedError },
): void {
  state.uploadImageStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to upload image',
  };
}
