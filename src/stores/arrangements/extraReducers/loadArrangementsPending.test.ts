import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadArrangementsPending } from './loadArrangementsPending';

describe('loadArrangementsPending', () => {
  it('sets loadStatus to pending', () => {
    const next = createNextState(initialState, (draft) => loadArrangementsPending(draft));
    expect(next.loadStatus).toEqual({ status: 'pending' });
  });
});
