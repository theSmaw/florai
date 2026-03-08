import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { loadUser } from './asyncActions/loadUser';
import type { UserState } from './state';

export function loadUserRejected(builder: ActionReducerMapBuilder<UserState>): void {
  builder.addCase(loadUser.rejected, (state, action) => {
    if (action.meta.aborted) return;
    state.loadUserStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to load user',
    };
  });
}
