import type { Draft } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function updateArrangementPending(state: Draft<ArrangementsState>): void {
  state.updateStatus = { status: 'pending' };
}
