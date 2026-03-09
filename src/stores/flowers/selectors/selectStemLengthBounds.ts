import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Flower } from '../../../domain/Flower';

export const selectStemLengthBounds = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): { min: number; max: number } => {
    const lengths = flowers.map((f) => f.stemLengthCm).filter((l): l is number => l !== undefined);
    if (lengths.length === 0) return { min: 0, max: 100 };
    return { min: Math.min(...lengths), max: Math.max(...lengths) };
  },
);
