import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';
import type { Arrangement } from '../../../domain/Arrangement';

export function createArrangementFulfilled(
  state: Draft<ArrangementsState>,
  action: PayloadAction<Arrangement>,
): void {
  state.createStatus = { status: 'fulfilled' };
  state.arrangements.unshift(action.payload);
}
