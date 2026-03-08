import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateCareInstructions } from './asyncActions/updateCareInstructions';
import type { FlowersState } from './state';

export function updateCareInstructionsPending(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateCareInstructions.pending, (state) => {
    state.updateCareInstructionsStatus = { status: 'pending' };
  });
}
