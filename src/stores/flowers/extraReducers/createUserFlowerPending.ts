import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function createUserFlowerPending(state: Draft<FlowersState>): void {
  state.createFlowerStatus = { status: 'pending' };
}
