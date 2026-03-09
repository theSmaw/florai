import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';
import type { Arrangement } from '../../../domain/Arrangement';

export function loadArrangementsFulfilled(
  state: Draft<ArrangementsState>,
  action: PayloadAction<Arrangement[]>,
): void {
  state.arrangements = action.payload;
  state.loadStatus = { status: 'fulfilled' };
}
