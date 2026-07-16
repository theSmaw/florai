import { createAsyncThunk } from '@reduxjs/toolkit';
import { upsertFlowerFieldOverride } from '../../../api/upsertFlowerFieldOverride';
import type { FlowerUpdate } from '../../../api/updateUserFlower';

export const updateFlowerOverride = createAsyncThunk<
  { flowerId: string; updates: FlowerUpdate },
  { flowerId: string; updates: FlowerUpdate }
>('flowers/updateFlowerOverride', async ({ flowerId, updates }) => {
  await upsertFlowerFieldOverride(flowerId, updates);
  return { flowerId, updates };
});
