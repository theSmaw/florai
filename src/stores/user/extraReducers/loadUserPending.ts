import type { Draft } from '@reduxjs/toolkit';
import type { UserState } from '../state';

export function loadUserPending(state: Draft<UserState>): void {
  state.loadUserStatus = { status: 'pending' };
}
