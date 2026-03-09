import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { flowerAdded } from './flowerAdded';
import { makeFlower } from '../../__tests__/fixtures';

describe('flowerAdded', () => {
  it('appends the flower to the list', () => {
    const flower = makeFlower();
    const next = createNextState(initialState, (draft) =>
      flowerAdded(draft, { type: 'flowers/flowerAdded', payload: flower }),
    );
    expect(next.flowers).toHaveLength(1);
    expect(next.flowers[0]).toEqual(flower);
  });
});
