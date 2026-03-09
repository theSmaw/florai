import type { RootState } from '../../store';

export const selectSelectedFlowerId = (state: RootState): string | null =>
  state.flowers.selectedFlowerId;
