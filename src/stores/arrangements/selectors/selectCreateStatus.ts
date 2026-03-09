import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectCreateStatus = (state: RootState): AsyncAction =>
  state.arrangements.createStatus;
