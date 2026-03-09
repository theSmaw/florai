import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateSourcingNotesFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<{ flowerId: string; notes: string }>,
): void {
  state.updateSourcingNotesStatus = { status: 'fulfilled' };
  const { flowerId, notes } = action.payload;
  const flower = state.flowers.find((f) => f.id === flowerId);
  if (flower) {
    flower.notes = notes;
  }
}
