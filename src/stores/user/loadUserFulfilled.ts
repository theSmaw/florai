import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loadUser } from './asyncActions/loadUser';
import type { UserState } from './state';

export function loadUserFulfilled(builder: ActionReducerMapBuilder<UserState>): void {
  builder.addCase(loadUser.fulfilled, (state, action) => {
    state.user = action.payload;
    state.loadUserStatus = { status: 'fulfilled' };
  });
}
