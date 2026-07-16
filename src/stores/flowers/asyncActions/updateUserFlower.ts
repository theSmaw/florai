import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Flower } from '../../../domain/Flower';
import { updateUserFlower as updateUserFlowerApi } from '../../../api/updateUserFlower';
import type { FlowerUpdate } from '../../../api/updateUserFlower';

export const updateUserFlower = createAsyncThunk<Flower, { id: string; updates: FlowerUpdate }>(
  'flowers/updateUserFlower',
  async ({ id, updates }) => {
    return updateUserFlowerApi(id, updates);
  },
);
