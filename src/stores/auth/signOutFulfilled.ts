import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { signOut } from './asyncActions/signOut';
import type { AuthState } from './state';

export function signOutFulfilled(builder: ActionReducerMapBuilder<AuthState>): void {
  builder.addCase(signOut.fulfilled, (state) => {
    state.session = null;
    state.loading = false;
    state.error = null;
  });
}
