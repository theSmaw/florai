import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { overrideFlowerImageFulfilled } from './overrideFlowerImageFulfilled';
import { makeFlower } from '../../__tests__/fixtures';

describe('overrideFlowerImageFulfilled', () => {
  it('sets overrideImageStatus to fulfilled and updates image url', () => {
    const flower = makeFlower({ id: 'f1', imageUrl: 'blob:test' });
    const next = createNextState(
      { ...initialState, flowers: [flower] },
      (draft) =>
        overrideFlowerImageFulfilled(draft, {
          type: 'flowers/overrideImage/fulfilled',
          payload: 'https://cdn/rose.jpg',
          meta: { arg: { flowerId: 'f1' } },
        }),
    );
    expect(next.overrideImageStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]?.imageUrl).toBe('https://cdn/rose.jpg');
  });
});
