import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectUpdateUserFlowerStatus = (state: RootState): AsyncAction =>
  state.flowers.updateUserFlowerStatus;
