import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateCareInstructionsFulfilled } from './updateCareInstructionsFulfilled';
import { makeFlower } from '../../__tests__/fixtures';

describe('updateCareInstructionsFulfilled', () => {
  it('updates careInstructions on the flower', () => {
    const flower = makeFlower({ id: 'f1' });
    const next = createNextState(
      { ...initialState, flowers: [flower] },
      (draft) =>
        updateCareInstructionsFulfilled(draft, {
          type: 'flowers/updateCareInstructions/fulfilled',
          payload: { flowerId: 'f1', careInstructions: 'water daily' },
        }),
    );
    expect(next.updateCareInstructionsStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]?.careInstructions).toBe('water daily');
  });
});
