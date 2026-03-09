import type { RootState } from '../../store';

export const selectAuthLoading = (state: RootState) => state.auth.loading;
