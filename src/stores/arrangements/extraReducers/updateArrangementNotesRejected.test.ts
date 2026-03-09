import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateArrangementNotesRejected } from './updateArrangementNotesRejected';

describe('updateArrangementNotesRejected', () => {
  it('sets updateNotesStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      updateArrangementNotesRejected(draft, { error: { message: 'db error' } }),
    );
    expect(next.updateNotesStatus).toEqual({ status: 'rejected', errorMessage: 'db error' });
  });
});
