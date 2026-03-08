import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Flower, FlowerFilter } from '../../domain/Flower';
import { initialState } from './state';
import { loadFlowersPending } from './loadFlowersPending';
import { loadFlowersFulfilled } from './loadFlowersFulfilled';
import { loadFlowersRejected } from './loadFlowersRejected';
import { overrideFlowerImagePending } from './overrideFlowerImagePending';
import { overrideFlowerImageFulfilled } from './overrideFlowerImageFulfilled';
import { overrideFlowerImageRejected } from './overrideFlowerImageRejected';
import { addFlowerSupplierPending } from './addFlowerSupplierPending';
import { addFlowerSupplierFulfilled } from './addFlowerSupplierFulfilled';
import { addFlowerSupplierRejected } from './addFlowerSupplierRejected';
import { updateFlowerSupplierPending } from './updateFlowerSupplierPending';
import { updateFlowerSupplierFulfilled } from './updateFlowerSupplierFulfilled';
import { updateFlowerSupplierRejected } from './updateFlowerSupplierRejected';
import { removeFlowerSupplierPending } from './removeFlowerSupplierPending';
import { removeFlowerSupplierFulfilled } from './removeFlowerSupplierFulfilled';
import { removeFlowerSupplierRejected } from './removeFlowerSupplierRejected';
import { updateCareInstructionsPending } from './updateCareInstructionsPending';
import { updateCareInstructionsFulfilled } from './updateCareInstructionsFulfilled';
import { updateCareInstructionsRejected } from './updateCareInstructionsRejected';
import { updateSourcingNotesPending } from './updateSourcingNotesPending';
import { updateSourcingNotesFulfilled } from './updateSourcingNotesFulfilled';
import { updateSourcingNotesRejected } from './updateSourcingNotesRejected';
import { updateComplementaryFlowersPending } from './updateComplementaryFlowersPending';
import { updateComplementaryFlowersFulfilled } from './updateComplementaryFlowersFulfilled';
import { updateComplementaryFlowersRejected } from './updateComplementaryFlowersRejected';

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
    loadFlowersPending(builder);
    loadFlowersFulfilled(builder);
    loadFlowersRejected(builder);
    overrideFlowerImagePending(builder);
    overrideFlowerImageFulfilled(builder);
    overrideFlowerImageRejected(builder);
    addFlowerSupplierPending(builder);
    addFlowerSupplierFulfilled(builder);
    addFlowerSupplierRejected(builder);
    updateFlowerSupplierPending(builder);
    updateFlowerSupplierFulfilled(builder);
    updateFlowerSupplierRejected(builder);
    removeFlowerSupplierPending(builder);
    removeFlowerSupplierFulfilled(builder);
    removeFlowerSupplierRejected(builder);
    updateCareInstructionsPending(builder);
    updateCareInstructionsFulfilled(builder);
    updateCareInstructionsRejected(builder);
    updateSourcingNotesPending(builder);
    updateSourcingNotesFulfilled(builder);
    updateSourcingNotesRejected(builder);
    updateComplementaryFlowersPending(builder);
    updateComplementaryFlowersFulfilled(builder);
    updateComplementaryFlowersRejected(builder);
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
