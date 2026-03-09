import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Color, Flower } from '../../../domain/Flower';

export const selectAllColors = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): Color[] => {
    const colorSet = new Set<Color>();
    flowers.forEach((flower) => flower.colors.forEach((c) => colorSet.add(c)));
    return Array.from(colorSet).sort();
  },
);
