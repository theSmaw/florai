import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { signOutFulfilled } from './signOutFulfilled';
import { makeSession } from '../../__tests__/fixtures';

describe('signOutFulfilled', () => {
  it('clears session, loading, and error', () => {
    const session = makeSession();
    const next = createNextState(
      { ...initialState, session, loading: true, error: 'err' },
      (draft) => signOutFulfilled(draft),
    );
    expect(next.session).toBeNull();
    expect(next.loading).toBe(false);
    expect(next.error).toBeNull();
  });
});
