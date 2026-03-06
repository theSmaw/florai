import { createAsyncThunk } from '@reduxjs/toolkit';
import { upsertSourcingNotes } from '../../../api/upsertSourcingNotes';

export const updateSourcingNotes = createAsyncThunk(
  'flowers/updateSourcingNotes',
  async ({ flowerId, notes }: { flowerId: string; notes: string }) => {
    await upsertSourcingNotes(flowerId, notes);
    return { flowerId, notes };
  },
);
