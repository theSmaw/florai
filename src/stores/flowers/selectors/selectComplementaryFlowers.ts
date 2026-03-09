import type { RootState } from '../../store';
import type { Flower } from '../../../domain/Flower';
import { selectSelectedFlower } from './selectSelectedFlower';

export const selectComplementaryFlowers = (state: RootState): Flower[] => {
  const selected = selectSelectedFlower(state);
  if (!selected) return [];

  return state.flowers.flowers.filter((f: Flower) =>
    selected.complementaryFlowerIds.includes(f.id),
  );
};
