import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateArrangementNotesPending } from './updateArrangementNotesPending';

describe('updateArrangementNotesPending', () => {
  it('sets updateNotesStatus to pending', () => {
    const next = createNextState(initialState, (draft) => updateArrangementNotesPending(draft));
    expect(next.updateNotesStatus).toEqual({ status: 'pending' });
  });
});
