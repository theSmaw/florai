import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Arrangement, ArrangementFilter, ArrangementOccasion } from '../../domain/Arrangement';
import { SIZE_ORDER } from '../../domain/Arrangement';
import type { AsyncAction } from '../AsyncAction';

export const selectArrangementsList = (state: RootState): Arrangement[] =>
  state.arrangements.arrangements;

export const selectArrangementsFilter = (state: RootState): ArrangementFilter =>
  state.arrangements.filter;

export const selectLoadArrangementsStatus = (state: RootState): AsyncAction =>
  state.arrangements.loadStatus;

export const selectCreateStatus = (state: RootState): AsyncAction =>
  state.arrangements.createStatus;

export const selectUploadImageStatus = (state: RootState): AsyncAction =>
  state.arrangements.uploadImageStatus;

export const selectUpdateNotesStatus = (state: RootState): AsyncAction =>
  state.arrangements.updateNotesStatus;

export const selectArrangementById = (id: string) => (state: RootState): Arrangement | null =>
  state.arrangements.arrangements.find((a) => a.id === id) ?? null;

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
