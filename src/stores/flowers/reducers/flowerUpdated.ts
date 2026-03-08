import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { Flower } from '../../../domain/Flower';
import type { FlowersState } from '../state';

export function flowerUpdated(state: Draft<FlowersState>, action: PayloadAction<Flower>): void {
  const index = state.flowers.findIndex((f) => f.id === action.payload.id);
  if (index !== -1) {
    state.flowers[index] = action.payload;
  }
}
