import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createArrangement } from './asyncActions/createArrangement';
import type { ArrangementsState } from './state';

export function createArrangementPending(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(createArrangement.pending, (state) => {
    state.createStatus = { status: 'pending' };
  });
}
