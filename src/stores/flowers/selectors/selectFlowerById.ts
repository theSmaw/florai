import type { RootState } from '../../store';
import type { Flower } from '../../../domain/Flower';

export const selectFlowerById = (id: string) => (state: RootState): Flower | null =>
  state.flowers.flowers.find((f) => f.id === id) ?? null;
