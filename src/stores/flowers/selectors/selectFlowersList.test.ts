import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectFlowersList } from './selectFlowersList';

describe('selectFlowersList', () => {
  it('returns all flowers', () => {
    const f1 = makeFlower({ id: 'f1' });
    const f2 = makeFlower({ id: 'f2' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectFlowersList(state)).toEqual([f1, f2]);
  });
});
