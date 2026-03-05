import { createAsyncThunk } from '@reduxjs/toolkit';
import { upsertFlowerPrices } from '../../../api/upsertFlowerPrices';

export const updateFlowerPrices = createAsyncThunk(
  'flowers/updateFlowerPrices',
  async ({ flowerId, wholesalePrice }: { flowerId: string; wholesalePrice: number }) => {
    await upsertFlowerPrices(flowerId, wholesalePrice);
    return { flowerId, wholesalePrice };
  },
);
