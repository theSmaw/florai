import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectSaveSupplierStatus = (state: RootState): AsyncAction =>
  state.suppliers.saveStatus;
