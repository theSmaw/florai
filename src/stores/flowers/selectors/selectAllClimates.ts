import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Climate, Flower } from '../../../domain/Flower';

export const selectAllClimates = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): Climate[] => {
    const climateSet = new Set<Climate>();
    flowers.forEach((flower) => climateSet.add(flower.climate));
    return Array.from(climateSet).sort();
  },
);
