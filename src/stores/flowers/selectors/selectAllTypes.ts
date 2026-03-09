import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Flower, FlowerType } from '../../../domain/Flower';

export const selectAllTypes = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): FlowerType[] => {
    const typeSet = new Set<FlowerType>();
    flowers.forEach((flower) => typeSet.add(flower.type));
    return Array.from(typeSet).sort();
  },
);
