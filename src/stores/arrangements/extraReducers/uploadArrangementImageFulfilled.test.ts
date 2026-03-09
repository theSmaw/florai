import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { uploadArrangementImageFulfilled } from './uploadArrangementImageFulfilled';
import { makeArrangement } from '../../__tests__/fixtures';

describe('uploadArrangementImageFulfilled', () => {
  it('sets uploadImageStatus to fulfilled and updates image url', () => {
    const arrangement = makeArrangement({ id: 'a1', imageUrl: 'blob:test' });
    const next = createNextState(
      { ...initialState, arrangements: [arrangement] },
      (draft) =>
        uploadArrangementImageFulfilled(draft, {
          type: 'arrangements/uploadImage/fulfilled',
          payload: 'https://cdn/bouquet.jpg',
          meta: { arg: { arrangementId: 'a1' } },
        }),
    );
    expect(next.uploadImageStatus).toEqual({ status: 'fulfilled' });
    expect(next.arrangements[0]?.imageUrl).toBe('https://cdn/bouquet.jpg');
  });
});
