import type { RootState } from '../../store';
import type { Flower } from '../../../domain/Flower';

export const selectComplementaryFlowersByFlowerId =
  (flowerId: string) =>
  (state: RootState): Flower[] => {
    const flower = state.flowers.flowers.find((f) => f.id === flowerId);
    if (!flower) return [];
    return state.flowers.flowers.filter((f) => flower.complementaryFlowerIds.includes(f.id));
  };
