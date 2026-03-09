import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../state';
import type { Session } from '@supabase/supabase-js';

export function signUpFulfilled(
  state: Draft<AuthState>,
  action: PayloadAction<Session | null>,
): void {
  state.loading = false;
  state.session = action.payload;
}
