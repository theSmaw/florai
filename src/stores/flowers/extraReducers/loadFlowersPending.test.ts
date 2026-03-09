import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadFlowersPending } from './loadFlowersPending';

describe('loadFlowersPending', () => {
  it('sets loadFlowersStatus to pending', () => {
    const next = createNextState(initialState, (draft) => loadFlowersPending(draft));
    expect(next.loadFlowersStatus).toEqual({ status: 'pending' });
  });
});
