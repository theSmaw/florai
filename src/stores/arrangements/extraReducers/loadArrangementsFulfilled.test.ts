import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadArrangementsFulfilled } from './loadArrangementsFulfilled';
import { makeArrangement } from '../../__tests__/fixtures';

describe('loadArrangementsFulfilled', () => {
  it('populates arrangements and marks status fulfilled', () => {
    const arrangements = [makeArrangement()];
    const next = createNextState(initialState, (draft) =>
      loadArrangementsFulfilled(draft, {
        type: 'arrangements/load/fulfilled',
        payload: arrangements,
      }),
    );
    expect(next.arrangements).toEqual(arrangements);
    expect(next.loadStatus).toEqual({ status: 'fulfilled' });
  });
});
