import type { Draft } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function loadArrangementsPending(state: Draft<ArrangementsState>): void {
  state.loadStatus = { status: 'pending' };
}
