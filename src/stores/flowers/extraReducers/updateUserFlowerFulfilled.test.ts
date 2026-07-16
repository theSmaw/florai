import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateUserFlowerFulfilled } from './updateUserFlowerFulfilled';
import { makeFlower } from '../../__tests__/fixtures';

describe('updateUserFlowerFulfilled', () => {
  it('replaces the flower with the payload and marks status fulfilled', () => {
    const original = makeFlower({ id: 'f1', name: 'Old name' });
    const updated = makeFlower({ id: 'f1', name: 'New name' });
    const next = createNextState({ ...initialState, flowers: [original] }, (draft) =>
      updateUserFlowerFulfilled(draft, {
        type: 'flowers/updateUserFlower/fulfilled',
        payload: updated,
      }),
    );
    expect(next.updateUserFlowerStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]?.name).toBe('New name');
  });

  it('leaves the list unchanged when the id is not found', () => {
    const original = makeFlower({ id: 'f1' });
    const updated = makeFlower({ id: 'missing', name: 'Nope' });
    const next = createNextState({ ...initialState, flowers: [original] }, (draft) =>
      updateUserFlowerFulfilled(draft, {
        type: 'flowers/updateUserFlower/fulfilled',
        payload: updated,
      }),
    );
    expect(next.flowers).toHaveLength(1);
    expect(next.flowers[0]?.id).toBe('f1');
  });
});
