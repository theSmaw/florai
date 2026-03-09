import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { loadArrangementsRejected } from './loadArrangementsRejected';

describe('loadArrangementsRejected', () => {
  it('sets loadStatus to rejected with error message', () => {
    const next = createNextState(initialState, (draft) =>
      loadArrangementsRejected(draft, { error: { message: 'fetch failed' }, meta: { aborted: false } }),
    );
    expect(next.loadStatus).toEqual({ status: 'rejected', errorMessage: 'fetch failed' });
  });

  it('ignores aborted rejections', () => {
    const next = createNextState(initialState, (draft) =>
      loadArrangementsRejected(draft, { error: {}, meta: { aborted: true } }),
    );
    expect(next.loadStatus).toEqual({ status: 'idle' });
  });
});
