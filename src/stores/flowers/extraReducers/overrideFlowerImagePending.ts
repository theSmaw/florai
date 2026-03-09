import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function overrideFlowerImagePending(
  state: Draft<FlowersState>,
  action: { meta: { arg: { flowerId: string; blobUrl: string } } },
): void {
  state.overrideImageStatus = { status: 'pending' };
  const { flowerId } = action.meta.arg;
  const flower = state.flowers.find((f) => f.id === flowerId);
  if (flower) {
    flower.imageUrl = action.meta.arg.blobUrl;
  }
}
