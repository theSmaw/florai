import { createAsyncThunk } from '@reduxjs/toolkit';
import { upsertCareInstructions } from '../../../api/upsertCareInstructions';

export const updateCareInstructions = createAsyncThunk(
  'flowers/updateCareInstructions',
  async ({ flowerId, careInstructions }: { flowerId: string; careInstructions: string }) => {
    await upsertCareInstructions(flowerId, careInstructions);
    return { flowerId, careInstructions };
  },
);
