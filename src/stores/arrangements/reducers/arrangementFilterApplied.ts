import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { ArrangementFilter } from '../../../domain/Arrangement';
import type { ArrangementsState } from '../state';

export function arrangementFilterApplied(
  state: Draft<ArrangementsState>,
  action: PayloadAction<ArrangementFilter>,
): void {
  state.filter = action.payload;
}
