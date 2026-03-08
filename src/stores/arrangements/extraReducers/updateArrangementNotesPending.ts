import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateArrangementNotes } from '../asyncActions/updateArrangementNotes';
import type { ArrangementsState } from '../state';

export function updateArrangementNotesPending(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(updateArrangementNotes.pending, (state) => {
    state.updateNotesStatus = { status: 'pending' };
  });
}
