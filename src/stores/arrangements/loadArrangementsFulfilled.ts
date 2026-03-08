import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loadArrangements } from './asyncActions/loadArrangements';
import type { ArrangementsState } from './state';

export function loadArrangementsFulfilled(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(loadArrangements.fulfilled, (state, action) => {
    state.arrangements = action.payload;
    state.loadStatus = { status: 'fulfilled' };
  });
}
