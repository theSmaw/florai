import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadArrangementImage as uploadArrangementImageApi } from '../../../api/uploadArrangementImage';

export const uploadArrangementImage = createAsyncThunk<
  string,
  { arrangementId: string; file: File }
>('arrangements/uploadImage', ({ arrangementId, file }) =>
  uploadArrangementImageApi(arrangementId, file),
);
