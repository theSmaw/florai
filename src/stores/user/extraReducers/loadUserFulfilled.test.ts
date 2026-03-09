import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadUserFulfilled } from './loadUserFulfilled';
import { makeUser } from '../../__tests__/fixtures';

describe('loadUserFulfilled', () => {
  it('sets user and marks status as fulfilled', () => {
    const user = makeUser();
    const next = createNextState(initialState, (draft) =>
      loadUserFulfilled(draft, { type: 'user/load/fulfilled', payload: user }),
    );
    expect(next.user).toEqual(user);
    expect(next.loadUserStatus).toEqual({ status: 'fulfilled' });
  });
});
