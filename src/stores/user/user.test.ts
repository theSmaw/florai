import reducer from './slice';
import { initialState } from './state';
import { loadUser } from './asyncActions/loadUser';
import { makeUser } from '../__tests__/fixtures';

describe('loadUser.pending', () => {
  it('sets loadUserStatus to pending', () => {
    const action = loadUser.pending('r1', undefined);
    const state = reducer(initialState, action);
    expect(state.loadUserStatus).toEqual({ status: 'pending' });
  });
});

describe('loadUser.fulfilled', () => {
  it('sets user and marks status as fulfilled', () => {
    const user = makeUser();
    const action = loadUser.fulfilled(user, 'r1', undefined);
    const state = reducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.loadUserStatus).toEqual({ status: 'fulfilled' });
  });
});

describe('loadUser.rejected', () => {
  it('sets status to rejected with the error message', () => {
    const action = loadUser.rejected(new Error('network error'), 'r1', undefined);
    const state = reducer(initialState, action);
    expect(state.loadUserStatus).toEqual({ status: 'rejected', errorMessage: 'network error' });
  });

  it('ignores aborted rejections and leaves state unchanged', () => {
    const base = loadUser.rejected(null, 'r1', undefined);
    const action = { ...base, meta: { ...base.meta, aborted: true } };
    const state = reducer(initialState, action);
    expect(state.loadUserStatus).toEqual({ status: 'idle' });
  });
});
