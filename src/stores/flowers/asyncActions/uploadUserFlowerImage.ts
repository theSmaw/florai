import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Flower } from '../../../domain/Flower';
import { uploadUserFlowerImage as uploadUserFlowerImageApi } from '../../../api/uploadUserFlowerImage';

// Reuses updateUserFlowerStatus for lifecycle tracking (see slice wiring) since a
// custom-flower image change is just another edit to the user_flowers row.
export const uploadUserFlowerImage = createAsyncThunk<
  Flower,
  { id: string; file: File; blobUrl: string }
>('flowers/uploadUserFlowerImage', async ({ id, file, blobUrl }) => {
  try {
    return await uploadUserFlowerImageApi(id, file);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
});
