import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { Session } from '@supabase/supabase-js';
import type { AuthState } from '../state';

export function sessionChanged(
  state: Draft<AuthState>,
  action: PayloadAction<Session | null>,
): void {
  state.session = action.payload;
  state.initialized = true;
  state.error = null;
}
