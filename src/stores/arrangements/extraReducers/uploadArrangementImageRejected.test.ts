import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { uploadArrangementImageRejected } from './uploadArrangementImageRejected';

describe('uploadArrangementImageRejected', () => {
  it('sets uploadImageStatus to rejected', () => {
    const next = createNextState(initialState, (draft) =>
      uploadArrangementImageRejected(draft, { error: { message: 'upload failed' } }),
    );
    expect(next.uploadImageStatus).toEqual({ status: 'rejected', errorMessage: 'upload failed' });
  });
});
