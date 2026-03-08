import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { uploadArrangementImage } from '../asyncActions/uploadArrangementImage';
import type { ArrangementsState } from '../state';

export function uploadArrangementImageRejected(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(uploadArrangementImage.rejected, (state, action) => {
    state.uploadImageStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to upload image',
    };
  });
}
