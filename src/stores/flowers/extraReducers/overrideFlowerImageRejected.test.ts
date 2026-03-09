import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { overrideFlowerImageRejected } from './overrideFlowerImageRejected';

describe('overrideFlowerImageRejected', () => {
  it('sets overrideImageStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      overrideFlowerImageRejected(draft, { error: { message: 'upload failed' } }),
    );
    expect(next.overrideImageStatus).toEqual({ status: 'rejected', errorMessage: 'upload failed' });
  });
});
