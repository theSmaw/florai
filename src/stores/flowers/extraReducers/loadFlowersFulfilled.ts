import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';
import type { Flower } from '../../../domain/Flower';

export function loadFlowersFulfilled(
  state: Draft<FlowersState>,
  action: PayloadAction<Flower[]>,
): void {
  state.flowers = action.payload;
  state.loadFlowersStatus = { status: 'fulfilled' };
}
