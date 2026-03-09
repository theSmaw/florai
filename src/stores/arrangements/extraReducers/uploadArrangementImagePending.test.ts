import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { uploadArrangementImagePending } from './uploadArrangementImagePending';
import { makeArrangement } from '../../__tests__/fixtures';

describe('uploadArrangementImagePending', () => {
  it('sets uploadImageStatus to pending and optimistically sets blob url', () => {
    const arrangement = makeArrangement({ id: 'a1' });
    const next = createNextState(
      { ...initialState, arrangements: [arrangement] },
      (draft) =>
        uploadArrangementImagePending(draft, {
          meta: { arg: { arrangementId: 'a1', blobUrl: 'blob:test' } },
        }),
    );
    expect(next.uploadImageStatus).toEqual({ status: 'pending' });
    expect(next.arrangements[0]?.imageUrl).toBe('blob:test');
  });
});
