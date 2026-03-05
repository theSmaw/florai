import { createAsyncThunk } from '@reduxjs/toolkit';
import { upsertFlowerPrices } from '../../../api/upsertFlowerPrices';

export const updateFlowerPrices = createAsyncThunk(
  'flowers/updateFlowerPrices',
  async ({
    flowerId,
    wholesalePrice,
    retailPrice,
  }: {
    flowerId: string;
    wholesalePrice: number;
    retailPrice: number;
  }) => {
    await upsertFlowerPrices(flowerId, wholesalePrice, retailPrice);
    return { flowerId, wholesalePrice, retailPrice };
  },
);
