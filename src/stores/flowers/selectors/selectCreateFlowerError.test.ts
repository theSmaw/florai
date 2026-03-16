import { describe, it, expect } from 'vitest';
import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectCreateFlowerError } from './selectCreateFlowerError';

describe('selectCreateFlowerError', () => {
  it('returns null when status is idle', () => {
    const state = makeRootState({ flowers: { ...initialState } });
    expect(selectCreateFlowerError(state)).toBeNull();
  });

  it('returns null when status is pending', () => {
    const state = makeRootState({ flowers: { ...initialState, createFlowerStatus: { status: 'pending' } } });
    expect(selectCreateFlowerError(state)).toBeNull();
  });

  it('returns null when status is fulfilled', () => {
    const state = makeRootState({ flowers: { ...initialState, createFlowerStatus: { status: 'fulfilled' } } });
    expect(selectCreateFlowerError(state)).toBeNull();
  });

  it('returns the error message when status is rejected', () => {
    const state = makeRootState({
      flowers: {
        ...initialState,
        createFlowerStatus: { status: 'rejected', errorMessage: 'Failed to create flower: duplicate name' },
      },
    });
    expect(selectCreateFlowerError(state)).toBe('Failed to create flower: duplicate name');
  });
});
