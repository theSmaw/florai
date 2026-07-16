import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function updateUserFlowerPending(state: Draft<FlowersState>): void {
  state.updateUserFlowerStatus = { status: 'pending' };
}
