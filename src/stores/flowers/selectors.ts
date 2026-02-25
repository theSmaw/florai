// Flowers selectors
import type { RootState } from '../store';
import type { Flower, FlowerFilter } from '../../domain/Flower';

// Basic state access
export const selectFlowersList = (state: RootState): Flower[] => state.flowers.flowers;

export const selectFlowersFilter = (state: RootState): FlowerFilter => state.flowers.filter;

export const selectSelectedFlowerId = (state: RootState): string | null =>
  state.flowers.selectedFlowerId;

export const selectFlowersIsLoading = (state: RootState): boolean => state.flowers.isLoading;

export const selectFlowersError = (state: RootState): string | null => state.flowers.error;

// Derived selectors
export const selectSelectedFlower = (state: RootState): Flower | null => {
  const selectedId = state.flowers.selectedFlowerId;
  if (!selectedId) return null;
  return state.flowers.flowers.find((f: Flower) => f.id === selectedId) ?? null;
};

export const selectAllColors = (state: RootState): string[] => {
  const colorSet = new Set<string>();
  state.flowers.flowers.forEach((flower: Flower) => {
    flower.colors.forEach((c: string) => colorSet.add(c));
  });
  return Array.from(colorSet).sort();
};

export const selectFilteredFlowers = (state: RootState): Flower[] => {
  const { flowers, filter } = state.flowers;
  let filtered = flowers;

  // Filter by colors
  if (filter.colors.length > 0) {
    filtered = filtered.filter((flower: Flower) =>
      filter.colors.some((color: string) => flower.colors.includes(color)),
    );
  }

  // Filter by availability
  if (filter.availability) {
    filtered = filtered.filter((flower: Flower) => flower.availability === filter.availability);
  }

  // Filter by search term
  if (filter.searchTerm) {
    const term = filter.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (flower: Flower) =>
        flower.name.toLowerCase().includes(term) ||
        flower.type.toLowerCase().includes(term) ||
        flower.notes.toLowerCase().includes(term),
    );
  }

  return filtered;
};

export const selectGroupedFlowers = (state: RootState): Record<string, Flower[]> => {
  const filtered = selectFilteredFlowers(state);
  const groupBy = state.flowers.filter.groupBy || 'none';

  if (groupBy === 'none') {
    return { 'All Flowers': filtered };
  }

  if (groupBy === 'color') {
    const grouped: Record<string, Flower[]> = {};
    filtered.forEach((flower: Flower) => {
      flower.colors.forEach((color: string) => {
        if (!grouped[color]) {
          grouped[color] = [];
        }
        grouped[color].push(flower);
      });
    });
    return grouped;
  }

  if (groupBy === 'type') {
    const grouped: Record<string, Flower[]> = {};
    filtered.forEach((flower: Flower) => {
      const key = flower.type;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key]!.push(flower);
    });
    return grouped;
  }

  return { 'All Flowers': filtered };
};

export const selectComplementaryFlowers = (state: RootState): Flower[] => {
  const selected = selectSelectedFlower(state);
  if (!selected) return [];

  return state.flowers.flowers.filter((f: Flower) =>
    selected.complementaryFlowerIds.includes(f.id),
  );
};
