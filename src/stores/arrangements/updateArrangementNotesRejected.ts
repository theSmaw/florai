import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateArrangementNotes } from './asyncActions/updateArrangementNotes';
import type { ArrangementsState } from './state';

export function updateArrangementNotesRejected(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(updateArrangementNotes.rejected, (state, action) => {
    state.updateNotesStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to update notes',
    };
  });
}
