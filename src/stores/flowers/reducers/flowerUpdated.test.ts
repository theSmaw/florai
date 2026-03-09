import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { flowerUpdated } from './flowerUpdated';
import { makeFlower } from '../../__tests__/fixtures';

describe('flowerUpdated', () => {
  it('replaces the matching flower in the list', () => {
    const original = makeFlower();
    const updated = { ...original, name: 'Updated Rose' };
    const next = createNextState(
      { ...initialState, flowers: [original] },
      (draft) => flowerUpdated(draft, { type: 'flowers/flowerUpdated', payload: updated }),
    );
    expect(next.flowers[0]).toEqual(updated);
  });

  it('does nothing when flower id is not found', () => {
    const flower = makeFlower();
    const stranger = makeFlower({ id: 'unknown' });
    const next = createNextState(
      { ...initialState, flowers: [flower] },
      (draft) => flowerUpdated(draft, { type: 'flowers/flowerUpdated', payload: stranger }),
    );
    expect(next.flowers).toHaveLength(1);
    expect(next.flowers[0]).toEqual(flower);
  });
});
