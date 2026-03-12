import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { createUserFlowerPending } from './createUserFlowerPending';

describe('createUserFlowerPending', () => {
  it('sets createFlowerStatus to pending', () => {
    const next = createNextState(initialState, (draft) => createUserFlowerPending(draft));
    expect(next.createFlowerStatus).toEqual({ status: 'pending' });
  });
});
