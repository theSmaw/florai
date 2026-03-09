import type { RootState } from '../../store';

export const selectCurrentUserEmail = (state: RootState) =>
  state.auth.session?.user.email ?? null;
