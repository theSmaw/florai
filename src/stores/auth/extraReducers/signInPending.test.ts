import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { signInPending } from './signInPending';

describe('signInPending', () => {
  it('sets loading=true and clears error', () => {
    const next = createNextState(
      { ...initialState, error: 'previous error' },
      (draft) => signInPending(draft),
    );
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });
});
