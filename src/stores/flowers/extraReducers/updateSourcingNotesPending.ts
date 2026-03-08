import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateSourcingNotes } from '../asyncActions/updateSourcingNotes';
import type { FlowersState } from '../state';

export function updateSourcingNotesPending(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(updateSourcingNotes.pending, (state) => {
    state.updateSourcingNotesStatus = { status: 'pending' };
  });
}
