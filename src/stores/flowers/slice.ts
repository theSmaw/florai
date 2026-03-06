// Flowers slice using Redux Toolkit
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadFlowers } from './asyncActions/loadFlowers';
import { overrideFlowerImage } from './asyncActions/overrideFlowerImage';
import { addFlowerSupplier } from './asyncActions/addFlowerSupplier';
import { updateFlowerSupplier } from './asyncActions/updateFlowerSupplier';
import { removeFlowerSupplier } from './asyncActions/removeFlowerSupplier';
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
  overrideImageStatus: { status: 'idle' } as AsyncAction,
  supplierOperationStatus: { status: 'idle' } as AsyncAction,
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
      })
      // Override flower image
      .addCase(overrideFlowerImage.pending, (state, action) => {
        state.overrideImageStatus = { status: 'pending' };
        // Optimistic update: create a temporary object URL for immediate feedback
        const { flowerId } = action.meta.arg;
        const flower = state.flowers.find((f) => f.id === flowerId);
        if (flower) {
          flower.imageUrl = URL.createObjectURL(action.meta.arg.file);
        }
      })
      .addCase(overrideFlowerImage.fulfilled, (state, action) => {
        state.overrideImageStatus = { status: 'fulfilled' };
        // Replace temp blob URL with the real storage URL
        const { flowerId } = action.meta.arg;
        const flower = state.flowers.find((f) => f.id === flowerId);
        if (flower) {
          flower.imageUrl = action.payload;
        }
      })
      .addCase(overrideFlowerImage.rejected, (state, action) => {
        state.overrideImageStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to override image',
        };
      })
      // Add flower supplier
      .addCase(addFlowerSupplier.pending, (state) => {
        state.supplierOperationStatus = { status: 'pending' };
      })
      .addCase(addFlowerSupplier.fulfilled, (state, action) => {
        state.supplierOperationStatus = { status: 'fulfilled' };
        const { flowerId, supplier } = action.payload;
        const flower = state.flowers.find((f) => f.id === flowerId);
        if (flower) {
          flower.suppliers.push(supplier);
        }
      })
      .addCase(addFlowerSupplier.rejected, (state, action) => {
        state.supplierOperationStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to add supplier',
        };
      })
      // Update flower supplier
      .addCase(updateFlowerSupplier.pending, (state) => {
        state.supplierOperationStatus = { status: 'pending' };
      })
      .addCase(updateFlowerSupplier.fulfilled, (state, action) => {
        state.supplierOperationStatus = { status: 'fulfilled' };
        const { flowerId, id, name, wholesalePrice } = action.payload;
        const flower = state.flowers.find((f) => f.id === flowerId);
        if (flower) {
          const supplier = flower.suppliers.find((s) => s.id === id);
          if (supplier) {
            supplier.name = name;
            supplier.wholesalePrice = wholesalePrice;
          }
        }
      })
      .addCase(updateFlowerSupplier.rejected, (state, action) => {
        state.supplierOperationStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to update supplier',
        };
      })
      // Remove flower supplier
      .addCase(removeFlowerSupplier.pending, (state) => {
        state.supplierOperationStatus = { status: 'pending' };
      })
      .addCase(removeFlowerSupplier.fulfilled, (state, action) => {
        state.supplierOperationStatus = { status: 'fulfilled' };
        const { flowerId, supplierId } = action.payload;
        const flower = state.flowers.find((f) => f.id === flowerId);
        if (flower) {
          flower.suppliers = flower.suppliers.filter((s) => s.id !== supplierId);
        }
      })
      .addCase(removeFlowerSupplier.rejected, (state, action) => {
        state.supplierOperationStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to remove supplier',
        };
      });
  },
});

export const {
  filterApplied,
  flowerSelected,
  flowerDeselected,
  flowerUpdated,
  flowerAdded,
  flowerRemoved,
} = flowersSlice.actions;

export default flowersSlice.reducer;
