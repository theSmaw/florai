import type { Draft } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function updateArrangementNotesPending(state: Draft<ArrangementsState>): void {
  state.updateNotesStatus = { status: 'pending' };
}
