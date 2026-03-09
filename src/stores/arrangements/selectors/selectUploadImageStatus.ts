import type { RootState } from '../../store';
import type { AsyncAction } from '../../AsyncAction';

export const selectUploadImageStatus = (state: RootState): AsyncAction =>
  state.arrangements.uploadImageStatus;
