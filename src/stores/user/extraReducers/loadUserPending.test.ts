import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadUserPending } from './loadUserPending';

describe('loadUserPending', () => {
  it('sets loadUserStatus to pending', () => {
    const next = createNextState(initialState, (draft) => loadUserPending(draft));
    expect(next.loadUserStatus).toEqual({ status: 'pending' });
  });
});
