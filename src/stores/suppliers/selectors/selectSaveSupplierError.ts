import type { RootState } from '../../store';

export const selectSaveSupplierError = (state: RootState): string | null => {
  const s = state.suppliers.saveStatus;
  return s.status === 'rejected' ? s.errorMessage : null;
};
