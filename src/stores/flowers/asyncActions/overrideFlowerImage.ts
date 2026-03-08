import { createAsyncThunk } from '@reduxjs/toolkit';
import { upsertFlowerOverride } from '../../../api/upsertFlowerOverride';

export const overrideFlowerImage = createAsyncThunk(
  'flowers/overrideImage',
  async ({ flowerId, file, blobUrl }: { flowerId: string; file: File; blobUrl: string }) => {
    try {
      return await upsertFlowerOverride(flowerId, file);
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  },
);
