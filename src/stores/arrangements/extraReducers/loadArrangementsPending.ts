import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loadArrangements } from '../asyncActions/loadArrangements';
import type { ArrangementsState } from '../state';

export function loadArrangementsPending(builder: ActionReducerMapBuilder<ArrangementsState>): void {
  builder.addCase(loadArrangements.pending, (state) => {
    state.loadStatus = { status: 'pending' };
  });
}
