import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateSourcingNotesPending } from './updateSourcingNotesPending';

describe('updateSourcingNotesPending', () => {
  it('sets updateSourcingNotesStatus to pending', () => {
    const next = createNextState(initialState, (draft) => updateSourcingNotesPending(draft));
    expect(next.updateSourcingNotesStatus).toEqual({ status: 'pending' });
  });
});
