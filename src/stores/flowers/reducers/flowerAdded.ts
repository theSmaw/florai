import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { Flower } from '../../../domain/Flower';
import type { FlowersState } from '../state';

export function flowerAdded(state: Draft<FlowersState>, action: PayloadAction<Flower>): void {
  state.flowers.push(action.payload);
}
