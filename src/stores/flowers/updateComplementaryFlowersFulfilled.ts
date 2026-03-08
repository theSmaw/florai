import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateComplementaryFlowers } from './asyncActions/updateComplementaryFlowers';
import type { FlowersState } from './state';

export function updateComplementaryFlowersFulfilled(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateComplementaryFlowers.fulfilled, (state, action) => {
    state.updateComplementaryFlowersStatus = { status: 'fulfilled' };
    const { flowerId, complementaryFlowerIds } = action.payload;
    const flower = state.flowers.find((f) => f.id === flowerId);
    if (flower) {
      flower.complementaryFlowerIds = complementaryFlowerIds;
    }
  });
}
