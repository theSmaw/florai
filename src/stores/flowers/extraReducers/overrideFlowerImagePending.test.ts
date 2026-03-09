import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { overrideFlowerImagePending } from './overrideFlowerImagePending';
import { makeFlower } from '../../__tests__/fixtures';

describe('overrideFlowerImagePending', () => {
  it('sets overrideImageStatus to pending and optimistically sets blob url', () => {
    const flower = makeFlower({ id: 'f1' });
    const next = createNextState(
      { ...initialState, flowers: [flower] },
      (draft) =>
        overrideFlowerImagePending(draft, {
          meta: { arg: { flowerId: 'f1', blobUrl: 'blob:test' } },
        }),
    );
    expect(next.overrideImageStatus).toEqual({ status: 'pending' });
    expect(next.flowers[0]?.imageUrl).toBe('blob:test');
  });
});
