import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { signIn } from './asyncActions/signIn';
import type { AuthState } from './state';

export function signInFulfilled(builder: ActionReducerMapBuilder<AuthState>): void {
  builder.addCase(signIn.fulfilled, (state, action) => {
    state.loading = false;
    state.session = action.payload;
  });
}
