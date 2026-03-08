import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadArrangements } from './asyncActions/loadArrangements';
import { createArrangement } from './asyncActions/createArrangement';
import { uploadArrangementImage } from './asyncActions/uploadArrangementImage';
import { updateArrangementNotes } from './asyncActions/updateArrangementNotes';
import type { Arrangement, ArrangementFilter } from '../../domain/Arrangement';
import type { AsyncAction } from '../AsyncAction';

const initialState = {
  arrangements: [] as Arrangement[],
  filter: { groupBy: 'none' } as ArrangementFilter,
  loadStatus: { status: 'idle' } as AsyncAction,
  createStatus: { status: 'idle' } as AsyncAction,
  uploadImageStatus: { status: 'idle' } as AsyncAction,
  updateNotesStatus: { status: 'idle' } as AsyncAction,
};

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
    builder
      // Load arrangements
      .addCase(loadArrangements.pending, (state) => {
        state.loadStatus = { status: 'pending' };
      })
      .addCase(loadArrangements.fulfilled, (state, action) => {
        state.arrangements = action.payload;
        state.loadStatus = { status: 'fulfilled' };
      })
      .addCase(loadArrangements.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.loadStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to load arrangements',
        };
      })
      // Create arrangement
      .addCase(createArrangement.pending, (state) => {
        state.createStatus = { status: 'pending' };
      })
      .addCase(createArrangement.fulfilled, (state, action) => {
        state.createStatus = { status: 'fulfilled' };
        state.arrangements.unshift(action.payload);
      })
      .addCase(createArrangement.rejected, (state, action) => {
        state.createStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to create arrangement',
        };
      })
      // Upload arrangement image
      .addCase(uploadArrangementImage.pending, (state, action) => {
        state.uploadImageStatus = { status: 'pending' };
        const { arrangementId } = action.meta.arg;
        const arrangement = state.arrangements.find((a) => a.id === arrangementId);
        if (arrangement) {
          arrangement.imageUrl = URL.createObjectURL(action.meta.arg.file);
        }
      })
      .addCase(uploadArrangementImage.fulfilled, (state, action) => {
        state.uploadImageStatus = { status: 'fulfilled' };
        const { arrangementId } = action.meta.arg;
        const arrangement = state.arrangements.find((a) => a.id === arrangementId);
        if (arrangement) {
          if (arrangement.imageUrl?.startsWith('blob:')) URL.revokeObjectURL(arrangement.imageUrl);
          arrangement.imageUrl = action.payload;
        }
      })
      .addCase(uploadArrangementImage.rejected, (state, action) => {
        state.uploadImageStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to upload image',
        };
      })
      // Update arrangement notes
      .addCase(updateArrangementNotes.pending, (state) => {
        state.updateNotesStatus = { status: 'pending' };
      })
      .addCase(updateArrangementNotes.fulfilled, (state, action) => {
        state.updateNotesStatus = { status: 'fulfilled' };
        const { arrangementId, notes } = action.payload;
        const arrangement = state.arrangements.find((a) => a.id === arrangementId);
        if (arrangement) {
          arrangement.notes = notes;
        }
      })
      .addCase(updateArrangementNotes.rejected, (state, action) => {
        state.updateNotesStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to update notes',
        };
      });
  },
});

export const { arrangementFilterApplied, arrangementAdded } = arrangementsSlice.actions;

export default arrangementsSlice.reducer;
