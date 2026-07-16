import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateFlowerOverridePending(state: Draft<FlowersState>): void {
  state.updateFlowerOverrideStatus = { status: 'pending' };
}
