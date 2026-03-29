import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectLoadSuppliersStatus = (state: RootState): AsyncAction =>
  state.suppliers.loadStatus;
