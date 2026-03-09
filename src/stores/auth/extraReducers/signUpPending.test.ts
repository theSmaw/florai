import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { signUpPending } from './signUpPending';

describe('signUpPending', () => {
  it('sets loading=true and clears error', () => {
    const next = createNextState(
      { ...initialState, error: 'prev' },
      (draft) => signUpPending(draft),
    );
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });
});
