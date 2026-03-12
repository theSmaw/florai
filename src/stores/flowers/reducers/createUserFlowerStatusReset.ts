import type { Draft } from '@reduxjs/toolkit';
import type { FlowersState } from '../state';

export function createUserFlowerStatusReset(state: Draft<FlowersState>): void {
  state.createFlowerStatus = { status: 'idle' };
}
