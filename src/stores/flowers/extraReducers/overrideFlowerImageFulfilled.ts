import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { overrideFlowerImage } from '../asyncActions/overrideFlowerImage';
import type { FlowersState } from '../state';

export function overrideFlowerImageFulfilled(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(overrideFlowerImage.fulfilled, (state, action) => {
    state.overrideImageStatus = { status: 'fulfilled' };
    const { flowerId } = action.meta.arg;
    const flower = state.flowers.find((f) => f.id === flowerId);
    if (flower) {
      if (flower.imageUrl?.startsWith('blob:')) URL.revokeObjectURL(flower.imageUrl);
      flower.imageUrl = action.payload;
    }
  });
}
