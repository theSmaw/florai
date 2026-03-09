import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateCareInstructionsFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<{ flowerId: string; careInstructions: string }>,
): void {
  state.updateCareInstructionsStatus = { status: 'fulfilled' };
  const { flowerId, careInstructions } = action.payload;
  const flower = state.flowers.find((f) => f.id === flowerId);
  if (flower) {
    flower.careInstructions = careInstructions;
  }
}
