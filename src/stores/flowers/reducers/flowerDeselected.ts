import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function flowerDeselected(state: Draft<FlowersState>): void {
  state.selectedFlowerId = null;
}
