import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { Flower } from '../../../domain/Flower';
import type { FlowerUpdate } from '../../../api/updateUserFlower';
import type { FlowersState } from '../state';

export function updateFlowerOverrideFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<{ flowerId: string; updates: FlowerUpdate }>,
): void {
  state.updateFlowerOverrideStatus = { status: 'fulfilled' };
  const { flowerId, updates } = action.payload;
  const flower = state.flowers.find((f) => f.id === flowerId);
  if (flower) {
    Object.assign(flower, updates as Partial<Flower>);
  }
}
