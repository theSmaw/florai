import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectUpdateArrangementStatus = (state: RootState): AsyncAction =>
  state.arrangements.updateStatus;
