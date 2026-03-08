import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateCareInstructions } from '../asyncActions/updateCareInstructions';
import type { FlowersState } from '../state';

export function updateCareInstructionsRejected(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateCareInstructions.rejected, (state, action) => {
    state.updateCareInstructionsStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to update care instructions',
    };
  });
}
