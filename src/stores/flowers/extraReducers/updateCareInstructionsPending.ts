import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateCareInstructionsPending(state: Draft<FlowersState>): void {
  state.updateCareInstructionsStatus = { status: 'pending' };
}
