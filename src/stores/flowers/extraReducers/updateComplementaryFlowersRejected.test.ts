import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateComplementaryFlowersRejected } from './updateComplementaryFlowersRejected';

describe('updateComplementaryFlowersRejected', () => {
  it('sets updateComplementaryFlowersStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      updateComplementaryFlowersRejected(draft, { error: { message: 'fail' } }),
    );
    expect(next.updateComplementaryFlowersStatus).toEqual({
      status: 'rejected',
      errorMessage: 'fail',
    });
  });
});
