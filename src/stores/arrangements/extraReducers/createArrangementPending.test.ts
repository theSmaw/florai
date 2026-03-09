import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { createArrangementPending } from './createArrangementPending';

describe('createArrangementPending', () => {
  it('sets createStatus to pending', () => {
    const next = createNextState(initialState, (draft) => createArrangementPending(draft));
    expect(next.createStatus).toEqual({ status: 'pending' });
  });
});
