import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateCareInstructions } from '../asyncActions/updateCareInstructions';
import type { FlowersState } from '../state';

export function updateCareInstructionsFulfilled(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateCareInstructions.fulfilled, (state, action) => {
    state.updateCareInstructionsStatus = { status: 'fulfilled' };
    const { flowerId, careInstructions } = action.payload;
    const flower = state.flowers.find((f) => f.id === flowerId);
    if (flower) {
      flower.careInstructions = careInstructions;
    }
  });
}
