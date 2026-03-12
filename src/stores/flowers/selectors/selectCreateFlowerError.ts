import type { RootState } from '../../store';

export const selectCreateFlowerError = (state: RootState): string | null => {
  const s = state.flowers.createFlowerStatus;
  return s.status === 'rejected' ? s.errorMessage : null;
};
