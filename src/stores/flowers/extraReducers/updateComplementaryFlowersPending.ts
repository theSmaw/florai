import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateComplementaryFlowersPending(state: Draft<FlowersState>): void {
  state.updateComplementaryFlowersStatus = { status: 'pending' };
}
