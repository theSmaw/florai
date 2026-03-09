import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Arrangement, ArrangementFilter } from '../../../domain/Arrangement';

export const selectFilteredArrangements = createSelector(
  (state: RootState) => state.arrangements.arrangements,
  (state: RootState) => state.arrangements.filter,
  (arrangements: Arrangement[], filter: ArrangementFilter): Arrangement[] => {
    let filtered = arrangements;

    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      filtered = filtered.filter((a) => a.name.toLowerCase().includes(term));
    }

    if (filter.size) {
      filtered = filtered.filter((a) => a.size === filter.size);
    }

    if (filter.style) {
      filtered = filtered.filter((a) => a.style === filter.style);
    }

    if (filter.occasion) {
      const occ = filter.occasion;
      filtered = filtered.filter((a) => a.occasion?.includes(occ) ?? false);
    }

    return filtered;
  },
);
