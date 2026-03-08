import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { FlowerFilter } from '../../../domain/Flower';
import type { FlowersState } from '../state';

export function filterApplied(
  state: Draft<FlowersState>,
  action: PayloadAction<FlowerFilter>,
): void {
  state.filter = action.payload;
}
