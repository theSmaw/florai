import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectFlowersExcluding } from './selectFlowersExcluding';

describe('selectFlowersExcluding', () => {
  it('returns all flowers except the one with the given id', () => {
    const f1 = makeFlower({ id: 'f1' });
    const f2 = makeFlower({ id: 'f2' });
    const f3 = makeFlower({ id: 'f3' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2, f3] } });
    const result = selectFlowersExcluding('f1')(state);
    expect(result).toHaveLength(2);
    expect(result.map((f) => f.id)).toEqual(['f2', 'f3']);
  });

  it('returns all flowers when the id does not match any flower', () => {
    const f1 = makeFlower({ id: 'f1' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1] } });
    expect(selectFlowersExcluding('unknown')(state)).toHaveLength(1);
  });
});
