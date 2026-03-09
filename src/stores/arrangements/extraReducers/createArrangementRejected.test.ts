import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { createArrangementRejected } from './createArrangementRejected';

describe('createArrangementRejected', () => {
  it('sets createStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      createArrangementRejected(draft, { error: { message: 'db error' } }),
    );
    expect(next.createStatus).toEqual({ status: 'rejected', errorMessage: 'db error' });
  });
});
