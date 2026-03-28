import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectDeleteSupplierStatus = (state: RootState): AsyncAction =>
  state.suppliers.deleteStatus;
