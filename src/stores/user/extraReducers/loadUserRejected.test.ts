import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadUserRejected } from './loadUserRejected';

describe('loadUserRejected', () => {
  it('sets status to rejected with the error message', () => {
    const next = createNextState(initialState, (draft) =>
      loadUserRejected(draft, { error: { message: 'network error' }, meta: { aborted: false } }),
    );
    expect(next.loadUserStatus).toEqual({ status: 'rejected', errorMessage: 'network error' });
  });

  it('ignores aborted rejections and leaves state unchanged', () => {
    const next = createNextState(initialState, (draft) =>
      loadUserRejected(draft, { error: {}, meta: { aborted: true } }),
    );
    expect(next.loadUserStatus).toEqual({ status: 'idle' });
  });
});
