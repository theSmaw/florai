import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Flower, FlowerFilter, Season } from '../../../domain/Flower';

export const selectFilteredFlowers = createSelector(
  (state: RootState) => state.flowers.flowers,
  (state: RootState) => state.flowers.filter,
  (flowers: Flower[], filter: FlowerFilter): Flower[] => {
    let filtered = flowers;

    if (filter.colors.length > 0) {
      filtered = filtered.filter((flower) =>
        filter.colors.some((color) => flower.colors.includes(color)),
      );
    }

    if (filter.availability) {
      filtered = filtered.filter((flower) => flower.availability === filter.availability);
    }

    if (filter.type) {
      filtered = filtered.filter((flower) => flower.type === filter.type);
    }

    if (filter.season) {
      filtered = filtered.filter((flower) => flower.season.includes(filter.season as Season));
    }

    if (filter.climate) {
      filtered = filtered.filter((flower) => flower.climate === filter.climate);
    }

    if (filter.fragranceLevel) {
      filtered = filtered.filter((flower) => flower.fragranceLevel === filter.fragranceLevel);
    }

    if (filter.toxicity) {
      filtered = filtered.filter((flower) => flower.toxicity === filter.toxicity);
    }

    if (filter.stemLengthRange) {
      const { min, max } = filter.stemLengthRange;
      filtered = filtered.filter(
        (flower) =>
          flower.stemLengthCm !== undefined &&
          flower.stemLengthCm >= min &&
          flower.stemLengthCm <= max,
      );
    }

    if (filter.vaseLifeRange) {
      const { min, max } = filter.vaseLifeRange;
      filtered = filtered.filter(
        (flower) =>
          flower.vaseLifeDays !== undefined &&
          flower.vaseLifeDays >= min &&
          flower.vaseLifeDays <= max,
      );
    }

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
