import type { Draft } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function uploadArrangementImagePending(
  state: Draft<ArrangementsState>,
  action: { meta: { arg: { arrangementId: string; blobUrl: string } } },
): void {
  state.uploadImageStatus = { status: 'pending' };
  const { arrangementId } = action.meta.arg;
  const arrangement = state.arrangements.find((a) => a.id === arrangementId);
  if (arrangement) {
    arrangement.imageUrl = action.meta.arg.blobUrl;
  }
}
