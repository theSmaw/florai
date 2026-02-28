// Flowers selectors
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Color, Flower, FlowerFilter, FlowerType, Season } from '../../domain/Flower';

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
  (flowers: Flower[]): Color[] => {
    const colorSet = new Set<Color>();
    flowers.forEach((flower) => flower.colors.forEach((c) => colorSet.add(c)));
    return Array.from(colorSet).sort();
  },
);

export const selectAllSeasons = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): Season[] => {
    const seasonSet = new Set<Season>();
    flowers.forEach((flower) => flower.season.forEach((s) => seasonSet.add(s)));
    return Array.from(seasonSet).sort();
  },
);

export const selectAllTypes = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): FlowerType[] => {
    const typeSet = new Set<FlowerType>();
    flowers.forEach((flower) => typeSet.add(flower.type));
    return Array.from(typeSet).sort();
  },
);

export const selectStemLengthBounds = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): { min: number; max: number } => {
    const lengths = flowers.map((f) => f.stemLengthCm).filter((l): l is number => l !== undefined);
    if (lengths.length === 0) return { min: 0, max: 100 };
    return { min: Math.min(...lengths), max: Math.max(...lengths) };
  },
);

export const selectVaseLifeBounds = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): { min: number; max: number } => {
    const days = flowers.map((f) => f.vaseLifeDays).filter((d): d is number => d !== undefined);
    if (days.length === 0) return { min: 0, max: 30 };
    return { min: Math.min(...days), max: Math.max(...days) };
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
      filtered = filtered.filter((flower) => flower.season.includes(filter.season as Season));
    }

    // Filter by fragrance level
    if (filter.fragranceLevel) {
      filtered = filtered.filter((flower) => flower.fragranceLevel === filter.fragranceLevel);
    }

    // Filter by toxicity
    if (filter.toxicity) {
      filtered = filtered.filter((flower) => flower.toxicity === filter.toxicity);
    }

    // Filter by stem length range
    if (filter.stemLengthRange) {
      const { min, max } = filter.stemLengthRange;
      filtered = filtered.filter(
        (flower) =>
          flower.stemLengthCm !== undefined &&
          flower.stemLengthCm >= min &&
          flower.stemLengthCm <= max,
      );
    }

    // Filter by vase life range
    if (filter.vaseLifeRange) {
      const { min, max } = filter.vaseLifeRange;
      filtered = filtered.filter(
        (flower) =>
          flower.vaseLifeDays !== undefined &&
          flower.vaseLifeDays >= min &&
          flower.vaseLifeDays <= max,
      );
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
