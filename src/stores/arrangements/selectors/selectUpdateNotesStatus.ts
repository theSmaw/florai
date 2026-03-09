import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectUpdateNotesStatus = (state: RootState): AsyncAction =>
  state.arrangements.updateNotesStatus;
