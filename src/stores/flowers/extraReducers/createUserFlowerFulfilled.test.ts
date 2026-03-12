import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { createUserFlowerFulfilled } from './createUserFlowerFulfilled';
import { makeFlower } from '../../__tests__/fixtures';

describe('createUserFlowerFulfilled', () => {
  it('sets createFlowerStatus to fulfilled and prepends flower', () => {
    const flower = makeFlower({ id: 'new-1', name: 'My Custom Rose' });
    const stateWithExisting = {
      ...initialState,
      flowers: [makeFlower({ id: 'existing-1', name: 'Existing Flower' })],
    };
    const next = createNextState(stateWithExisting, (draft) =>
      createUserFlowerFulfilled(draft, {
        type: 'flowers/createUserFlower/fulfilled',
        payload: flower,
      }),
    );
    expect(next.createFlowerStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]).toEqual(flower);
    expect(next.flowers).toHaveLength(2);
  });
});
