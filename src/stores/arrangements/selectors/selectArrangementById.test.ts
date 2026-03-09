import { initialState } from '../state';
import { makeArrangement, makeRootState } from '../../__tests__/fixtures';
import { selectArrangementById } from './selectArrangementById';

describe('selectArrangementById', () => {
  it('returns the matching arrangement', () => {
    const a1 = makeArrangement({ id: 'a1' });
    const a2 = makeArrangement({ id: 'a2' });
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2] } });
    expect(selectArrangementById('a2')(state)).toEqual(a2);
  });

  it('returns null for unknown id', () => {
    const a1 = makeArrangement({ id: 'a1' });
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1] } });
    expect(selectArrangementById('unknown')(state)).toBeNull();
  });
});
