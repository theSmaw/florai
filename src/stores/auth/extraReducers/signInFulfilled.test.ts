import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { signInFulfilled } from './signInFulfilled';
import { makeSession } from '../../__tests__/fixtures';

describe('signInFulfilled', () => {
  it('sets session and clears loading', () => {
    const session = makeSession();
    const next = createNextState(
      { ...initialState, loading: true },
      (draft) => signInFulfilled(draft, { type: 'auth/signIn/fulfilled', payload: session }),
    );
    expect(next.loading).toBe(false);
    expect(next.session).toEqual(session);
  });
});
