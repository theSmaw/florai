import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { signUp } from '../asyncActions/signUp';
import type { AuthState } from '../state';

export function signUpFulfilled(builder: ActionReducerMapBuilder<AuthState>): void {
  builder.addCase(signUp.fulfilled, (state, action) => {
    state.loading = false;
    state.session = action.payload;
  });
}
