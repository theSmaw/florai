import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { sessionChanged } from './sessionChanged';
import { makeSession } from '../../__tests__/fixtures';

describe('sessionChanged', () => {
  it('sets session, marks initialized, and clears error', () => {
    const session = makeSession();
    const next = createNextState(
      { ...initialState, error: 'old error' },
      (draft) => sessionChanged(draft, { type: 'auth/sessionChanged', payload: session }),
    );
    expect(next.session).toEqual(session);
    expect(next.initialized).toBe(true);
    expect(next.error).toBeNull();
  });

  it('accepts null to clear session', () => {
    const session = makeSession();
    const next = createNextState(
      { ...initialState, session },
      (draft) => sessionChanged(draft, { type: 'auth/sessionChanged', payload: null }),
    );
    expect(next.session).toBeNull();
    expect(next.initialized).toBe(true);
  });
});
