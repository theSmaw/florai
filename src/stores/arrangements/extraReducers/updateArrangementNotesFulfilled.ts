import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function updateArrangementNotesFulfilled(
  state: Draft<ArrangementsState>,
  action: PayloadAction<{ arrangementId: string; notes: string }>,
): void {
  state.updateNotesStatus = { status: 'fulfilled' };
  const { arrangementId, notes } = action.payload;
  const arrangement = state.arrangements.find((a) => a.id === arrangementId);
  if (arrangement) {
    arrangement.notes = notes;
  }
}
