import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectComplementaryFlowersByFlowerId } from './selectComplementaryFlowersByFlowerId';

describe('selectComplementaryFlowersByFlowerId', () => {
  it('returns flowers listed in the given flower complementaryFlowerIds', () => {
    const f1 = { ...makeFlower({ id: 'f1' }), complementaryFlowerIds: ['f2'] };
    const f2 = makeFlower({ id: 'f2' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    const result = selectComplementaryFlowersByFlowerId('f1')(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('f2');
  });

  it('returns empty array when the flower has no complementary flower ids', () => {
    const f1 = makeFlower({ id: 'f1' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1] } });
    expect(selectComplementaryFlowersByFlowerId('f1')(state)).toEqual([]);
  });

  it('returns empty array when the flower id does not exist', () => {
    const f1 = makeFlower({ id: 'f1' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1] } });
    expect(selectComplementaryFlowersByFlowerId('unknown')(state)).toEqual([]);
  });
});
