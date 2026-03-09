import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Arrangement, ArrangementOccasion } from '../../../domain/Arrangement';
import { SIZE_ORDER } from '../../../domain/Arrangement';
import { selectFilteredArrangements } from './selectFilteredArrangements';

export const selectGroupedArrangements = createSelector(
  selectFilteredArrangements,
  (state: RootState) => state.arrangements.filter.groupBy,
  (filtered: Arrangement[], groupBy = 'none'): Record<string, Arrangement[]> => {
    if (groupBy === 'size') {
      const grouped: Record<string, Arrangement[]> = {};
      for (const size of SIZE_ORDER) {
        const items = filtered.filter((a) => a.size === size);
        if (items.length > 0) grouped[size] = items;
      }
      return grouped;
    }

    if (groupBy === 'occasion') {
      const grouped: Record<string, Arrangement[]> = {};
      filtered.forEach((a) => {
        const occasions: ArrangementOccasion[] = a.occasion ?? ['everyday'];
        occasions.forEach((occ) => {
          if (!grouped[occ]) grouped[occ] = [];
          grouped[occ]!.push(a);
        });
      });
      return grouped;
    }

    return { All: filtered };
  },
);
