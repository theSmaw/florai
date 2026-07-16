import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateFlowerOverrideFulfilled } from './updateFlowerOverrideFulfilled';
import { makeFlower } from '../../__tests__/fixtures';

describe('updateFlowerOverrideFulfilled', () => {
  it('applies the override updates to the flower and marks status fulfilled', () => {
    const flower = makeFlower({ id: 'f1' });
    const next = createNextState({ ...initialState, flowers: [flower] }, (draft) =>
      updateFlowerOverrideFulfilled(draft, {
        type: 'flowers/updateFlowerOverride/fulfilled',
        payload: { flowerId: 'f1', updates: { vaseLifeDays: 21, toxicity: 'toxic' } },
      }),
    );
    expect(next.updateFlowerOverrideStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]?.vaseLifeDays).toBe(21);
    expect(next.flowers[0]?.toxicity).toBe('toxic');
  });

  it('is a no-op when the flower id is not found', () => {
    const flower = makeFlower({ id: 'f1', name: 'Keep' });
    const next = createNextState({ ...initialState, flowers: [flower] }, (draft) =>
      updateFlowerOverrideFulfilled(draft, {
        type: 'flowers/updateFlowerOverride/fulfilled',
        payload: { flowerId: 'missing', updates: { name: 'Nope' } },
      }),
    );
    expect(next.flowers[0]?.name).toBe('Keep');
  });
});
