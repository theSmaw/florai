// Flowers slice using Redux Toolkit
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchFlowers } from '../../api/fetchFlowers';
import type { Flower, FlowerFilter } from '../../domain/Flower';

export const loadFlowers = createAsyncThunk('flowers/load', (_arg, thunkAPI) =>
  fetchFlowers(thunkAPI.signal),
);

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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadFlowers.fulfilled, (state, action) => {
        state.flowers = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadFlowers.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to load flowers';
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
