// Flowers slice using Redux Toolkit
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Flower, FlowerFilter } from '../../domain/Flower';

const initialFlowerListState = {
  flowers: [] as Flower[],
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
