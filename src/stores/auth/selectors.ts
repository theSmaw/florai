import type { RootState } from '../store';

export const selectSession = (state: RootState) => state.auth.session;
export const selectIsAuthenticated = (state: RootState) => state.auth.session !== null;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectCurrentUserEmail = (state: RootState) =>
  state.auth.session?.user.email ?? null;
