import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function overrideFlowerImageFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<string, string, { arg: { flowerId: string } }>,
): void {
  state.overrideImageStatus = { status: 'fulfilled' };
  const { flowerId } = action.meta.arg;
  const flower = state.flowers.find((f) => f.id === flowerId);
  if (flower) {
    flower.imageUrl = action.payload;
  }
}
