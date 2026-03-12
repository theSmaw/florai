import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectCreateFlowerStatus = (state: RootState): AsyncAction =>
  state.flowers.createFlowerStatus;
