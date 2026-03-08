import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function flowerRemoved(state: Draft<FlowersState>, action: PayloadAction<string>): void {
  state.flowers = state.flowers.filter((f) => f.id !== action.payload);
}
