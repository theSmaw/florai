import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectFlowerById } from './selectFlowerById';

describe('selectFlowerById', () => {
  it('returns the flower with the matching id', () => {
    const f1 = makeFlower({ id: 'f1' });
    const f2 = makeFlower({ id: 'f2' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectFlowerById('f1')(state)).toEqual(f1);
  });

  it('returns null when no flower matches', () => {
    const f1 = makeFlower({ id: 'f1' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1] } });
    expect(selectFlowerById('unknown')(state)).toBeNull();
  });
});
