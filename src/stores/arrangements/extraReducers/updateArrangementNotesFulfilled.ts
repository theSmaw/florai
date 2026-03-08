import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateArrangementNotes } from '../asyncActions/updateArrangementNotes';
import type { ArrangementsState } from '../state';

export function updateArrangementNotesFulfilled(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(updateArrangementNotes.fulfilled, (state, action) => {
    state.updateNotesStatus = { status: 'fulfilled' };
    const { arrangementId, notes } = action.payload;
    const arrangement = state.arrangements.find((a) => a.id === arrangementId);
    if (arrangement) {
      arrangement.notes = notes;
    }
  });
}
