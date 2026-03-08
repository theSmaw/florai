import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loadFlowers } from '../asyncActions/loadFlowers';
import type { FlowersState } from '../state';

export function loadFlowersRejected(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(loadFlowers.rejected, (state, action) => {
    if (action.meta.aborted) return;
    state.loadFlowersStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to load flowers',
    };
  });
}
