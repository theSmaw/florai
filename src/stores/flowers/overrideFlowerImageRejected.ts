import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { overrideFlowerImage } from './asyncActions/overrideFlowerImage';
import type { FlowersState } from './state';

export function overrideFlowerImageRejected(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(overrideFlowerImage.rejected, (state, action) => {
    state.overrideImageStatus = {
      status: 'rejected',
      errorMessage: action.error.message ?? 'Failed to override image',
    };
  });
}
