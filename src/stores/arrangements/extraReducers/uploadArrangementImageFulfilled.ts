import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { uploadArrangementImage } from '../asyncActions/uploadArrangementImage';
import type { ArrangementsState } from '../state';

export function uploadArrangementImageFulfilled(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(uploadArrangementImage.fulfilled, (state, action) => {
    state.uploadImageStatus = { status: 'fulfilled' };
    const { arrangementId } = action.meta.arg;
    const arrangement = state.arrangements.find((a) => a.id === arrangementId);
    if (arrangement) {
      arrangement.imageUrl = action.payload;
    }
  });
}
