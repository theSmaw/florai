import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';
import type { Flower } from '../../../domain/Flower';

export function createUserFlowerFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<Flower>,
): void {
  state.createFlowerStatus = { status: 'fulfilled' };
  state.flowers.unshift(action.payload);
}
