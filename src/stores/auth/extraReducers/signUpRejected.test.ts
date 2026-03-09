import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { signUpRejected } from './signUpRejected';

describe('signUpRejected', () => {
  it('clears loading and sets error message', () => {
    const next = createNextState(
      { ...initialState, loading: true },
      (draft) => signUpRejected(draft, { error: { message: 'Email taken' } }),
    );
    expect(next.loading).toBe(false);
    expect(next.error).toBe('Email taken');
  });
});
