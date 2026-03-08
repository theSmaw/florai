import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { Arrangement } from '../../../domain/Arrangement';
import type { ArrangementsState } from '../state';

export function arrangementAdded(
  state: Draft<ArrangementsState>,
  action: PayloadAction<Arrangement>,
): void {
  state.arrangements.unshift(action.payload);
}
