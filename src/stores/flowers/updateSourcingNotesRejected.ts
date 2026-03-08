import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateSourcingNotes } from './asyncActions/updateSourcingNotes';
import type { FlowersState } from './state';

export function updateSourcingNotesRejected(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateSourcingNotes.rejected, (state, action) => {
    state.updateSourcingNotesStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to update sourcing notes',
    };
  });
}
