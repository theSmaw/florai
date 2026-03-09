import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateCareInstructionsPending } from './updateCareInstructionsPending';

describe('updateCareInstructionsPending', () => {
  it('sets updateCareInstructionsStatus to pending', () => {
    const next = createNextState(initialState, (draft) => updateCareInstructionsPending(draft));
    expect(next.updateCareInstructionsStatus).toEqual({ status: 'pending' });
  });
});
