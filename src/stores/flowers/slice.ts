import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { filterApplied as filterAppliedReducer } from './reducers/filterApplied';
import { flowerSelected as flowerSelectedReducer } from './reducers/flowerSelected';
import { flowerDeselected as flowerDeselectedReducer } from './reducers/flowerDeselected';
import { flowerUpdated as flowerUpdatedReducer } from './reducers/flowerUpdated';
import { flowerAdded as flowerAddedReducer } from './reducers/flowerAdded';
import { flowerRemoved as flowerRemovedReducer } from './reducers/flowerRemoved';
import { loadFlowers } from './asyncActions/loadFlowers';
import { overrideFlowerImage } from './asyncActions/overrideFlowerImage';
import { addFlowerSupplier } from './asyncActions/addFlowerSupplier';
import { updateFlowerSupplier } from './asyncActions/updateFlowerSupplier';
import { removeFlowerSupplier } from './asyncActions/removeFlowerSupplier';
import { updateCareInstructions } from './asyncActions/updateCareInstructions';
import { updateSourcingNotes } from './asyncActions/updateSourcingNotes';
import { updateComplementaryFlowers } from './asyncActions/updateComplementaryFlowers';
import { loadFlowersPending } from './extraReducers/loadFlowersPending';
import { loadFlowersFulfilled } from './extraReducers/loadFlowersFulfilled';
import { loadFlowersRejected } from './extraReducers/loadFlowersRejected';
import { overrideFlowerImagePending } from './extraReducers/overrideFlowerImagePending';
import { overrideFlowerImageFulfilled } from './extraReducers/overrideFlowerImageFulfilled';
import { overrideFlowerImageRejected } from './extraReducers/overrideFlowerImageRejected';
import { addFlowerSupplierPending } from './extraReducers/addFlowerSupplierPending';
import { addFlowerSupplierFulfilled } from './extraReducers/addFlowerSupplierFulfilled';
import { addFlowerSupplierRejected } from './extraReducers/addFlowerSupplierRejected';
import { updateFlowerSupplierPending } from './extraReducers/updateFlowerSupplierPending';
import { updateFlowerSupplierFulfilled } from './extraReducers/updateFlowerSupplierFulfilled';
import { updateFlowerSupplierRejected } from './extraReducers/updateFlowerSupplierRejected';
import { removeFlowerSupplierPending } from './extraReducers/removeFlowerSupplierPending';
import { removeFlowerSupplierFulfilled } from './extraReducers/removeFlowerSupplierFulfilled';
import { removeFlowerSupplierRejected } from './extraReducers/removeFlowerSupplierRejected';
import { updateCareInstructionsPending } from './extraReducers/updateCareInstructionsPending';
import { updateCareInstructionsFulfilled } from './extraReducers/updateCareInstructionsFulfilled';
import { updateCareInstructionsRejected } from './extraReducers/updateCareInstructionsRejected';
import { updateSourcingNotesPending } from './extraReducers/updateSourcingNotesPending';
import { updateSourcingNotesFulfilled } from './extraReducers/updateSourcingNotesFulfilled';
import { updateSourcingNotesRejected } from './extraReducers/updateSourcingNotesRejected';
import { updateComplementaryFlowersPending } from './extraReducers/updateComplementaryFlowersPending';
import { updateComplementaryFlowersFulfilled } from './extraReducers/updateComplementaryFlowersFulfilled';
import { updateComplementaryFlowersRejected } from './extraReducers/updateComplementaryFlowersRejected';

export const flowersSlice = createSlice({
  name: 'flowers',
  initialState,
  reducers: {
    filterApplied: filterAppliedReducer,
    flowerSelected: flowerSelectedReducer,
    flowerDeselected: flowerDeselectedReducer,
    flowerUpdated: flowerUpdatedReducer,
    flowerAdded: flowerAddedReducer,
    flowerRemoved: flowerRemovedReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFlowers.pending, loadFlowersPending)
      .addCase(loadFlowers.fulfilled, loadFlowersFulfilled)
      .addCase(loadFlowers.rejected, loadFlowersRejected)
      .addCase(overrideFlowerImage.pending, overrideFlowerImagePending)
      .addCase(overrideFlowerImage.fulfilled, overrideFlowerImageFulfilled)
      .addCase(overrideFlowerImage.rejected, overrideFlowerImageRejected)
      .addCase(addFlowerSupplier.pending, addFlowerSupplierPending)
      .addCase(addFlowerSupplier.fulfilled, addFlowerSupplierFulfilled)
      .addCase(addFlowerSupplier.rejected, addFlowerSupplierRejected)
      .addCase(updateFlowerSupplier.pending, updateFlowerSupplierPending)
      .addCase(updateFlowerSupplier.fulfilled, updateFlowerSupplierFulfilled)
      .addCase(updateFlowerSupplier.rejected, updateFlowerSupplierRejected)
      .addCase(removeFlowerSupplier.pending, removeFlowerSupplierPending)
      .addCase(removeFlowerSupplier.fulfilled, removeFlowerSupplierFulfilled)
      .addCase(removeFlowerSupplier.rejected, removeFlowerSupplierRejected)
      .addCase(updateCareInstructions.pending, updateCareInstructionsPending)
      .addCase(updateCareInstructions.fulfilled, updateCareInstructionsFulfilled)
      .addCase(updateCareInstructions.rejected, updateCareInstructionsRejected)
      .addCase(updateSourcingNotes.pending, updateSourcingNotesPending)
      .addCase(updateSourcingNotes.fulfilled, updateSourcingNotesFulfilled)
      .addCase(updateSourcingNotes.rejected, updateSourcingNotesRejected)
      .addCase(updateComplementaryFlowers.pending, updateComplementaryFlowersPending)
      .addCase(updateComplementaryFlowers.fulfilled, updateComplementaryFlowersFulfilled)
      .addCase(updateComplementaryFlowers.rejected, updateComplementaryFlowersRejected);
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
