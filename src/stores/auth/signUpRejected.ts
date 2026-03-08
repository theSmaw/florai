import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { signUp } from './asyncActions/signUp';
import type { AuthState } from './state';

export function signUpRejected(builder: ActionReducerMapBuilder<AuthState>): void {
  builder.addCase(signUp.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message ?? 'Sign-up failed';
  });
}
