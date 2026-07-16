import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateArrangementFulfilled } from './updateArrangementFulfilled';
import { makeArrangement } from '../../__tests__/fixtures';

describe('updateArrangementFulfilled', () => {
  it('replaces the arrangement with the payload and marks status fulfilled', () => {
    const original = makeArrangement({ id: 'a1', name: 'Old name' });
    const updated = makeArrangement({ id: 'a1', name: 'New name' });
    const next = createNextState({ ...initialState, arrangements: [original] }, (draft) =>
      updateArrangementFulfilled(draft, {
        type: 'arrangements/update/fulfilled',
        payload: updated,
      }),
    );
    expect(next.updateStatus).toEqual({ status: 'fulfilled' });
    expect(next.arrangements[0]?.name).toBe('New name');
  });

  it('leaves the list unchanged when the id is not found', () => {
    const original = makeArrangement({ id: 'a1' });
    const updated = makeArrangement({ id: 'missing', name: 'Nope' });
    const next = createNextState({ ...initialState, arrangements: [original] }, (draft) =>
      updateArrangementFulfilled(draft, {
        type: 'arrangements/update/fulfilled',
        payload: updated,
      }),
    );
    expect(next.arrangements).toHaveLength(1);
    expect(next.arrangements[0]?.id).toBe('a1');
  });
});
