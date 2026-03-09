import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { flowerSelected } from './flowerSelected';

describe('flowerSelected', () => {
  it('sets selectedFlowerId', () => {
    const next = createNextState(initialState, (draft) =>
      flowerSelected(draft, { type: 'flowers/flowerSelected', payload: 'f1' }),
    );
    expect(next.selectedFlowerId).toBe('f1');
  });
});
