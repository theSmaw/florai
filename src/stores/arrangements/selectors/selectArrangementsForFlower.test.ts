import { initialState } from '../state';
import { makeArrangement, makeRootState } from '../../__tests__/fixtures';
import { selectArrangementsForFlower } from './selectArrangementsForFlower';

describe('selectArrangementsForFlower', () => {
  it('returns arrangements that include the given flower id', () => {
    const a1 = { ...makeArrangement({ id: 'a1' }), flowerIds: ['f1', 'f2'] };
    const a2 = { ...makeArrangement({ id: 'a2' }), flowerIds: ['f2', 'f3'] };
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2] } });
    const result = selectArrangementsForFlower('f1')(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('a1');
  });

  it('returns empty array when no arrangements contain the flower', () => {
    const a1 = { ...makeArrangement({ id: 'a1' }), flowerIds: ['f2'] };
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1] } });
    expect(selectArrangementsForFlower('f1')(state)).toEqual([]);
  });
});
