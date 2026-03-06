import { createAsyncThunk } from '@reduxjs/toolkit';
import { upsertComplementaryFlowers } from '../../../api/upsertComplementaryFlowers';

export const updateComplementaryFlowers = createAsyncThunk(
  'flowers/updateComplementaryFlowers',
  async ({ flowerId, complementaryFlowerIds }: { flowerId: string; complementaryFlowerIds: string[] }) => {
    await upsertComplementaryFlowers(flowerId, complementaryFlowerIds);
    return { flowerId, complementaryFlowerIds };
  },
);
