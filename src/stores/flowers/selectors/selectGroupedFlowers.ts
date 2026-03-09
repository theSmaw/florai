import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Flower } from '../../../domain/Flower';
import { selectFilteredFlowers } from './selectFilteredFlowers';

export const selectGroupedFlowers = createSelector(
  selectFilteredFlowers,
  (state: RootState) => state.flowers.filter.groupBy,
  (filtered: Flower[], groupBy = 'none'): Record<string, Flower[]> => {
    if (groupBy === 'none') {
      return { 'All Flowers': filtered };
    }

    if (groupBy === 'color') {
      const grouped: Record<string, Flower[]> = {};
      filtered.forEach((flower) => {
        flower.colors.forEach((color) => {
          if (!grouped[color]) grouped[color] = [];
          grouped[color].push(flower);
        });
      });
      return grouped;
    }

    if (groupBy === 'type') {
      const grouped: Record<string, Flower[]> = {};
      filtered.forEach((flower) => {
        const key = flower.type;
        if (!grouped[key]) grouped[key] = [];
        grouped[key]!.push(flower);
      });
      return grouped;
    }

    return { 'All Flowers': filtered };
  },
);
