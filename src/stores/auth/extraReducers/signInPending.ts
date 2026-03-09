import type { Draft } from '@reduxjs/toolkit';
import type { AuthState } from '../state';

export function signInPending(state: Draft<AuthState>): void {
  state.loading = true;
  state.error = null;
}
