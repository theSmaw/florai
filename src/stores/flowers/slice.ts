// Flowers slice using Redux Toolkit
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadFlowers } from './asyncActions/loadFlowers';
import type { Flower, FlowerFilter } from '../../domain/Flower';
import type { AsyncAction } from '../AsyncAction';

const initialState = {
  flowers: [] as Flower[],
  filter: {
    colors: [] as string[],
    groupBy: undefined as 'color' | 'type' | 'none' | undefined,
  } as FlowerFilter,
  selectedFlowerId: null as string | null,
  loadFlowersStatus: { status: 'idle' } as AsyncAction,
};

export const flowersSlice = createSlice({
  name: 'flowers',
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFlowers.pending, (state) => {
        state.loadFlowersStatus = { status: 'pending' };
      })
      .addCase(loadFlowers.fulfilled, (state, action) => {
        state.flowers = action.payload;
        state.loadFlowersStatus = { status: 'fulfilled' };
      })
      .addCase(loadFlowers.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.loadFlowersStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to load flowers',
        };
      });
  },
});

// Action creators are generated automatically
export const {
  filterApplied,
  flowerSelected,
  flowerDeselected,
  flowerUpdated,
  flowerAdded,
  flowerRemoved,
} = flowersSlice.actions;

// Reducer is exported as default
export default flowersSlice.reducer;
