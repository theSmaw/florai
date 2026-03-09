import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectStemLengthBounds } from './selectStemLengthBounds';

describe('selectStemLengthBounds', () => {
  it('returns min/max from flower stem lengths', () => {
    const f1 = { ...makeFlower({ id: 'f1' }), stemLengthCm: 30 };
    const f2 = { ...makeFlower({ id: 'f2' }), stemLengthCm: 60 };
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectStemLengthBounds(state)).toEqual({ min: 30, max: 60 });
  });

  it('returns defaults when no flowers', () => {
    const state = makeRootState();
    expect(selectStemLengthBounds(state)).toEqual({ min: 0, max: 100 });
  });
});
