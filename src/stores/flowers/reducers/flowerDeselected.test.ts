import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { flowerDeselected } from './flowerDeselected';

describe('flowerDeselected', () => {
  it('clears selectedFlowerId', () => {
    const next = createNextState(
      { ...initialState, selectedFlowerId: 'f1' },
      (draft) => flowerDeselected(draft),
    );
    expect(next.selectedFlowerId).toBeNull();
  });
});
