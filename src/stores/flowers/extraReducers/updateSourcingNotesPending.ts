import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateSourcingNotesPending(state: Draft<FlowersState>): void {
  state.updateSourcingNotesStatus = { status: 'pending' };
}
