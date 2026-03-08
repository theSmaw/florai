import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { signIn } from './asyncActions/signIn';
import type { AuthState } from './state';

export function signInRejected(builder: ActionReducerMapBuilder<AuthState>): void {
  builder.addCase(signIn.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? 'Sign-in failed';
  });
}
