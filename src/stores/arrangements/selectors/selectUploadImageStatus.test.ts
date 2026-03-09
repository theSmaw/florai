import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectUploadImageStatus } from './selectUploadImageStatus';

describe('selectUploadImageStatus', () => {
  it('returns the upload image status', () => {
    const state = makeRootState({ arrangements: { ...initialState, uploadImageStatus: { status: 'pending' } } });
    expect(selectUploadImageStatus(state)).toEqual({ status: 'pending' });
  });
});
