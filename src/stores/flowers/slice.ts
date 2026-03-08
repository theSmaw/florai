import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { filterApplied as filterAppliedReducer } from './reducers/filterApplied';
import { flowerSelected as flowerSelectedReducer } from './reducers/flowerSelected';
import { flowerDeselected as flowerDeselectedReducer } from './reducers/flowerDeselected';
import { flowerUpdated as flowerUpdatedReducer } from './reducers/flowerUpdated';
import { flowerAdded as flowerAddedReducer } from './reducers/flowerAdded';
import { flowerRemoved as flowerRemovedReducer } from './reducers/flowerRemoved';
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
