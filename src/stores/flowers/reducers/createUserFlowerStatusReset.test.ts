import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { createUserFlowerStatusReset } from './createUserFlowerStatusReset';

describe('createUserFlowerStatusReset', () => {
  it('resets createFlowerStatus to idle', () => {
    const state = { ...initialState, createFlowerStatus: { status: 'fulfilled' as const } };
    const next = createNextState(state, (draft) =>
      createUserFlowerStatusReset(draft),
    );
    expect(next.createFlowerStatus).toEqual({ status: 'idle' });
  });
});
