import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { Flower } from '../../../domain/Flower';
import type { FlowersState } from '../state';

export function updateUserFlowerFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<Flower>,
): void {
  state.updateUserFlowerStatus = { status: 'fulfilled' };
  const index = state.flowers.findIndex((f) => f.id === action.payload.id);
  if (index !== -1) {
    state.flowers[index] = action.payload;
  }
}
