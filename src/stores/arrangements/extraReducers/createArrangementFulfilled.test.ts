import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { createArrangementFulfilled } from './createArrangementFulfilled';
import { makeArrangement } from '../../__tests__/fixtures';

describe('createArrangementFulfilled', () => {
  it('prepends the new arrangement and marks createStatus fulfilled', () => {
    const existing = makeArrangement({ id: 'a2' });
    const created = makeArrangement({ id: 'a1' });
    const next = createNextState(
      { ...initialState, arrangements: [existing] },
      (draft) =>
        createArrangementFulfilled(draft, {
          type: 'arrangements/create/fulfilled',
          payload: created,
        }),
    );
    expect(next.createStatus).toEqual({ status: 'fulfilled' });
    expect(next.arrangements[0]?.id).toBe('a1');
    expect(next.arrangements).toHaveLength(2);
  });
});
