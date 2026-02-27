// Flowers selectors
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Flower, FlowerFilter } from '../../domain/Flower';

import type { AsyncAction } from '../AsyncAction';

// Basic state access
export const selectFlowersList = (state: RootState): Flower[] => state.flowers.flowers;

export const selectFlowersFilter = (state: RootState): FlowerFilter => state.flowers.filter;

export const selectSelectedFlowerId = (state: RootState): string | null =>
  state.flowers.selectedFlowerId;

export const selectLoadFlowersStatus = (state: RootState): AsyncAction =>
  state.flowers.loadFlowersStatus;

// Derived selectors
export const selectSelectedFlower = (state: RootState): Flower | null => {
  const selectedId = state.flowers.selectedFlowerId;
  if (!selectedId) return null;
  return state.flowers.flowers.find((f: Flower) => f.id === selectedId) ?? null;
};

export const selectAllColors = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): string[] => {
    const colorSet = new Set<string>();
    flowers.forEach((flower) => flower.colors.forEach((c) => colorSet.add(c)));
    return Array.from(colorSet).sort();
  },
);

export const selectAllSeasons = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): string[] => {
    const seasonSet = new Set<string>();
    flowers.forEach((flower) => flower.season.forEach((s) => seasonSet.add(s)));
    return Array.from(seasonSet).sort();
  },
);

export const selectAllTypes = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): string[] => {
    const typeSet = new Set<string>();
    flowers.forEach((flower) => typeSet.add(flower.type));
    return Array.from(typeSet).sort();
  },
);

export const selectFilteredFlowers = createSelector(
  (state: RootState) => state.flowers.flowers,
  (state: RootState) => state.flowers.filter,
  (flowers: Flower[], filter: FlowerFilter): Flower[] => {
    let filtered = flowers;

    // Filter by colors
    if (filter.colors.length > 0) {
      filtered = filtered.filter((flower) =>
        filter.colors.some((color) => flower.colors.includes(color)),
      );
    }

    // Filter by availability
    if (filter.availability) {
      filtered = filtered.filter((flower) => flower.availability === filter.availability);
    }

    // Filter by type
    if (filter.type) {
      filtered = filtered.filter((flower) => flower.type === filter.type);
    }

    // Filter by season
    if (filter.season) {
      filtered = filtered.filter((flower) => flower.season.includes(filter.season!));
    }

    // Filter by fragrance level
    if (filter.fragranceLevel) {
      filtered = filtered.filter((flower) => flower.fragranceLevel === filter.fragranceLevel);
    }

    // Filter by toxicity
    if (filter.toxicity) {
      filtered = filtered.filter((flower) => flower.toxicity === filter.toxicity);
    }

    // Filter by search term
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (flower) =>
          flower.name.toLowerCase().includes(term) ||
          flower.type.toLowerCase().includes(term) ||
          flower.notes.toLowerCase().includes(term),
      );
    }

    return filtered;
  },
);

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

export const selectComplementaryFlowers = (state: RootState): Flower[] => {
  const selected = selectSelectedFlower(state);
  if (!selected) return [];

  return state.flowers.flowers.filter((f: Flower) =>
    selected.complementaryFlowerIds.includes(f.id),
  );
};
