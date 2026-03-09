import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectAllSeasons } from './selectAllSeasons';

describe('selectAllSeasons', () => {
  it('returns sorted unique seasons across all flowers', () => {
    const f1 = { ...makeFlower({ id: 'f1' }), season: ['Spring' as const] };
    const f2 = { ...makeFlower({ id: 'f2' }), season: ['Autumn' as const, 'Spring' as const] };
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectAllSeasons(state)).toEqual(['Autumn', 'Spring']);
  });
});
