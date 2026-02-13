// Flowers slice using Redux Toolkit
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Flower, FlowerFilter } from '../../domain/Flower';

// Mock flower data
const mockFlowers: Flower[] = [
  {
    id: '1',
    name: 'Peony Sarah Bernhardt',
    color: ['pink'],
    type: 'Peony',
    wholesalePrice: 4.5,
    retailPrice: 8.99,
    supplier: 'Holland Flowers',
    origin: 'Netherlands',
    season: ['Spring'],
    availability: 'seasonal',
    quantityOnHand: 45,
    vaseLife: '7-10 days',
    careInstructions: 'Keep in cool water, change daily',
    notes: 'Beautiful full bloom, long lasting',
    complementaryFlowerIds: ['3', '6'],
  },
  {
    id: '2',
    name: 'Explorer Red Rose',
    color: ['red'],
    type: 'Rose',
    wholesalePrice: 2.25,
    retailPrice: 4.99,
    supplier: 'Ecuador Flowers',
    origin: 'Ecuador',
    season: ['Year-round'],
    availability: 'always',
    quantityOnHand: 120,
    vaseLife: '10-14 days',
    careInstructions: 'Remove lower leaves, fresh water daily',
    notes: 'Deep red color, excellent longevity',
    complementaryFlowerIds: ['1', '4'],
  },
  {
    id: '3',
    name: 'Blue Hydrangea',
    color: ['blue'],
    type: 'Hydrangea',
    wholesalePrice: 8.9,
    retailPrice: 14.99,
    supplier: 'Domestic Grower',
    origin: 'California',
    season: ['Summer'],
    availability: 'seasonal',
    quantityOnHand: 12,
    vaseLife: '10-12 days',
    careInstructions: 'Keep stems in water constantly',
    notes: 'Full heads, great filler flower',
    complementaryFlowerIds: ['1', '5'],
  },
  {
    id: '4',
    name: 'White Calla Lily',
    color: ['white'],
    type: 'Calla Lily',
    wholesalePrice: 3.75,
    retailPrice: 6.99,
    supplier: 'Holland Flowers',
    origin: 'Netherlands',
    season: ['Winter'],
    availability: 'seasonal',
    quantityOnHand: 0,
    vaseLife: '7-10 days',
    careInstructions: 'Keep cool, change water frequently',
    notes: 'Elegant and sophisticated',
    complementaryFlowerIds: ['2'],
  },
  {
    id: '5',
    name: 'Sunbeam Sunflower',
    color: ['yellow'],
    type: 'Sunflower',
    wholesalePrice: 1.5,
    retailPrice: 3.99,
    supplier: 'Domestic Grower',
    origin: 'Texas',
    season: ['Summer'],
    availability: 'seasonal',
    quantityOnHand: 88,
    vaseLife: '12-14 days',
    careInstructions: 'Change water every 2 days',
    notes: 'Bright and cheerful, long lasting',
    complementaryFlowerIds: ['3', '6'],
  },
  {
    id: '6',
    name: 'English Lavender',
    color: ['purple'],
    type: 'Lavender',
    wholesalePrice: 0.85,
    retailPrice: 2.49,
    supplier: 'UK Grower',
    origin: 'United Kingdom',
    season: ['Spring'],
    availability: 'seasonal',
    quantityOnHand: 300,
    vaseLife: '10-14 days',
    careInstructions: 'Dry or fresh, very hardy',
    notes: 'Fragrant, excellent for arrangements',
    complementaryFlowerIds: ['1', '2'],
  },
];

const initialFlowerListState = {
  flowers: mockFlowers,
  filter: {
    colors: [] as string[],
    groupBy: undefined as 'color' | 'type' | 'none' | undefined,
  } as FlowerFilter,
  selectedFlowerId: null as string | null,
  isLoading: false,
  error: null as string | null,
};

export const flowersSlice = createSlice({
  name: 'flowers',
  initialState: initialFlowerListState,
  reducers: {
    // ...existing code...
    flowersLoaded(state, action: PayloadAction<Flower[]>) {
      state.flowers = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    filterApplied(state, action: PayloadAction<FlowerFilter>) {
      state.filter = action.payload;
    },
    flowerSelected(state, action: PayloadAction<string>) {
      state.selectedFlowerId = action.payload;
    },
    flowerDeselected(state) {
      state.selectedFlowerId = null;
    },
    flowerUpdated(state, action: PayloadAction<Flower>) {
      const index = state.flowers.findIndex((f: Flower) => f.id === action.payload.id);
      if (index !== -1) {
        state.flowers[index] = action.payload;
      }
    },
    flowerAdded(state, action: PayloadAction<Flower>) {
      state.flowers.push(action.payload);
    },
    flowerRemoved(state, action: PayloadAction<string>) {
      state.flowers = state.flowers.filter((f: Flower) => f.id !== action.payload);
    },
    loadingStarted(state) {
      state.isLoading = true;
      state.error = null;
    },
    loadingFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // ...existing code...
  },
});

// Action creators are generated automatically
export const {
  flowersLoaded,
  filterApplied,
  flowerSelected,
  flowerDeselected,
  flowerUpdated,
  flowerAdded,
  flowerRemoved,
  loadingStarted,
  loadingFailed,
} = flowersSlice.actions;

// Reducer is exported as default
export default flowersSlice.reducer;

