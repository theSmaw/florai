import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function flowerSelected(state: Draft<FlowersState>, action: PayloadAction<string>): void {
  state.selectedFlowerId = action.payload;
}
