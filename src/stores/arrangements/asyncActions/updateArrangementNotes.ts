import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateArrangementNotes as updateArrangementNotesApi } from '../../../api/updateArrangementNotes';

export const updateArrangementNotes = createAsyncThunk<
  { arrangementId: string; notes: string },
  { arrangementId: string; notes: string }
>('arrangements/updateNotes', async ({ arrangementId, notes }) => {
  await updateArrangementNotesApi(arrangementId, notes);
  return { arrangementId, notes };
});
