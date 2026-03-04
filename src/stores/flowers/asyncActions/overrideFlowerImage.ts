import { createAsyncThunk } from '@reduxjs/toolkit';
import { upsertFlowerOverride } from '../../../api/upsertFlowerOverride';

export const overrideFlowerImage = createAsyncThunk(
  'flowers/overrideImage',
  async ({ flowerId, file }: { flowerId: string; file: File }) =>
    upsertFlowerOverride(flowerId, file),
);
