import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { signUp } from './asyncActions/signUp';
import type { AuthState } from './state';

export function signUpPending(builder: ActionReducerMapBuilder<AuthState>): void {
  builder.addCase(signUp.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
}
