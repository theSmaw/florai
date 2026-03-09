import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectAllColors } from './selectAllColors';

describe('selectAllColors', () => {
  it('returns sorted unique colors across all flowers', () => {
    const f1 = { ...makeFlower({ id: 'f1' }), colors: ['red' as const] };
    const f2 = { ...makeFlower({ id: 'f2' }), colors: ['blue' as const, 'red' as const] };
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectAllColors(state)).toEqual(['blue', 'red']);
  });
});
