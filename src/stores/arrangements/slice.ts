import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { arrangementFilterApplied as arrangementFilterAppliedReducer } from './reducers/arrangementFilterApplied';
import { arrangementAdded as arrangementAddedReducer } from './reducers/arrangementAdded';
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
    loadArrangementsPending(builder);
    loadArrangementsFulfilled(builder);
    loadArrangementsRejected(builder);
    createArrangementPending(builder);
    createArrangementFulfilled(builder);
    createArrangementRejected(builder);
    uploadArrangementImagePending(builder);
    uploadArrangementImageFulfilled(builder);
    uploadArrangementImageRejected(builder);
    updateArrangementNotesPending(builder);
    updateArrangementNotesFulfilled(builder);
    updateArrangementNotesRejected(builder);
  },
});

export const { arrangementFilterApplied, arrangementAdded } = arrangementsSlice.actions;

export default arrangementsSlice.reducer;
