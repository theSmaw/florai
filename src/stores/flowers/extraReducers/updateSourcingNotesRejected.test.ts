import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateSourcingNotesRejected } from './updateSourcingNotesRejected';

describe('updateSourcingNotesRejected', () => {
  it('sets updateSourcingNotesStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      updateSourcingNotesRejected(draft, { error: { message: 'fail' } }),
    );
    expect(next.updateSourcingNotesStatus).toEqual({ status: 'rejected', errorMessage: 'fail' });
  });
});
