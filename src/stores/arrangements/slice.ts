import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Arrangement, ArrangementFilter } from '../../domain/Arrangement';
import { initialState } from './state';
import { loadArrangementsPending } from './loadArrangementsPending';
import { loadArrangementsFulfilled } from './loadArrangementsFulfilled';
import { loadArrangementsRejected } from './loadArrangementsRejected';
import { createArrangementPending } from './createArrangementPending';
import { createArrangementFulfilled } from './createArrangementFulfilled';
import { createArrangementRejected } from './createArrangementRejected';
import { uploadArrangementImagePending } from './uploadArrangementImagePending';
import { uploadArrangementImageFulfilled } from './uploadArrangementImageFulfilled';
import { uploadArrangementImageRejected } from './uploadArrangementImageRejected';
import { updateArrangementNotesPending } from './updateArrangementNotesPending';
import { updateArrangementNotesFulfilled } from './updateArrangementNotesFulfilled';
import { updateArrangementNotesRejected } from './updateArrangementNotesRejected';

export const arrangementsSlice = createSlice({
  name: 'arrangements',
  initialState,
  reducers: {
    arrangementFilterApplied(state, action: PayloadAction<ArrangementFilter>) {
      state.filter = action.payload;
    },
    arrangementAdded(state, action: PayloadAction<Arrangement>) {
      state.arrangements.unshift(action.payload);
    },
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
