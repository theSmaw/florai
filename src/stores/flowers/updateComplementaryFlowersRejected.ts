import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateComplementaryFlowers } from './asyncActions/updateComplementaryFlowers';
import type { FlowersState } from './state';

export function updateComplementaryFlowersRejected(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateComplementaryFlowers.rejected, (state, action) => {
    state.updateComplementaryFlowersStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to update complementary flowers',
    };
  });
}
