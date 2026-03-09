import type { RootState } from '../../store';

export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
