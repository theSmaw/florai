import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import { selectUpdateNotesStatus } from './selectUpdateNotesStatus';

describe('selectUpdateNotesStatus', () => {
  it('returns the update notes status', () => {
    const state = makeRootState({ arrangements: { ...initialState, updateNotesStatus: { status: 'fulfilled' } } });
    expect(selectUpdateNotesStatus(state)).toEqual({ status: 'fulfilled' });
  });
});
