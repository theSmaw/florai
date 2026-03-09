import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { AuthState } from '../state';

export function signInRejected(
  state: Draft<AuthState>,
  action: { error: SerializedError },
): void {
  state.loading = false;
  state.error = action.error.message ?? 'Sign-in failed';
}
