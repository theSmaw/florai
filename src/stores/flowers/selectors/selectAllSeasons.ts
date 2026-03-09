import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Flower, Season } from '../../../domain/Flower';

export const selectAllSeasons = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): Season[] => {
    const seasonSet = new Set<Season>();
    flowers.forEach((flower) => flower.season.forEach((s) => seasonSet.add(s)));
    return Array.from(seasonSet).sort();
  },
);
