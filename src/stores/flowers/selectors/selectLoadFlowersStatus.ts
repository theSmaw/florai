import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectLoadFlowersStatus = (state: RootState): AsyncAction =>
  state.flowers.loadFlowersStatus;
