import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loadFlowers } from '../asyncActions/loadFlowers';
import type { FlowersState } from '../state';

export function loadFlowersPending(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(loadFlowers.pending, (state) => {
    state.loadFlowersStatus = { status: 'pending' };
  });
}
