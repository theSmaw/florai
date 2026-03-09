import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../state';
import type { Session } from '@supabase/supabase-js';

export function signInFulfilled(state: Draft<AuthState>, action: PayloadAction<Session>): void {
  state.loading = false;
  state.session = action.payload;
}
