import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { arrangementFilterApplied as arrangementFilterAppliedReducer } from './reducers/arrangementFilterApplied';
import { arrangementAdded as arrangementAddedReducer } from './reducers/arrangementAdded';
import { loadArrangements } from './asyncActions/loadArrangements';
import { createArrangement } from './asyncActions/createArrangement';
import { uploadArrangementImage } from './asyncActions/uploadArrangementImage';
import { updateArrangementNotes } from './asyncActions/updateArrangementNotes';
import { loadArrangementsPending } from './extraReducers/loadArrangementsPending';
import { loadArrangementsFulfilled } from './extraReducers/loadArrangementsFulfilled';
import { loadArrangementsRejected } from './extraReducers/loadArrangementsRejected';
import { createArrangementPending } from './extraReducers/createArrangementPending';
import { createArrangementFulfilled } from './extraReducers/createArrangementFulfilled';
import { createArrangementRejected } from './extraReducers/createArrangementRejected';
import { uploadArrangementImagePending } from './extraReducers/uploadArrangementImagePending';
import { uploadArrangementImageFulfilled } from './extraReducers/uploadArrangementImageFulfilled';
import { uploadArrangementImageRejected } from './extraReducers/uploadArrangementImageRejected';
import { updateArrangementNotesPending } from './extraReducers/updateArrangementNotesPending';
import { updateArrangementNotesFulfilled } from './extraReducers/updateArrangementNotesFulfilled';
import { updateArrangementNotesRejected } from './extraReducers/updateArrangementNotesRejected';

export const arrangementsSlice = createSlice({
  name: 'arrangements',
  initialState,
  reducers: {
    arrangementFilterApplied: arrangementFilterAppliedReducer,
    arrangementAdded: arrangementAddedReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArrangements.pending, loadArrangementsPending)
      .addCase(loadArrangements.fulfilled, loadArrangementsFulfilled)
      .addCase(loadArrangements.rejected, loadArrangementsRejected)
      .addCase(createArrangement.pending, createArrangementPending)
      .addCase(createArrangement.fulfilled, createArrangementFulfilled)
      .addCase(createArrangement.rejected, createArrangementRejected)
      .addCase(uploadArrangementImage.pending, uploadArrangementImagePending)
      .addCase(uploadArrangementImage.fulfilled, uploadArrangementImageFulfilled)
      .addCase(uploadArrangementImage.rejected, uploadArrangementImageRejected)
      .addCase(updateArrangementNotes.pending, updateArrangementNotesPending)
      .addCase(updateArrangementNotes.fulfilled, updateArrangementNotesFulfilled)
      .addCase(updateArrangementNotes.rejected, updateArrangementNotesRejected);
  },
});

export const { arrangementFilterApplied, arrangementAdded } = arrangementsSlice.actions;

export default arrangementsSlice.reducer;
