import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserFlower as createUserFlowerApi } from '../../../api/createUserFlower';
import { uploadNewEntityImage } from '../../../api/uploadNewEntityImage';
import type { Flower, NewFlower } from '../../../domain/Flower';

export const createUserFlower = createAsyncThunk<Flower, { flower: NewFlower; imageFile?: File }>(
  'flowers/createUserFlower',
  async ({ flower, imageFile }) => {
    if (imageFile) {
      const imageUrl = await uploadNewEntityImage('flower-images', imageFile);
      return createUserFlowerApi({ ...flower, imageUrl });
    }
    return createUserFlowerApi(flower);
  },
);
