import { createAsyncThunk } from '@reduxjs/toolkit';
import { createArrangement as createArrangementApi } from '../../../api/createArrangement';
import { uploadNewEntityImage } from '../../../api/uploadNewEntityImage';
import type { Arrangement, NewArrangement } from '../../../domain/Arrangement';

export const createArrangement = createAsyncThunk<Arrangement, { arrangement: NewArrangement; imageFile?: File }>(
  'arrangements/create',
  async ({ arrangement, imageFile }) => {
    if (imageFile) {
      const imageUrl = await uploadNewEntityImage('arrangement-images', imageFile);
      return createArrangementApi({ ...arrangement, imageUrl });
    }
    return createArrangementApi(arrangement);
  },
);
