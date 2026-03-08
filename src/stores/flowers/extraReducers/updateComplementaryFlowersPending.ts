import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateComplementaryFlowers } from '../asyncActions/updateComplementaryFlowers';
import type { FlowersState } from '../state';

export function updateComplementaryFlowersPending(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateComplementaryFlowers.pending, (state) => {
    state.updateComplementaryFlowersStatus = { status: 'pending' };
  });
}
