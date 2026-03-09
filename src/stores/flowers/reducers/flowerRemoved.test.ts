import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { flowerRemoved } from './flowerRemoved';
import { makeFlower } from '../../__tests__/fixtures';

describe('flowerRemoved', () => {
  it('removes the flower with the given id', () => {
    const f1 = makeFlower({ id: 'f1' });
    const f2 = makeFlower({ id: 'f2' });
    const next = createNextState(
      { ...initialState, flowers: [f1, f2] },
      (draft) => flowerRemoved(draft, { type: 'flowers/flowerRemoved', payload: 'f1' }),
    );
    expect(next.flowers).toHaveLength(1);
    expect(next.flowers[0]?.id).toBe('f2');
  });
});
