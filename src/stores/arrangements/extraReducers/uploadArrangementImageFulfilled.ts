import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function uploadArrangementImageFulfilled(
  state: Draft<ArrangementsState>,
  action: PayloadAction<string, string, { arg: { arrangementId: string } }>,
): void {
  state.uploadImageStatus = { status: 'fulfilled' };
  const { arrangementId } = action.meta.arg;
  const arrangement = state.arrangements.find((a) => a.id === arrangementId);
  if (arrangement) {
    arrangement.imageUrl = action.payload;
  }
}
