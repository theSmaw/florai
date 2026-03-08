import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loadUser } from '../asyncActions/loadUser';
import type { UserState } from '../state';

export function loadUserPending(builder: ActionReducerMapBuilder<UserState>): void {
  builder.addCase(loadUser.pending, (state) => {
    state.loadUserStatus = { status: 'pending' };
  });
}
