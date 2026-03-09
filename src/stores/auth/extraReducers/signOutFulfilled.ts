import type { Draft } from '@reduxjs/toolkit';
import type { AuthState } from '../state';

export function signOutFulfilled(state: Draft<AuthState>): void {
  state.session = null;
  state.loading = false;
  state.error = null;
}
