import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { signUpFulfilled } from './signUpFulfilled';
import { makeSession } from '../../__tests__/fixtures';

describe('signUpFulfilled', () => {
  it('sets session and clears loading', () => {
    const session = makeSession();
    const next = createNextState(
      { ...initialState, loading: true },
      (draft) => signUpFulfilled(draft, { type: 'auth/signUp/fulfilled', payload: session }),
    );
    expect(next.loading).toBe(false);
    expect(next.session).toEqual(session);
  });
});
