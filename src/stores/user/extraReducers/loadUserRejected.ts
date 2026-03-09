import type { Draft, SerializedError } from '@reduxjs/toolkit';
import type { UserState } from '../state';

export function loadUserRejected(
  state: Draft<UserState>,
  action: { error: SerializedError; meta: { aborted: boolean } },
): void {
  if (action.meta.aborted) return;
  state.loadUserStatus = {
    status: 'rejected',
    errorMessage: action.error.message ?? 'Failed to load user',
  };
}
