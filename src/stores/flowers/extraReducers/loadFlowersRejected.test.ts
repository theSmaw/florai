import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadFlowersRejected } from './loadFlowersRejected';

describe('loadFlowersRejected', () => {
  it('sets status to rejected with error message', () => {
    const next = createNextState(initialState, (draft) =>
      loadFlowersRejected(draft, { error: { message: 'fetch failed' }, meta: { aborted: false } }),
    );
    expect(next.loadFlowersStatus).toEqual({ status: 'rejected', errorMessage: 'fetch failed' });
  });

  it('ignores aborted rejections', () => {
    const next = createNextState(initialState, (draft) =>
      loadFlowersRejected(draft, { error: {}, meta: { aborted: true } }),
    );
    expect(next.loadFlowersStatus).toEqual({ status: 'idle' });
  });
});
