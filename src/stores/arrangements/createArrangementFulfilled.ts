import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createArrangement } from './asyncActions/createArrangement';
import type { ArrangementsState } from './state';

export function createArrangementFulfilled(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(createArrangement.fulfilled, (state, action) => {
    state.createStatus = { status: 'fulfilled' };
    state.arrangements.unshift(action.payload);
  });
}
