import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loadFlowers } from './asyncActions/loadFlowers';
import type { FlowersState } from './state';

export function loadFlowersFulfilled(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(loadFlowers.fulfilled, (state, action) => {
    state.flowers = action.payload;
    state.loadFlowersStatus = { status: 'fulfilled' };
  });
}
