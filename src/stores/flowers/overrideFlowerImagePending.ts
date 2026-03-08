import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { overrideFlowerImage } from './asyncActions/overrideFlowerImage';
import type { FlowersState } from './state';

export function overrideFlowerImagePending(builder: ActionReducerMapBuilder<FlowersState>): void {
  builder.addCase(overrideFlowerImage.pending, (state, action) => {
    state.overrideImageStatus = { status: 'pending' };
    const { flowerId } = action.meta.arg;
    const flower = state.flowers.find((f) => f.id === flowerId);
    if (flower) {
      flower.imageUrl = URL.createObjectURL(action.meta.arg.file);
    }
  });
}
