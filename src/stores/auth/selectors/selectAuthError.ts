import type { RootState } from '../../store';

export const selectAuthError = (state: RootState) => state.auth.error;
