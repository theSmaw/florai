import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createArrangement } from '../asyncActions/createArrangement';
import type { ArrangementsState } from '../state';

export function createArrangementRejected(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(createArrangement.rejected, (state, action) => {
    state.createStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to create arrangement',
    };
  });
}
