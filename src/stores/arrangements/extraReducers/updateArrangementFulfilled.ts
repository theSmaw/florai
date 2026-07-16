import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { Arrangement } from '../../../domain/Arrangement';
import type { ArrangementsState } from '../state';

export function updateArrangementFulfilled(
  state: Draft<ArrangementsState>,
  action: PayloadAction<Arrangement>,
): void {
  state.updateStatus = { status: 'fulfilled' };
  const index = state.arrangements.findIndex((a) => a.id === action.payload.id);
  if (index !== -1) {
    state.arrangements[index] = action.payload;
  }
}
