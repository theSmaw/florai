import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectAllClimates } from './selectAllClimates';

describe('selectAllClimates', () => {
  it('returns sorted unique climates across all flowers', () => {
    const f1 = { ...makeFlower({ id: 'f1' }), climate: 'tropical' as const };
    const f2 = { ...makeFlower({ id: 'f2' }), climate: 'alpine' as const };
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectAllClimates(state)).toEqual(['alpine', 'tropical']);
  });
});
