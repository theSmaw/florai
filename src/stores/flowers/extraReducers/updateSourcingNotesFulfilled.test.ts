import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateSourcingNotesFulfilled } from './updateSourcingNotesFulfilled';
import { makeFlower } from '../../__tests__/fixtures';

describe('updateSourcingNotesFulfilled', () => {
  it('updates notes on the flower', () => {
    const flower = makeFlower({ id: 'f1' });
    const next = createNextState(
      { ...initialState, flowers: [flower] },
      (draft) =>
        updateSourcingNotesFulfilled(draft, {
          type: 'flowers/updateSourcingNotes/fulfilled',
          payload: { flowerId: 'f1', notes: 'from farms' },
        }),
    );
    expect(next.updateSourcingNotesStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]?.notes).toBe('from farms');
  });
});
