import type { RootState } from '../../store';
import type { Flower } from '../../../domain/Flower';

export const selectSelectedFlower = (state: RootState): Flower | null => {
  const selectedId = state.flowers.selectedFlowerId;
  if (!selectedId) return null;
  return state.flowers.flowers.find((f: Flower) => f.id === selectedId) ?? null;
};
