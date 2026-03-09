import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateArrangementNotesFulfilled } from './updateArrangementNotesFulfilled';
import { makeArrangement } from '../../__tests__/fixtures';

describe('updateArrangementNotesFulfilled', () => {
  it('updates notes on the arrangement and marks status fulfilled', () => {
    const arrangement = makeArrangement({ id: 'a1' });
    const next = createNextState(
      { ...initialState, arrangements: [arrangement] },
      (draft) =>
        updateArrangementNotesFulfilled(draft, {
          type: 'arrangements/updateNotes/fulfilled',
          payload: { arrangementId: 'a1', notes: 'Great for spring' },
        }),
    );
    expect(next.updateNotesStatus).toEqual({ status: 'fulfilled' });
    expect(next.arrangements[0]?.notes).toBe('Great for spring');
  });
});
