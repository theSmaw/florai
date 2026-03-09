import type { Draft } from '@reduxjs/toolkit';
import type { ArrangementsState } from '../state';

export function createArrangementPending(state: Draft<ArrangementsState>): void {
  state.createStatus = { status: 'pending' };
}
