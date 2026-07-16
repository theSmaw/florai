import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectUpdateFlowerOverrideStatus = (state: RootState): AsyncAction =>
  state.flowers.updateFlowerOverrideStatus;
