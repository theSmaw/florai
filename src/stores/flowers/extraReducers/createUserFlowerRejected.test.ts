import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { createUserFlowerRejected } from './createUserFlowerRejected';

describe('createUserFlowerRejected', () => {
  it('sets createFlowerStatus to rejected with error message', () => {
    const next = createNextState(initialState, (draft) =>
      createUserFlowerRejected(draft, {
        error: { message: 'Failed to create flower: duplicate name' },
      }),
    );
    expect(next.createFlowerStatus).toEqual({
      status: 'rejected',
      errorMessage: 'Failed to create flower: duplicate name',
    });
  });

  it('falls back to default message when error message is undefined', () => {
    const next = createNextState(initialState, (draft) =>
      createUserFlowerRejected(draft, { error: {} }),
    );
    expect(next.createFlowerStatus).toEqual({
      status: 'rejected',
      errorMessage: 'Failed to create flower',
    });
  });
});
