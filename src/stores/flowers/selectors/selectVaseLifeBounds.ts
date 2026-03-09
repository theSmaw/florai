import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Flower } from '../../../domain/Flower';

export const selectVaseLifeBounds = createSelector(
  (state: RootState) => state.flowers.flowers,
  (flowers: Flower[]): { min: number; max: number } => {
    const days = flowers.map((f) => f.vaseLifeDays).filter((d): d is number => d !== undefined);
    if (days.length === 0) return { min: 0, max: 30 };
    return { min: Math.min(...days), max: Math.max(...days) };
  },
);
