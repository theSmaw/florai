import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectSelectedFlower } from './selectSelectedFlower';

describe('selectSelectedFlower', () => {
  it('returns the flower matching selectedFlowerId', () => {
    const f1 = makeFlower({ id: 'f1' });
    const f2 = makeFlower({ id: 'f2' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2], selectedFlowerId: 'f2' } });
    expect(selectSelectedFlower(state)).toEqual(f2);
  });

  it('returns null when nothing is selected', () => {
    const f1 = makeFlower({ id: 'f1' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1] } });
    expect(selectSelectedFlower(state)).toBeNull();
  });
});
