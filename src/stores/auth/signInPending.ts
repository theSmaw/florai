import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { signIn } from './asyncActions/signIn';
import type { AuthState } from './state';

export function signInPending(builder: ActionReducerMapBuilder<AuthState>): void {
  builder.addCase(signIn.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
}
