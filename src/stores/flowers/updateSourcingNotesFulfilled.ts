import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateSourcingNotes } from './asyncActions/updateSourcingNotes';
import type { FlowersState } from './state';

export function updateSourcingNotesFulfilled(
  builder: ActionReducerMapBuilder<FlowersState>,
): void {
  builder.addCase(updateSourcingNotes.fulfilled, (state, action) => {
    state.updateSourcingNotesStatus = { status: 'fulfilled' };
    const { flowerId, notes } = action.payload;
    const flower = state.flowers.find((f) => f.id === flowerId);
    if (flower) {
      flower.notes = notes;
    }
  });
}
