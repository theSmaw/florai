import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function loadFlowersPending(state: Draft<FlowersState>): void {
  state.loadFlowersStatus = { status: 'pending' };
}
