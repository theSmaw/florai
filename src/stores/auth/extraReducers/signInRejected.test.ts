import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { signInRejected } from './signInRejected';

describe('signInRejected', () => {
  it('clears loading and sets error message', () => {
    const next = createNextState(
      { ...initialState, loading: true },
      (draft) => signInRejected(draft, { error: { message: 'Invalid credentials' } }),
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe('Invalid credentials');
  });
});
