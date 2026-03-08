import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadArrangementImage as uploadArrangementImageApi } from '../../../api/uploadArrangementImage';

export const uploadArrangementImage = createAsyncThunk<
  string,
  { arrangementId: string; file: File; blobUrl: string }
>('arrangements/uploadImage', async ({ arrangementId, file, blobUrl }) => {
  try {
    return await uploadArrangementImageApi(arrangementId, file);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
});
