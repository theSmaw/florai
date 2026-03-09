import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadFlowersFulfilled } from './loadFlowersFulfilled';
import { makeFlower } from '../../__tests__/fixtures';

describe('loadFlowersFulfilled', () => {
  it('populates flowers and marks status fulfilled', () => {
    const flowers = [makeFlower()];
    const next = createNextState(initialState, (draft) =>
      loadFlowersFulfilled(draft, { type: 'flowers/load/fulfilled', payload: flowers }),
    );
    expect(next.flowers).toEqual(flowers);
    expect(next.loadFlowersStatus).toEqual({ status: 'fulfilled' });
  });
});
