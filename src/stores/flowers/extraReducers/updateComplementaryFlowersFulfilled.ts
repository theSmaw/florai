import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateComplementaryFlowersFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<{ flowerId: string; complementaryFlowerIds: string[] }>,
): void {
  state.updateComplementaryFlowersStatus = { status: 'fulfilled' };
  const { flowerId, complementaryFlowerIds } = action.payload;
  const flower = state.flowers.find((f) => f.id === flowerId);
  if (flower) {
    flower.complementaryFlowerIds = complementaryFlowerIds;
  }
}
