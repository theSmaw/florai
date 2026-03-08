import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loadArrangements } from './asyncActions/loadArrangements';
import type { ArrangementsState } from './state';

export function loadArrangementsRejected(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(loadArrangements.rejected, (state, action) => {
    if (action.meta.aborted) return;
    state.loadStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to load arrangements',
    };
  });
}
