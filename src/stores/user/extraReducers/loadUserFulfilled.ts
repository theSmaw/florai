import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from '../state';
import type { User } from '../../../domain/User';

export function loadUserFulfilled(state: Draft<UserState>, action: PayloadAction<User>): void {
  state.user = action.payload;
  state.loadUserStatus = { status: 'fulfilled' };
}
