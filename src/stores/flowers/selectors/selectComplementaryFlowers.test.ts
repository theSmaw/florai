import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectComplementaryFlowers } from './selectComplementaryFlowers';

describe('selectComplementaryFlowers', () => {
  it('returns flowers listed in selectedFlower.complementaryFlowerIds', () => {
    const f1 = { ...makeFlower({ id: 'f1' }), complementaryFlowerIds: ['f2'] };
    const f2 = makeFlower({ id: 'f2' });
    const state = makeRootState({
      flowers: { ...initialState, flowers: [f1, f2], selectedFlowerId: 'f1' },
    });
    const result = selectComplementaryFlowers(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('f2');
  });

  it('returns empty array when nothing is selected', () => {
    const f1 = makeFlower({ id: 'f1' });
    const f2 = makeFlower({ id: 'f2' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectComplementaryFlowers(state)).toEqual([]);
  });
});
