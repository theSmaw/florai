import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { uploadArrangementImage } from '../asyncActions/uploadArrangementImage';
import type { ArrangementsState } from '../state';

export function uploadArrangementImagePending(
  builder: ActionReducerMapBuilder<ArrangementsState>,
): void {
  builder.addCase(uploadArrangementImage.pending, (state, action) => {
    state.uploadImageStatus = { status: 'pending' };
    const { arrangementId } = action.meta.arg;
    const arrangement = state.arrangements.find((a) => a.id === arrangementId);
    if (arrangement) {
      arrangement.imageUrl = URL.createObjectURL(action.meta.arg.file);
    }
  });
}
