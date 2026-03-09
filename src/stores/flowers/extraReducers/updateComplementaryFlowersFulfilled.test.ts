import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateComplementaryFlowersFulfilled } from './updateComplementaryFlowersFulfilled';
import { makeFlower } from '../../__tests__/fixtures';

describe('updateComplementaryFlowersFulfilled', () => {
  it('updates complementaryFlowerIds on the flower', () => {
    const flower = makeFlower({ id: 'f1' });
    const next = createNextState(
      { ...initialState, flowers: [flower] },
      (draft) =>
        updateComplementaryFlowersFulfilled(draft, {
          type: 'flowers/updateComplementaryFlowers/fulfilled',
          payload: { flowerId: 'f1', complementaryFlowerIds: ['f2', 'f3'] },
        }),
    );
    expect(next.updateComplementaryFlowersStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]?.complementaryFlowerIds).toEqual(['f2', 'f3']);
  });
});
