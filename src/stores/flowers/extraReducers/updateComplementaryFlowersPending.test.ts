import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateComplementaryFlowersPending } from './updateComplementaryFlowersPending';

describe('updateComplementaryFlowersPending', () => {
  it('sets updateComplementaryFlowersStatus to pending', () => {
    const next = createNextState(initialState, (draft) => updateComplementaryFlowersPending(draft));
    expect(next.updateComplementaryFlowersStatus).toEqual({ status: 'pending' });
  });
});
