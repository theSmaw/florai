import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectLoadArrangementsStatus = (state: RootState): AsyncAction =>
  state.arrangements.loadStatus;
