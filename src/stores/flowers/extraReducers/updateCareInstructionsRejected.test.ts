import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateCareInstructionsRejected } from './updateCareInstructionsRejected';

describe('updateCareInstructionsRejected', () => {
  it('sets updateCareInstructionsStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      updateCareInstructionsRejected(draft, { error: { message: 'fail' } }),
    );
    expect(next.updateCareInstructionsStatus).toEqual({ status: 'rejected', errorMessage: 'fail' });
  });
});
